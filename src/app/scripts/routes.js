define([

    'backbone',
    'puzzles',
    'circles'

], function(

    Backbone,
    Puzzles,
    Circles

    ){

    var Router = Backbone.Router.extend({
        routes: {
            'puzzle-game'  : 'loadPuzzles',
            'circle-game' : 'loadCircles'

        },

        loadPuzzles: function(){
            new Puzzles();
        },

        loadCircles: function()
        {
            new Circles();

        }
    });


    var r = new Router();
    Backbone.history.start();

});