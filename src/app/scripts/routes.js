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
            'puzzle-game' : 'loadPuzzles',
            'circles-game' : 'loadCircles'

        },

        loadPuzzles: function(){
            new Puzzles();
        },

        loadCircles: function()
        {

        }
    });


    var r = new Router();
    Backbone.history.start();

});