from electronica_customization.api.engineer_visit import get_primary_address
import frappe
from frappe.model.mapper import get_mapped_doc
from frappe.utils import today


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
    target_doc.machine_model = source_doc.custom_machine_model
    target_doc.date = today()
    return target_doc


# electronica_customization.api.service_call.create_repaire_slip
@frappe.whitelist()
def create_repaire_slip(source_name, target_doc=None):
    target_doc = get_mapped_doc(
        "Warranty Claim",
        source_name,
        {"Warranty Claim": {"doctype": "Repairing Slip", "field_map": {}}},
        target_doc,
    )

    source_doc = frappe.get_doc("Warranty Claim", source_name)
    customer_address_details = get_primary_address(source_doc.customer)

    target_doc.is_installation = source_doc.get("custom_is_installation")
    target_doc.category = "Warrenty" if target_doc.is_installation else "Installation"

    target_doc.customer_billing_address = customer_address_details.get(
        "primary_billing_address"
    )
    target_doc.customer_shipping_address = customer_address_details.get(
        "primary_shipping_address"
    )

    target_doc.billing_address = frappe.get_value(
        "Address", target_doc.customer_billing_address, "address_line1"
    )
    target_doc.shipping_address = frappe.get_value(
        "Address", target_doc.customer_shipping_address, "address_line1"
    )
    target_doc.customer_contact = frappe.get_value(
        "Customer", target_doc.customer, "customer_primary_contact"
    )
    target_doc.mobile_no = frappe.get_value(
        "Contact", target_doc.customer_contact, "mobile_no"
    )
    target_doc.email = frappe.get_value(
        "Contact", target_doc.customer_contact, "email_id"
    )

    target_doc.date_of_visit = today()

    return target_doc


# electronica_customization.api.service_call.is_installation_done_already
@frappe.whitelist()
def is_installation_done_already(serial_no):
    return (
        True
        if frappe.db.exists(
            "Warranty Claim",
            {"serial_no": serial_no, "status": "Installation Completed"},
        )
        else False
    )
