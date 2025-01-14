frappe.ui.form.on("Item", {
    custom_main_selection: (frm) => {
        handleMainSelectionUpdate(frm);
    },
    custom_series: (frm) => {
        handleSeriesUpdate(frm);
    },
});


function handleMainSelectionUpdate(frm) {
    frm.fields_dict.custom_series.get_query = function (doc) {
        return {
            filters: [
                ['main_selection', '=', frm.doc.custom_main_selection]
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
                ['main_selection', '=', frm.doc.custom_main_selection],
                ['series', '=', frm.doc.custom_series]
            ]
        };
    };

    frm.set_value("custom_model", "");

    frm.refresh_field("custom_model");
}
