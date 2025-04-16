import frappe
from frappe.auth import date_diff
from frappe.model.mapper import get_mapped_doc
from frappe.utils import add_months, getdate


# electronica_customization.api.installation_note.create_serial_no
@frappe.whitelist()
def create_serial_no(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Installation Note",
        source_name,
        {
            "Installation Note": {"doctype": "Serial No", "field_map": {}},
        },
        target_doc,
    )

    source_doc = frappe.get_doc("Installation Note", source_name)

    if len(source_doc.items) == 1:
        item = source_doc.items[0]
        target_doc.serial_no = item.serial_no
        target_doc.item_code = item.item_code
        target_doc.custom_product_family = item.custom_product_family
        target_doc.custom_model = item.custom_model
        target_doc.item_name = item.custom_item_name
        target_doc.description = item.description

    target_doc.custom_customer_code = source_doc.customer
    target_doc.custom_warranty_start_date = source_doc.inst_date
    target_doc.custom_customer_name = source_doc.customer_name

    # Calculate expiry dates using add_months
    inst_expiry = add_months(source_doc.inst_date, 12)

    # If an invoice date exists, calculate the expiry date from that date as well
    if source_doc.custom_invoice_date:
        invoice_expiry = add_months(source_doc.custom_invoice_date, 15)
        # Convert the computed expiry dates to date objects for proper comparison
        if getdate(inst_expiry) <= getdate(invoice_expiry):
            target_doc.warranty_expiry_date = inst_expiry
        else:
            target_doc.warranty_expiry_date = invoice_expiry
    else:
        target_doc.warranty_expiry_date = inst_expiry

    # Calculate warranty_period as the day difference between warranty_expiry_date and custom_warranty_start_date
    diff = date_diff(
        getdate(target_doc.warranty_expiry_date),
        getdate(target_doc.custom_warranty_start_date),
    )

    # Ensure that warranty_period is not negative (i.e., set it to 0 in worst-case scenario)
    target_doc.warranty_period = diff if diff >= 0 else 0

    return target_doc
