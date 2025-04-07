import frappe


def get_permission_query_conditions_for_customer(user):
    user = user or frappe.session.user

    user_roles = frappe.get_roles(user)

    # Allow full access for Administrator or System Manager
    if user == "Administrator" or "System Manager" in user_roles:
        return ""

    user_branch = frappe.get_value("Employee", {"user_id": user}, "branch")

    return f"""
        `tabCustomer`.`custom_branch_name` = '{user_branch}'
    """