// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Problem Observed", {
    refresh(frm) {
        if (!frm.doc.__islocal) {
            frm.add_custom_button(__("Create Indent"), function () {
                frappe.model.open_mapped_doc({
                    method: "electronica_customization.api.problem_observed.create_indent",
                    frm: frm,
                });
            });
        }
    },
});
