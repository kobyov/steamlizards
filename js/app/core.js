define(function (require) {
    var $ = require('jquery'),
        lib = require('./lib'),
        resource_js = require('app/resource'),
        building_js = require('app/building'),
        technology_js = require('app/technology'),
        minion_js = require('app/minion'),
        housing_js = require('app/housing'),
        gui_js = require('app/gui'),
        w2ui = require('w2ui-1.4.2');
    
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


    var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: 30, resizable: true, style: pstyle, content: 'Steam Lizards v0.06' },
            { type: 'left', size: 200, resizable: true, style: pstyle, content: 'left' },
            { type: 'main', style: pstyle + 'border-top: 0px;', content: 'main',
                tabs: {
                    active: 'tab_control',
                    tabs: [
                        { id: 'tab_control', caption: 'Control' },
                        { id: 'tab_tech', caption: 'Technology' },
                        { id: 'tab_minion', caption: 'Minions' },
                    ],
                    onClick: function (event) {
                        this.owner.content('main', event);
                    }
                }
            },
            { type: 'right', size: 200, resizable: true, style: pstyle, content: 'right'}
        ]
    });


        //add listeners to buttons
        $("#btn_stone").on("click", collect_stone);
        $("#btn_biomass").on("click", collect_biomass);
        $("#btn_consume").on("click", consume);
    });
});
