from datetime import datetime

from ninja import Schema


class ProductIn(Schema):
    name: str
    category: str = None
    supplier: str = None
    tags: str


class VariantInSchema(Schema):
    name: str
    quantity: str
    price: float
    bargain_price: float = 0.0
    units: int = 0


class VariantSchema(Schema):
    id: int
    name: str
    quantity: str
    price: float
    bargain_price: float | None = None
    units: int = 0


class ProductSchema(Schema):
    id: int
    name: str
    category: str = None
    supplier: str = None
    tags: str = None
    variants: list[VariantSchema]
    added_at: datetime
    updated_at: datetime


class ProductSummarySchema(Schema):
    id: int
    name: str
    variantsCount: int


class SearchSchema(Schema):
    pass
