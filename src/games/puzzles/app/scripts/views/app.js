define([

    'jquery',
    'underscore',
    'backbone',
    'model/desk',
    'views/puzzleView'

], function ($, _, Backbone, Desk, PuzzleView) {

    console.log(Desk);

    var AppView = Backbone.View.extend({
        el:'#app-view',

        initialize:function () {
            console.log('AppView initialized');
        },

        events:{
            "click #btnplaygame":"loadGame"
        },

        loadGame:function () {
            console.log('loadGame was clicked');
            new PuzzleView();
        }
    });

    return AppView;
});