define([
    'underscore',
    'backbone',
    'planks/plankView'

], function (_, Backbone, PlankView) {

    var AppView = Backbone.View.extend({
        el: '#app-view',

        initialize: function () {
            console.log('AppView initialized');
        },

        events: {
            "click #btn-load-game": "loadGame"
        },

        loadGame: function () {
            var view = new PlankView();
            this.$('#btn-load-game').addClass('hide');
        }
    });

    return AppView;
});