define([

    'underscore',
    'backbone',
    'models/desk',
    'text!templates/puzzleView.html'

], function (_, Backbone, Desk, puzzleViewTemplate) {

    console.log(Desk);

    var PuzzleView = Backbone.View.extend({
        el:'#puzzle-view',

        initialize:function () {
            this.render();
        },

        events:{
            'click #btnstartgame':'startGame'
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

        render:function () {
            console.log('PuzzleView.render was fired.');
            this.$el.append(puzzleViewTemplate);
        }

    });

    return PuzzleView;
});