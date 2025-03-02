// Copyright (c) 2025, Hybrowlab and contributors
// For license information, please see license.txt

frappe.ui.form.on("Indent", {
    refresh(frm) {
        frm.fields_dict.service_call.get_query = function () {
            return {
                filters: [
                    ['custom_is_installation', '=', 1]
                ]
            };
        };
    },
    issue_category(frm) {
        frm.fields_dict.sub_issue_categories.get_query = function (doc) {
            return {
                filters: [
                    ['category', '=', frm.doc.issue_category]
                ]
            };
        };
        frm.set_value("sub_issue_categories", "");
        frm.refresh_field("sub_issue_categories");
    },
});

// Function to calculate totals for an individual row
function calculate_totals(frm, row) {
    if (!row) return;

    const sales_price = row.sales_price || 0;
    const extra_charges = row.extra_charges || 0;
    const quantity = row.quantity || 0;
    const discount = row.discount || 0;

    // Apply discount before calculating subtotal
    const sub_total = (sales_price + extra_charges) * quantity * (1 - discount / 100);
    const total_price = sub_total;

    // Set values in child table row
    frappe.model.set_value(row.doctype, row.name, "subtotal", sub_total);
    frappe.model.set_value(row.doctype, row.name, "total_price", total_price);

    // Refresh child table field
    frm.refresh_field("items");
}

frappe.ui.form.on("Indent Item", {
    list_price: function (frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        frappe.model.set_value(row.doctype, row.name, "sales_price", row.list_price || 0);
    },
    sales_price: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn] || null;

        calculate_totals(frm, row);
    },
    extra_charges: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn] || null;

        calculate_totals(frm, row);
    },
    quantity: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn] || null;

        calculate_totals(frm, row);
    },
    discount: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn] || null;

        // Validate discount range (0 - 100)
        if (row.discount < 0 || row.discount > 100) {
            frappe.msgprint(__("Discount must be between 0 and 100."));
            row.discount = Math.min(Math.max(row.discount, 0), 100); // Clamp value
            frappe.model.set_value(row.doctype, row.name, "discount", row.discount);
        }

        calculate_totals(frm, row);
    },
});
