var generation = {
    'stone' : 0,
    'biomass' : 0,
    'mutagen' : 0,
    'flint' : 0
};

var consumption = {
    'stone' : 0,
    'biomass' : 0,
    'mutagen' : 0,
    'flint' : 0
};

var resource = {
    'stone': {
        'name': 'Stone',
        'value': 0
    },
    'biomass': {
        'name': 'Biomass',
        'value': 0
    },
    'mutagen': {
        'name': 'Mutagen',
        'value': 0
    },
    'flint' : {
        'name': 'Flint',
        'value' : 0
    }
};

function create_storage() {
    for (res in resource) {
        if (!resource.hasOwnProperty(res)) {
            //The current property is not a direct property
            continue;
        }
        $("#storage").append("<div id='disp_" + res + "' style='display:none'>" + resource[res].name + ": " + resource[res].value + "</div>");
    }
}

function collect_stone() {
    resource.stone.value += 1;
}

function collect_biomass() {
    resource.biomass.value += 1;
}

function consume() {
    resource.biomass.value -= 5;
    resource.mutagen.value += 1;
}

function gather_resource() {
    for (res in generation) {
        resource[res].value += generation[res];
    }
    for (res in consumption) {
        resource[res].value += consumption[res];
        if(resource[res].value < 0) {
            resource[res].value = 0;
        }
    }
}