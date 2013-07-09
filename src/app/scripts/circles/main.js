define([

    'underscore',
    'backbone',
    'circles/circleView'

], function (_, Backbone, CircleView) {

    var AppView = Backbone.View.extend({
        el: '#app-view',

        initialize: function () {
            console.log('AppView initialized');
        },

        events: {
            "click #btn-load-game": "loadGame"
        },

        loadGame: function () {
            var view = new CircleView();
            this.$('#btn-load-game').addClass('hide');
        }
    });

    return AppView;
});