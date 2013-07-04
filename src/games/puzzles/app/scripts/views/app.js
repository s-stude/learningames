define([

    'jquery',
    'underscore',
    'backbone',
    'views/puzzleView'

], function ($, _, Backbone, PuzzleView) {

    var AppView = Backbone.View.extend({
        el:'#appview',

        initialize:function () {
            console.log('AppView initialized');
        },

        events:{
            "click #btnplaygame":"loadGame"
        },

        loadGame:function () {
            new PuzzleView();
        }
    });

    return AppView;
});