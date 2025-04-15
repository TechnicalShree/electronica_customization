import frappe
from frappe.model.mapper import get_mapped_doc


# electronica_customization.api.problem_observed.create_indent
@frappe.whitelist()
def create_indent(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Problem Observed",
        source_name,
        {"Problem Observed": {"doctype": "Indent", "field_map": {}}},
        target_doc,
    )
    source_doc = frappe.get_doc("Problem Observed", source_name)

    target_doc.service_call = source_doc.get("service_call")
    target_doc.is_installation = frappe.get_value(
        "Warranty Claim", source_doc.get("service_call"), "custom_is_installation"
    )
    target_doc.issue_category = frappe.get_value(
        "Warranty Claim", source_doc.get("service_call"), "complaint"
    )
    target_doc.sub_issue_categories = frappe.get_value(
        "Warranty Claim", source_doc.get("service_call"), "custom_issue_type"
    )

    return target_doc
