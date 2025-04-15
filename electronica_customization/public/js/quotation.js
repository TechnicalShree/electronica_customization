async function getItemUnitPrice(frm, row) {
    if (!row?.item_code) return;

    const data = await frappe.call({
        method: "frappe.client.get_value",
        args: {
            doctype: "Item",
            filters: {
                name: row.item_code
            },
            fieldname: ["custom_unit_price"]
        }
    })

    return data?.message?.custom_unit_price || 0;
}

async function setItemDetails(frm, row) {
    if (!row) return;

    const item_unit_price = await getItemUnitPrice(frm, row);
    frappe.model.set_value(row.doctype, row.name, "price_list_rate", item_unit_price);
    frappe.model.set_value(row.doctype, row.name, "rate", item_unit_price);

    frm.refresh_field("items");
}

frappe.ui.form.on('Quotation', {
    refresh: function (frm) {
        if (!frm.doc.__islocal && !!frm.doc?.custom_is_create_so) {
            frm.add_custom_button(__("Create Sales Order"), () => {
                frappe.model.open_mapped_doc({
                    method:
                        "electronica_customization.api.quotation.create_sales_order",
                    frm: frm,
                });
            });
        }
    },
    validate: function (frm) {
        if (frm.doc.valid_till) {
            // Get today's date and compute the maximum allowed date (one month from today)
            let currentDate = frappe.datetime.get_today();
            let maxDate = frappe.datetime.add_months(currentDate, 1);

            // Convert the string dates to Date objects
            let validTillDate = new Date(frm.doc.valid_till);
            let maxDateObj = new Date(maxDate);

            // Compare the dates
            if (validTillDate > maxDateObj) {
                frappe.msgprint(__(`The Valid Till date should be within ${maxDateObj.getDate()}-${maxDateObj.getMonth() + 1}-${maxDateObj.getFullYear()} one month from today.`));
                frappe.validated = false;
            }
        }
    }
});


frappe.ui.form.on("Quotation Item", {
    item_code: function (frm, cdt, cdn) {
        setTimeout(() => {
            const row = locals[cdt][cdn] || null;
            setItemDetails(frm, row);
        }, 300)
    },
    qty: function (frm, cdt, cdn) {
        setTimeout(() => {
            const row = locals[cdt][cdn] || null;
            setItemDetails(frm, row);
        }, 300)
    },
});
