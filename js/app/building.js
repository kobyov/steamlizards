define(function (require) {
    var resource_js = require('app/resource'),
        technology_js = require('app/technology');
});

var building = {
    'nest': {
        'name': 'Nest',
        'requirements': {
            'stone': {
                'value': 20
            }
        },
        'multiplier': 1.5,
        'count': 0,
        'housing' : {
            't0' : 2
        }
    },
    'cesspool': {
        'name': 'Cesspool',
        'requirements': {
            'stone': {
                'value': 20
            },
            'biomass': {
                'value': 10
            }
        },
        'multiplier': 1.15,
        'count': 0,
        'technology': 'bioluminescence',
        'generates' : {
            'biomass' : 0.01
        }
    }
};

function can_build(structure) {
    var buildable = false;
    if (building[structure].technology) {
        if (technology[building[structure].technology].unlocked) {
            buildable = true;
        } else {
            return false;
        }
    }
    for (req in building[structure].requirements) {
        if (!building[structure].requirements.hasOwnProperty(req)) {
            //The current property is not a direct property
            continue;
        }
        currentcost = building[structure].requirements[req].value;
        if (building[structure].count > 0) {
            currentcost *= building[structure].count * building[structure].multiplier;
        }
        if (resource[req].value >= currentcost) {
            buildable = true;
        } else {
            return false;
        }
    }
    return buildable;
}

function build(structure) {
    target = structure.data.structure;
    for (req in building[target].requirements) {
        if (!building[target].requirements.hasOwnProperty(req)) {
            //The current property is not a direct property
            continue;
        }
        if (building[target].count > 0) {
            resource[req].value -= building[target].requirements[req].value * building[target].count * building[target].multiplier;
        } else {
            resource[req].value -= building[target].requirements[req].value;
        }
    }
    building[target].count += 1;
    if(building[target].generates) {
        for (res in building[target].generates) {
            if (!building[target].generates.hasOwnProperty(res)) {
                //The current property is not a direct property
                continue;
            }
            generation[res] += building[target].generates[res];
        }
    }
    if(building[target].housing) {
        for (house in building[target].housing) {
            if (!building[target].housing.hasOwnProperty(house)) {
                //The current property is not a direct property
                continue;
            }
            housing[house] += building[target].housing[house];
        }
    }
    write_log("Created a "+building[target].name+"</br>");
}
