define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        resource_js = require('app/resource'),
        building_js = require('app/building'),
        technology_js = require('app/technology'),
        minion_js = require('app/minion'),
        housing_js = require('app/housing'),
        gui_js = require('app/gui');
    
    //init clock
    var ticklength = 200;
    
    //content goes here
    console.log(resource.stone.value);
    function tick() {
        gather_resource();
        update_gui();
    }
    $(function() {
        create_storage();
        create_controls();
        write_log("It is dark and you are hungry");
        var clock = setInterval(function () {tick(); }, ticklength);



        //add listeners to buttons
        $("#btn_stone").on("click", collect_stone);
        $("#btn_biomass").on("click", collect_biomass);
        $("#btn_consume").on("click", consume);
    });
});