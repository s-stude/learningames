define([

    'underscore',
    'backbone',
    'puzzles/desk',
    'text!puzzles/templates/puzzleView.html'

], function (_, Backbone, Desk, puzzleViewTemplate) {

    console.log(Desk);

    var PuzzleView = Backbone.View.extend({
        el:'#puzzle-view',

        initialize:function () {
            this.render();
        },

        events:{
            'click #btnstartgame':'startGame',
            'click #btn-reset-game':'resetGame',
            'click #btn-show-hint' : 'showGameHint'
        },

        startGame:function () {
            Desk.init({
                holder: 'puzzle-view__paper',
                width: 300,
                height: 300,
                rows: 3,
                cols: 3
            });

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
            console.log('PuzzleView.render');
        }

    });

    return PuzzleView;
});