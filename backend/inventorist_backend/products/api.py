from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from ninja import Router

from .models import Product, ProductVariant
from .schema import ProductIn, ProductSchema, ProductSummarySchema, VariantInSchema

router = Router()


@router.get(
    "/summary", description="Lists products", response=list[ProductSummarySchema]
)
def get_product_summary(request):
    summaries = (
        Product.objects.prefetch_related("variants")
        .values("id", "name")
        .annotate(variantsCount=Count("variants"))
    )
    return summaries


@router.get(
    "/search", description="Search products", response=list[ProductSummarySchema]
)
def search_products(request, q: str = ""):
    if q:
        q = q.strip()
        search_filter = (
            Q(name__icontains=q)
            | Q(variants__name__icontains=q)
            | Q(category__icontains=q)
            | Q(tags__icontains=q)
        )
        search_results = (
            Product.objects.prefetch_related("variants")
            .filter(search_filter)
            .values("id", "name")
            .annotate(variantsCount=Count("variants"))
        )
        return search_results
    return []


@router.get("/", description="Lists products", response=list[ProductSchema])
def list_products(request):
    qs = Product.objects.all()
    return qs


@router.post("/", description="Lists products")
def create_product(request, payload: ProductIn):
    product = Product.objects.create(**payload.model_dump())
    if not product:
        return {"created": False}
    return {"created": True}


@router.get("/{product_id}", response=ProductSchema, description="Get Product")
def get_product(request, product_id: int):
    product = get_object_or_404(Product, pk=product_id)
    return product


@router.put("/{product_id}", response=ProductSchema, description="Get Product")
def update_product(request, product_id: int, payload: ProductIn):
    product = get_object_or_404(
        Product,
        pk=product_id,
    )

    payload_dict = payload.model_dump(exclude_unset=True).items()
    update_fields: list[str] = []
    for field, value in payload_dict:
        setattr(product, field, value)
        update_fields.append(field)
    update_fields.append("updated_at")
    product.save(update_fields=update_fields)
    return product


@router.delete("/{product_id}")
def delete_product(request, product_id: int):
    product = get_object_or_404(Product, pk=product_id)
    product.delete()
    return {"success": True}


@router.post("/{product_id}/variants")
def create_product_variant(request, product_id: int, new_variant: VariantInSchema):
    product_obj = get_object_or_404(Product, pk=product_id)

    new_variant_dict = new_variant.model_dump()
    new_variant_dict.update({"product": product_obj})
    v_obj = ProductVariant.objects.create(**new_variant_dict)
    return {"id": v_obj.id}


@router.get("/{product_id}/variants", response=ProductSchema)
def get_product_variants(request, product_id: int):

    product = Product.objects.filter(id=product_id).first()
    results = {
        "id": product.id,
        "name": product.name,
        "category": product.category,
        "supplier": product.supplier,
        "added_at": product.added_at,
        "updated_at": product.updated_at,
        "variants": [],
    }

    for variant in product.variants.all():
        results["variants"].append(
            {
                "id": variant.id,
                "name": variant.name,
                "quantity": variant.quantity,
                "units": variant.units,
                "price": variant.price,
                "bargain_price": variant.bargain_price,
            }
        )

    return results


@router.delete("/{product_id}/variants/")
def delete_variant(request, product_id: int, variant_id: int):
    variant = get_object_or_404(ProductVariant, pk=variant_id, product=product_id)
    variant.delete()
    return {"success": True}
