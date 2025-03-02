import frappe


def execute():
    add_roles()


def add_roles():
    roles = [
        {
            "role_name": "Factory User",
        },
        {
            "role_name": "HO",
        },
        {
            "role_name": "Branch Manager",
        },
    ]

    for role in roles:
        try:
            # Check if Role already exists
            if not frappe.db.exists(
                "Translation",
                {
                    "role_name": role["role_name"],
                },
            ):
                # Create and save the new Role document
                role_doc = frappe.get_doc(
                    {
                        "doctype": "Role",
                        "role_name": role["role_name"],
                    }
                )
                role_doc.save(ignore_permissions=True)
                frappe.db.commit()  # Commit the transaction to ensure the save is applied
                frappe.logger().info(
                    f"Added role: {role['role_name']} -> {role['role_name']}"
                )
        except Exception as e:
            frappe.logger("patch_exception").exception(f"Error adding role: {role}")
