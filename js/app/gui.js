define(function (require) {
    var resource_js = require('app/resource'),
        building_js = require('app/building');
});

function write_log(message) {
    $("#log_contents").prepend(message);
}

function display_resources() {
    for (res in resource) {
        if (!resource.hasOwnProperty(res)) {
            //The current property is not a direct property of p
            continue;
        }
        if (resource[res].value > 0) {
            //display the resource
            $("#disp_" + res).html(resource[res].name + ": " + resource[res].value.toFixed(3));
            $("#disp_" + res).show();
        } else {
            $("#disp_" + res).hide();
        }
    }
}

function update_buttons() {
    for (structure in building) {
        if (!building.hasOwnProperty(structure)) {
            //The current property is not a direct property of p
            continue;
        }
        $("#btn_" + structure).html(building[structure].name + " (" + building[structure].count + ")");
        if (building[structure].count > 0) {
            $("#btn_" + structure).attr("disabled", true);
            $("#btn_" + structure).show();
        } else {
            $("#btn_" + structure).hide();
        }
        if (can_build(structure)) {
            $("#btn_" + structure).removeAttr("disabled");
            $("#btn_" + structure).show();
        }
    }
    if (resource.biomass.value < 5) {
        $("#btn_consume").attr("disabled", true);
    } else {
        $("#btn_consume").removeAttr("disabled");
    }
}

function create_controls() {
    for (structure in building) {
        if (!building.hasOwnProperty(structure)) {
            //The current property is not a direct property
            continue;
        }
        $("#control").append("<button id='btn_" + structure + "' style='display:none'>" + building[structure].name + " (" + building[structure].count + ")</button>");
        $("#btn_" + structure).on("click", {
            structure: structure
        }, build);
    }
}

function update_gui() {
    display_resources();
    update_buttons();
    manage_technology();
    fill_housing();
}