define([
    'underscore',
    'backbone',
    'planks/desk',
    'text!planks/templates/plankView.html'

], function (_, Backbone, Desk, plankViewTemplate) {

    var PlankView = Backbone.View.extend({
        el:'#plank-view',

        initialize:function () {
            this.render();

            Desk.init({
                holder:'plank-view__paper',
                paperWidth:960,
                paperHeight:500,
                plankWeight:25,
                plankHeight:100,
                planksCount:20
            });
        },

        events:{

            'click #btnstartgame':'startGame',
            'click #btn-play-again': 'playAgagin'
        },

        startGame:function () {
            console.log('start Game planks');
            this.$('#btnstartgame').addClass('hide');
            this.$('#btnresetgame').removeClass('hide');
        },

        playAgain:function(){
            console.log('play again click');
            Desk.init({
                holder:'plank-view__paper',
                paperWidth:960,
                paperHeight:500,
                plankWeight:25,
                plankHeight:100,
                planksCount:20
            });
        },

        
        render:function () {
            this.$el.append(plankViewTemplate);
            this.$el.addClass('animated fadeInDownBig');
            console.log('PlankView.render');
        }

    });

    return PlankView;
});