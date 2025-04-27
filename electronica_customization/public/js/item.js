frappe.ui.form.on("Item", {
    setup: (frm) => {
        frm.fields_dict.custom_series.get_query = function (doc) {
            return {
                filters: [
                    ['main_selection', '=', frm.doc?.custom_product_family || ""]
                ]
            };
        };

        frm.fields_dict.custom_model.get_query = function (doc) {
            return {
                filters: [
                    ['main_selection', '=', frm.doc?.custom_product_family || ""],
                    ['series', '=', frm.doc?.custom_series || ""]
                ]
            };
        };
    },
    custom_product_family: (frm) => {
        handleProductFamilyUpdate(frm);
        update_name(frm);
    },
    custom_series: (frm) => {
        handleSeriesUpdate(frm);
        update_name(frm);
    },
    custom_model: (frm) => {
        update_name(frm);
    },
    custom_list_price: (frm) => {
        const custom_list_price = frm.doc.custom_list_price ?? 0;

        // Unit Price is 15% more than List Price
        frm.set_value("custom_unit_price", custom_list_price.toFixed(2) * 1.15);
    }
});

function update_name(frm) {
    const { custom_product_family, custom_series, custom_model } = frm.doc;
    if (custom_product_family && custom_series && custom_model) {
        frappe.call({
            method: "electronica_customization.api.item.get_next_item_name",
            args: { custom_product_family, custom_series, custom_model },
            callback: (r) => {
                if (!r.exc) {
                    // set the autoname preview (or override the actual name on Save)
                    frm.set_value("item_code", r.message);

                    frm.refresh_field("item_code");
                }
            },
        });
    }
}



function handleProductFamilyUpdate(frm) {
    frm.fields_dict.custom_series.get_query = function (doc) {
        return {
            filters: [
                ['main_selection', '=', frm.doc.custom_product_family]
            ]
        };
    };

    frm.set_value("custom_series", "");
    frm.set_value("custom_model", "");

    frm.refresh_field("custom_series");
    frm.refresh_field("custom_model");
}

function handleSeriesUpdate(frm) {
    frm.fields_dict.custom_model.get_query = function (doc) {
        return {
            filters: [
                ['main_selection', '=', frm.doc.custom_product_family],
                ['series', '=', frm.doc.custom_series]
            ]
        };
    };

    frm.set_value("custom_model", "");

    frm.refresh_field("custom_model");
}
