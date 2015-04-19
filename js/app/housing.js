var housing = {
    't0' : 0
};

function fill_housing() {
    for (house in housing) {
        if (!housing.hasOwnProperty(house)) {
            //The current property is not a direct property of p
            continue;
        }
        if (housing[house] > 0 && (minions[house].current+minions[house].spawning) < housing[house]) {
            spawn_minion(house);
        }
    }
}