import datetime
from typing import Optional

from ninja import Field, ModelSchema, Schema

from invoice.models import Buyer, Invoice, InvoiceItem, Seller


class SellerSchema(ModelSchema):
    class Meta:
        model = Seller
        fields = ("id", "name", "address", "email", "phone")


class BuyerSchema(ModelSchema):
    class Meta:
        model = Buyer
        fields = ("id", "name", "phone", "address", "email")
        fields_optional = ["address", "email"]


class InvoiceItemSchema(ModelSchema):

    class Meta:
        model = InvoiceItem
        fields = ("id","description", "quantity", "unit_price", "total")


class InvoiceSchema(ModelSchema):
    items: list[InvoiceItemSchema]
    seller: SellerSchema
    buyer: BuyerSchema

    class Meta:
        model = Invoice
        fields = (
            "id",
            "invoice_number",
            "date",
            "due_date",
            "seller",
            "buyer",
            "payment_status",
            "notes",
            "total",
        )


class ErrorSchema(Schema):
    message: str


class InvoiceCreateSchema(Schema):
    date: datetime.date
    due_date: datetime.date = None
    buyer_name: str
    buyer_phone: str
    payment_status: str = "UNPAID"
    total: int = 0
    notes: str = ""


class InvoiceItemCreateSchema(Schema):
    description: str
    quantity: int = 1
    unit_price: int
    total: int = 0


class NewSellerSchema(Schema):
    name: str
    address: str
    email: Optional[str]
    phone: str


class BuyerSchema(Schema):
    id: int
    name: str
    address: str
    email: Optional[str]
    phone: str


# class InvoiceItemSchema(Schema):
#     id: int
#     description: str
#     quantity: int
#     unit_price: float
#     total: float


class CreateInvoiceResponseSchema(Schema):
    created: bool
    message: str
    invoiceNumber: Optional[str]


class InvoiceSummarySchema(Schema):
    """Invoice Summary Schema"""

    invoiceNumber: str = Field(alias="invoice_number")
    itemsCount: int = Field(alias="items_count")
    total: float
    buyerName: str = Field(alias="buyer__name")
    date: datetime.date
    paymentStatus: str = Field(alias="payment_status")
