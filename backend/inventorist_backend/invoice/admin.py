from django.contrib import admin

from invoice.models import Buyer, Invoice, InvoiceItem, Seller

admin.site.site_header = "Inventorist Admin"
admin.site.site_title = "Inventorist Admin"


admin.site.register(Buyer)
admin.site.register(Seller)
admin.site.register(Invoice)
admin.site.register(InvoiceItem)
