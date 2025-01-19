// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Indent", {
	refresh(frm) {
        frm.fields_dict.installation.get_query = function () {
            return {
                filters: [
                    ['custom_is_installation', '=', 1]
                ]
            };
        };
	},
    issue_category: function(frm) {
        frm.fields_dict.sub_issue_categories.get_query = function (doc) {
            return {
                filters: [
                    ['category', '=', frm.doc.issue_category]
                ]
            };
        };
        frm.set_value("sub_issue_categories", "");
        frm.refresh_field("sub_issue_categories");
    }
});
