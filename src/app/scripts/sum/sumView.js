define([
    'underscore',
    'backbone',
    'sum/desk',
    'text!sum/templates/sumView.html'

], function (_, Backbone, Desk, sumViewTemplate) {

    var SumView = Backbone.View.extend({
        el:'#sum-view',

        initialize:function () {
            this.render();

            // Desk.init({
            //     holder:'sum-view__paper',
            //     paperWidth:960,
            //     paperHeight:500,
            //     plankWeight:25,
            //     plankHeight:100,
            //     planksCount:20
            // });
        },

        events:{

            // 'click #btnstartgame':'startGame',
            // 'click #btn-play-again': 'playAgagin'
        },

        startGame:function () {
            console.log('start Game planks');
            this.$('#btnstartgame').addClass('hide');
            this.$('#btnresetgame').removeClass('hide');
        },

        playAgain:function(){
            console.log('play again click');
            
        },

        
        render:function () {
            this.$el.append(sumViewTemplate);
            this.$el.addClass('animated fadeInDownBig');
            console.log('SumView.render');
        }

    });

    return SumView;
});