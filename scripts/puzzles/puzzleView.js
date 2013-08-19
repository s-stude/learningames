define([

    'underscore',
    'backbone',
    'puzzles/desk',
    'text!puzzles/templates/puzzleView.html'

], function (_, Backbone, Desk, puzzleViewTemplate) {

    var PuzzleView = Backbone.View.extend({
        el:'#puzzle-view',

        initialize:function () {
            this.render();

            Desk.init({
                holder: 'puzzle-view__paper',
                rows: 3,
                cols: 3,
                cellWidth : 100,
                cellHeight : 100,
                cellPadding: 5
            });
        },

        events:{
            'click #btnstartgame':'startGame',
            'click #btn-reset-game':'resetGame',
            'click #btn-show-hint' : 'showGameHint'
        },

        startGame:function () {


            this.$('#btnstartgame').addClass('hide');
            this.$('#btnresetgame').removeClass('hide');
        },

        resetGame: function(){
            Desk.reset();
        },

        showGameHint: function(){
            console.log('btn-show-hint');
        },

        render:function () {
            this.$el.append(puzzleViewTemplate);
            this.$el.addClass('animated fadeInDownBig');
            console.log('PuzzleView.render');
        }

    });

    return PuzzleView;
});