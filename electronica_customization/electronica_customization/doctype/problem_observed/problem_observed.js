// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Problem Observed", {
    refresh(frm) {
        frm.add_custom_button(__("Indent"), function () {
            frappe.model.open_mapped_doc({
                method: "electronica_customization.api.service_call.create_indent",
                frm: frm,
            });
        }, 'Create');
    },
});
