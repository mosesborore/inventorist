from uuid import uuid4

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _


class Seller(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(_("Name"), max_length=255)
    address = models.TextField()
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True, default="")
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        db_table = "Seller"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} - {self.id}"


class Buyer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(_("Name"), max_length=255)
    address = models.TextField(default="", blank=True, null=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True, default="")
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        db_table = "Buyer"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} - {self.id}"


class Invoice(models.Model):

    class PaymentStatus(models.TextChoices):
        UNPAID = "UNPAID"
        PAID = "PAID"

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    invoice_number = models.CharField(
        max_length=128, default=uuid4().hex[:12], unique=True
    )
    date = models.DateField(_("Invoice Date"))
    due_date = models.DateField(
        _("Invoice Due Date"), default="", null=True, blank=True
    )
    seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    payment_status = models.CharField(
        max_length=20, choices=PaymentStatus, default=PaymentStatus.UNPAID
    )
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        db_table = "Invoice"
        ordering = ["-created_at"]

    @property
    def calculate_total(self):
        "property that calcualates total"
        total = sum([item.total for item in self.items.all()])
        if self.total != total:
            self.total = total
            self.save(update_fields=["total", "updated_at"])
        return total

    @property
    async def acalculate_total(self):
        "async version of calcualate total property"
        total = 0
        async for item in self.items.all():
            total += item.total

        if self.total != total:
            self.total = total
            await self.asave(update_fields=["total", "updated_at"])
        return total

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        total = total = sum([item.total for item in self.items.all()])
        if total != self.total:
            self.total = total
        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return f"{self.invoice_number} - {self.total}"


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, related_name="items", on_delete=models.CASCADE)
    description = models.TextField()
    quantity = models.PositiveBigIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        db_table = "InvoiceItem"
        ordering = ["-created_at"]

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        total = self.quantity * self.unit_price
        if total != self.total:
            self.total = total

        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return f"{self.invoice.invoice_number} - {self.description}"


@receiver(post_save, sender=InvoiceItem)
async def update_invoice_total_handler(sender, **kwargs):
    """handler to cause invoice total calculations"""
    invoice_item_instance: InvoiceItem = kwargs["instance"]
    await invoice_item_instance.invoice.acalculate_total
