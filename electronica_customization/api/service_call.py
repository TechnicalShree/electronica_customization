import frappe
from frappe.model.mapper import get_mapped_doc
from frappe.utils import today


# electronica_customization.api.service_call.create_indent
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


# electronica_customization.api.service_call.create_quotation
@frappe.whitelist()
def create_quotation(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Warranty Claim",
        source_name,
        {"Warranty Claim": {"doctype": "Quotation", "field_map": {}}},
        target_doc,
    )
    source_doc = frappe.get_doc("Warranty Claim", source_name)

    target_doc.custom_service_call = source_name
    target_doc.party_name = source_doc.customer
    return target_doc


# electronica_customization.api.service_call.create_problem_observed
@frappe.whitelist()
def create_problem_observed(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Warranty Claim",
        source_name,
        {"Warranty Claim": {"doctype": "Problem Observed", "field_map": {}}},
        target_doc,
    )
    source_doc = frappe.get_doc("Warranty Claim", source_name)

    target_doc.service_call = source_name
    target_doc.serial_number = source_doc.serial_no
    target_doc.machine_model = source_doc.custom_mc_model
    target_doc.date = today()
    return target_doc
