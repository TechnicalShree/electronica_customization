// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Repairing Slip", {
    refresh(frm) {
        frm.set_value("fault_diagnosed_by", frappe.session.user);
        frm.refresh_field("fault_diagnosed_by");
    },
});
