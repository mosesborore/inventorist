# Generated by Django 5.1.2 on 2025-04-24 08:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("invoice", "0002_alter_invoiceitem_quantity_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="invoice",
            name="buyer",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="invoice.buyer",
            ),
        ),
        migrations.AlterField(
            model_name="invoice",
            name="date",
            field=models.DateField(verbose_name="Invoice Date"),
        ),
        migrations.AlterField(
            model_name="invoice",
            name="due_date",
            field=models.DateField(
                blank=True, default="", null=True, verbose_name="Invoice Due Date"
            ),
        ),
        migrations.AlterField(
            model_name="invoice",
            name="invoice_number",
            field=models.CharField(default="ab7cc6b34d50", max_length=128, unique=True),
        ),
        migrations.AlterField(
            model_name="invoice",
            name="seller",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="invoice.seller",
            ),
        ),
    ]
