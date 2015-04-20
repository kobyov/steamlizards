define(function (require) {
    var resource_js = require('app/resource'),
        building_js = require('app/building'),
        w2ui = require('w2ui-1.4.2'),
        $ = require('jquery');
});

function write_log(message) {
    $("#log_contents").prepend(message);
}

function display_resources() {
    for (res in resource) {
        if (resource[res].visible) {
            //display the resource
            $("#disp_" + res).html(resource[res].name + ": " + resource[res].value.toFixed(3));
            $("#disp_" + res).show();
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

function generate_basic_buttons() {
    $("#control").append("<button id='btn_stone'>Rummage for Stone</button>");
    $("#control").append("<button id='btn_biomass'>Scrape up Detritus</button>");
    $("#control").append("<button id='btn_consume' title='Devour Biomass to unlock your potential'>CONSUME</button>");
    //add listeners to buttons
    $("#btn_stone").on("click", collect_stone);
    $("#btn_biomass").on("click", collect_biomass);
    $("#btn_consume").on("click", consume); 
}

function switch_panel(panel) {
    if (panel == 'tab_control'){
        $("#minion").hide();
        $("#tech").hide();
        $("#control").show();
    } else if (panel == 'tab_tech'){
        $("#control").hide();
        $("#minion").hide();
        $("#tech").show();
    } else if (panel == 'tab_minion'){
        $("#control").hide();
        $("#tech").hide();
        $("#minion").show();
    }
}

function initialise_gui() {
    var control_divs = '<div id="control"></div>';
    control_divs += '<div id="tech" style="display:none"></div>';
    control_divs += '<div id="minion" style="display:none"></div>';
    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#mainwindow').w2layout({
        name: 'mainwindow',
        panels: [
            { type: 'top', size: 30, resizable: true, style: pstyle, content: 'Steam Lizards v0.07' },
            { type: 'left', size: 200, resizable: true, style: pstyle, content: '<div id="storage"></div>' },
            { type: 'main', style: pstyle + 'border-top: 0px;', content: control_divs,
                tabs: {
                    active: 'tab_control',
                    tabs: [
                        { id: 'tab_control', caption: 'Control' },
                        { id: 'tab_tech', caption: 'Technology' },
                        { id: 'tab_minion', caption: 'Minions' },
                    ],
                    onClick: function (event) {
                        switch_panel(event.target);
                    }
                }
            },
            { type: 'right', size: 200, resizable: true, style: pstyle, content: 'Captains "Log":<p id="log_contents"></p>'}
        ]
    });
    generate_basic_buttons();
}


function update_gui() {
    display_resources();
    update_buttons();
    manage_technology();
    fill_housing();
}