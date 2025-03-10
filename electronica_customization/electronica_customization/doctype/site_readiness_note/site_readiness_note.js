// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

// Helper function to set the read-only state of "service_call"
function setServiceCallReadOnly(frm) {
    // If the document is new (__islocal is true), allow editing; otherwise, make it read-only.
    const readOnly = frm.doc.__islocal ? 0 : 1;
    frm.set_df_property("service_call", "read_only", readOnly);
}

frappe.ui.form.on("Site Readiness Note", {
    setup: function (frm) {
        frm.fields_dict.service_call.get_query = function () {
            return {
                filters: [
                    ['custom_is_installation', '=', 1]
                ]
            };
        };
    },
    refresh: function (frm) {
        setServiceCallReadOnly(frm);
    },
});
