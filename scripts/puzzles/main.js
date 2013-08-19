define([

    'underscore',
    'backbone',
    'puzzles/puzzleView'

], function (_, Backbone, PuzzleView) {

    var AppView = Backbone.View.extend({
        el: '#app-view',

        initialize: function () {
            console.log('AppView initialized');
        },

        events: {
            "click #btn-load-game": "loadGame"
        },

        loadGame: function () {
            var view = new PuzzleView();
            this.$('#btn-load-game').addClass('hide');
        }
    });

    return AppView;
});