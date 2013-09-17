define([

    'backbone',
    'puzzles',
    'circles',
    'planks',
    'sum'

], function(

    Backbone,
    Puzzles,
    Circles,
    Planks,
    Sum

    ){

    var Router = Backbone.Router.extend({
        routes: {
            'puzzle-game'  : 'loadPuzzles',
            'circle-game'  : 'loadCircles',
            'planks-game'  : 'loadPlanks',
            'sum-game'     : 'loadSum'
        },

        loadPuzzles: function(){
            new Puzzles();
        },

        loadCircles: function()
        {
            new Circles();

        },

        loadPlanks: function()
        {
            new Planks();

        },

        loadSum: function()
        {
            new Sum();
        }
    });


    var r = new Router();
    Backbone.history.start();

});