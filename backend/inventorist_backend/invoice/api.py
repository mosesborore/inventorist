from uuid import uuid4
from django.utils import numberformat
from django.db.models import Count
from django.shortcuts import get_object_or_404
from ninja import Router
from ninja.security import django_auth

from invoice.models import Invoice

from .schema import (
    BuyerSchema,
    CreateInvoiceResponseSchema,
    ErrorSchema,
    InvoiceCreateSchema,
    InvoiceItemCreateSchema,
    InvoiceItemSchema,
    InvoiceSchema,
    InvoiceSummarySchema,
    NewSellerSchema,
    SellerSchema,
)

router = Router()
from .models import Buyer, Invoice, InvoiceItem, Seller


@router.get("/seller", response={200: SellerSchema, 404: ErrorSchema})
def get_seller(request):
    seller = Seller.objects.first()

    if not seller:
        return 404, {"message": "Seller not Found"}
    return seller


@router.post("/seller", response=SellerSchema)
def create_seller(request, new_seller: NewSellerSchema):
    new_seller_dict = new_seller.model_dump(exclude_unset=True)
    seller_obj = Seller.objects.create(**new_seller_dict)
    return seller_obj


@router.get("/summary", response=list[InvoiceSummarySchema])
def get_invoice_summary(request):
    qs = (
        Invoice.objects.select_related("buyer", "seller")
        .prefetch_related("items")
        .annotate(items_count=Count("items"))
        .values("items_count", "invoice_number", "total", "buyer__name", "date")
    )

    return qs


@router.get("/{invoice_number}", response=InvoiceSchema)
def get_invoice(request, invoice_number: str):
    # invoice = get_object_or_404(Invoice, invoice_number=invoice_number)
    invoice = (
        Invoice.objects.prefetch_related("items")
        .select_related("buyer", "seller")
        .filter(invoice_number=invoice_number)
        .first()
    )

    return invoice


@router.get("/", response=list[InvoiceSchema])
def get_invoices(request):
    invoices = (
        Invoice.objects.select_related("buyer", "seller")
        .prefetch_related("items")
        .all()
    )
    return invoices


@router.post(
    "/",
    response={
        201: CreateInvoiceResponseSchema,
        200: CreateInvoiceResponseSchema,
        404: ErrorSchema,
    },
)
def create_invoice(request, invoice: InvoiceCreateSchema):
    invoice_dict = invoice.model_dump()

    if not invoice_dict["due_date"]:
        invoice_dict.pop("due_date")

    buyer = Buyer.objects.create(
        name=invoice_dict.get("buyer_name").strip().title(),
        phone=invoice_dict.get("buyer_phone"),
    )

    seller = Seller.objects.first()

    if not seller:
        return 404, {"message": "Seller not Found"}

    invoice_model = Invoice.objects.create(
        invoice_number=uuid4().hex[:8],
        date=invoice_dict.get("date"),
        due_date=invoice_dict.get("due_date"),
        buyer=buyer,
        seller=seller,
        payment_status=invoice_dict.get("payment_status"),
        notes=invoice_dict.get("notes"),
    )
    if invoice_model:
        return 201, {
            "created": True,
            "message": "Invoice created Successfully",
            "invoiceNumber": str(invoice_model.invoice_number),
        }

    return {"created": False, "message": "Fialed to create invoice"}


@router.get("/{invoice_number}/items")
def get_invoice_item(request, invoice_number: str):
    qs = (
        Invoice.objects.prefetch_related("items")
        .select_related("buyer", "seller")
        .filter(invoice_number=invoice_number)
    )
    return qs


@router.post("/{invoice_number}/items", response={200: InvoiceSchema, 404: ErrorSchema})
def add_invoice_item(request, invoice_number, invoice_item: InvoiceItemCreateSchema):
    
    invoice = Invoice.objects.filter(
        invoice_number=invoice_number,
    ).first()

    if not invoice:
        return 404, {"message": "Invoice not Found"}
    # calculate the total
    total = invoice_item.quantity * invoice_item.unit_price

    InvoiceItem.objects.create(
        description=invoice_item.description,
        quantity=invoice_item.quantity,
        unit_price=invoice_item.unit_price,
        total=total,
        invoice=invoice,
    )

    invoice.refresh_from_db()
    return invoice

@router.delete("/{invoice_number}")
def delete_invoice(request, invoice_number: str):
    invoice = get_object_or_404(Invoice, invoice_number=invoice_number)
    
    invoice.delete()
    return {"deleted": True}