define([
    'underscore',
    'backbone',
    'planks/desk',
    'text!planks/templates/plankView.html'

], function (_, Backbone, Desk, plankViewTemplate) {

    var PuzzleView = Backbone.View.extend({
        el:'#plank-view',

        initialize:function () {
            this.render();

            Desk.init({
                holder:'plank-view__paper',
                paperWeight:500,
                paperHeight:500,
                plankWeight:25,
                plankHeight:100,
                planksCount:20
            });
        },

        events:{
            'click #btnstartgame':'startGame'
            
        },

        startGame:function () {

            this.$('#btnstartgame').addClass('hide');
            this.$('#btnresetgame').removeClass('hide');
        },

        
        render:function () {
            this.$el.append(plankViewTemplate);
            this.$el.addClass('animated fadeInDownBig');
            console.log('PlankView.render');
        }

    });

    return PuzzleView;
});