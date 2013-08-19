define([

    'backbone',
    'puzzles',
    'circles',
    'planks'

], function(

    Backbone,
    Puzzles,
    Circles,
    Planks

    ){

    var Router = Backbone.Router.extend({
        routes: {
            'puzzle-game'  : 'loadPuzzles',
            'circle-game'  : 'loadCircles',
            'planks-game'  : 'loadPlanks'

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

        }
    });


    var r = new Router();
    Backbone.history.start();

});