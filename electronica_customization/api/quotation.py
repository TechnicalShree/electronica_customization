import frappe
from frappe.model.mapper import get_mapped_doc


# electronica_customization.api.quotation.create_sales_order
@frappe.whitelist()
def create_sales_order(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Quotation",
        source_name,
        {
            "Quotation": {
                "doctype": "Sales Order",
                "field_map": {}
            },
            "Quotation Item": {
                "doctype": "Sales Order Item",
                "field_map": {
                    "item_code": "item_code",
                    "qty": "qty",
                    "rate": "rate",
                    "amount": "amount"
                }
            }
        },
        target_doc,
    )

    source_doc = frappe.get_doc("Quotation", source_name)

    target_doc.custom_quotation = source_name
    target_doc.customer = source_doc.party_name
    target_doc.custom_mode_of_dispatch = source_doc.custom_mode_of_dispatch

    return target_doc
