from ninja import NinjaAPI

from invoice.api import router as invoice_router
from products.api import router as product_router

api = NinjaAPI(title="Inventorist API", description="Inventory Tracker")


@api.get("/health")
def health_check(request):
    return {"status": "ok"}


api.add_router("/products/", product_router)
api.add_router("/invoices/", invoice_router)
