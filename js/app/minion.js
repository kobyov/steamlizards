define(function (require) {
    var housing_js = require('app/housing');
});

var minions = {
    't0': {
        'name' : 'Pathetic Spawn',
        'spawning' : 0,
        'current' : 0,
        'consumption': {
            'resource' : 'biomass',
            'rate' : -0.018
        }
    }
};

var jobs = {
    'muckraker': {
        'name' : 'Muck Raker',
        'generates' : {
            'biomass' : 1
        },
        'technology' : 'muckraking',
        'building' : 'cesspool'
    }
}

function spawn_minion(house) {
    minions[house].spawning += 1;
    //some kind of randomised wait in here
    minions[house].current +=1;
    write_log("A " + minions[house].name + " has hatched</br>");
    minions[house].spawning -= 1;
    consumption[minions[house].consumption.resource] += minions[house].consumption.rate;
    $("#" + house + "_name").show();
    $("#" + house + "_count").show();
    $("#" + house + "_count").html(minions[house].current);
}