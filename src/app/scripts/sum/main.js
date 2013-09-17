define([
    'underscore',
    'backbone',
    'sum/sumView'

], function (_, Backbone, SumView) {

    var AppView = Backbone.View.extend({
        el: '#app-view',

        initialize: function () {
            console.log('AppView initialized');
        },

        events: {
            "click #btn-load-game": "loadGame"
        },

        loadGame: function () {
            var view = new SumView();
            this.$('#btn-load-game').addClass('hide');
        }
    });

    return AppView;
});