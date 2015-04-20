define(function (require) {
    var $ = require('jquery');
});

var technology = {
    'bioluminescence': {
        'name': 'Bioluminescence',
        'description': 'Steamlizards can now chemically produce light, allowing them to grow Biomass',
        'cost': {
            'mutagen': {
                'value': 15
            }
        },
        'unlocked': false
    },
    'muckraking': {
        'name' : 'Muck Raking',
        'description' : 'Steamlizards can now tend to the cesspits',
        'cost': {
            'mutagen': {
                'value' : 25
            }
        },
        'unlocked' : false,
        'technology' : 'bioluminescence'
    }
};

function tech_visible(tech) {
    var visible = false;
    if (technology[tech].unlocked) {
        return false;
    }
    if (technology[tech].technology) {
        if (technology[technology[tech].technology].unlocked) {
            visible = true;
        } else {
            return false;
        }
    }
    for (req in technology[tech].cost) {
        if (!technology[tech].cost.hasOwnProperty(req)) {
            //The current property is not a direct property
            continue;
        }
        if (resource[req].value >= technology[tech].cost[req].value / 2) {
            visible = true;
        } else {
            return false;
        }
    }
    return visible;
}

function tech_researchable(tech) {
    if(technology[tech].unlocked) {
        return false;
    }
    var visible = false;
    if (technology[tech].technology) {
        if (technology[technology[tech].technology].unlocked) {
            visible = true;
        } else {
            return false;
        }
    }
    for (req in technology[tech].cost) {
        if (!technology[tech].cost.hasOwnProperty(req)) {
            //The current property is not a direct property
            continue;
        }
        if (resource[req].value >= technology[tech].cost[req].value) {
            visible = true;
        } else {
            return false;
        }
    }
    return visible;
}

function manage_technology() {
    for (tech in technology) {
        if (!technology.hasOwnProperty(tech)) {
            //The current property is not a direct property of p
            continue;
        }
        if (tech_visible(tech)) {
            var button = $("#btn_" + tech);
            if (!jQuery.contains(document.documentElement, button[0])) {
                console.log(tech + ' is now available');
                $("#tech").append("<button id='btn_" + tech + "'>" + technology[tech].name + "</button>");
                $("#btn_" + tech).on("click", {tech: tech}, research);
                $("#btn_" + tech).attr("disabled", true);
            }
        }
        if (tech_researchable(tech)) {
            $("#btn_" + tech).removeAttr("disabled");    
        } else {
            $("#btn_" + tech).attr("disabled", true);
        }
    }
}

function research(techno) {
    var tech = techno.data.tech;
    for (req in technology[tech].cost) {
        if (!technology[tech].cost.hasOwnProperty(req)) {
            //The current property is not a direct property
            continue;
        }
        resource[req].value -= technology[tech].cost[req].value;
    }
    technology[tech].unlocked = true;
    $("#btn_" + tech).hide();
    write_log("Uncovered the secrets of " + technology[tech].name + "</br>");
}