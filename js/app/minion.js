define(function (require) {
    var housing_js = require('app/housing');
});

var minions = {
    't0': {
        'name' : 'Basic Spawn',
        'spawning' : 0,
        'current' : 0,
        'consumption': {
            'resource' : 'biomass',
            'rate' : -0.018
        }
    }
};

function spawn_minion(house) {
    minions[house].spawning += 1;
    //some kind of randomised wait in here
    minions[house].current +=1;
    write_log("A pathetic minion has hatched</br>");
    minions[house].spawning -= 1;
    consumption[minions[house].consumption.resource] += minions[house].consumption.rate;
}