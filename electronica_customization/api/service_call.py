import frappe
from frappe.model.mapper import get_mapped_doc


@frappe.whitelist()
def create_indent(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Warranty Claim",
        source_name,
        {"Warranty Claim": {"doctype": "Indent", "field_map": {}}},
        target_doc,
    )
    target_doc.installation = source_name
    return target_doc
