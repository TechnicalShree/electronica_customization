import frappe


def get_permission_query_conditions_for_maintenance_visit(user):
    user = user or frappe.session.user
    user_roles = frappe.get_roles(user)

    # Allow full access for Administrator or System Manager
    if user == "Administrator" or "System Manager" in user_roles:
        return ""

    user_branch = frappe.get_value("Employee", {"user_id": user}, "branch")
    if "Branch Engineer" in user_roles:
        return f"""
        (
            `tabMaintenance Visit`.`owner` = '{user}'
            OR
            EXISTS (
                SELECT 1
                FROM `tabEmployee` emp
                WHERE emp.`user_id` = `tabMaintenance Visit`.`custom_assigned_engineer`
                AND emp.`branch` = '{user_branch}'
            )
        )
        """

    # Filter Maintenance Visit records where:
    # - The owner is the current user OR
    # - The Maintenance Visit is referenced in Warranty Claim (custom_parent_service_call)
    #   for which the custom_assigned_engineer is the current user.
    return f"""
    (
        `tabMaintenance Visit`.`owner` = '{user}'
        OR
        `tabMaintenance Visit`.`custom_assigned_engineer` = '{user}'
    )
    """
