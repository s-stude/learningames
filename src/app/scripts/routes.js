define([

    'backbone',
    'puzzles'

], function(

    Backbone,
    Puzzles

    ){

    var Router = Backbone.Router.extend({
        routes: {
            'puzzle-game' : 'loadPuzzles'
        },

        loadPuzzles: function(){
            new Puzzles();
        }
    });


    var r = new Router();
    Backbone.history.start();

});