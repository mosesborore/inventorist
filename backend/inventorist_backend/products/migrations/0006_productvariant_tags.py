# Generated by Django 5.1.2 on 2025-04-10 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0005_alter_productvariant_product"),
    ]

    operations = [
        migrations.AddField(
            model_name="productvariant",
            name="tags",
            field=models.CharField(
                blank=True, default="", max_length=255, null=True, verbose_name="Tags"
            ),
        ),
    ]
