from django.db import models
from django.utils.translation import gettext_lazy as _


class Product(models.Model):
    name = models.CharField(_("Name"), max_length=64)
    category = models.CharField(_("Category"), max_length=6, blank=True, null=True)
    supplier = models.CharField(_("Category"), max_length=64, blank=True, null=True)
    tags = models.CharField(
        _("Tags"), default="", blank=True, null=True, max_length=255
    )
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Product"
        ordering = ["name"]


class ProductVariant(models.Model):
    name = models.CharField(_("Name"), max_length=64)
    quantity = models.CharField(_("Name"), max_length=64)
    price = models.FloatField()
    bargain_price = models.FloatField(
        _("bargain price"), default=None, null=True, blank=True
    )
    units = models.IntegerField(default=0)
    product = models.ForeignKey(
        Product,
        verbose_name=_("variants"),
        related_name="variants",
        on_delete=models.CASCADE,
    )

    class Meta:
        db_table = "ProductVariant"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} - {self.product.name}"
