define([

    'jquery',
    'underscore',
    'backbone',
    'text!templates/puzzleView.html'

], function (

    $,
    _,
    Backbone,
    puzzleViewTemplate

    ) {
    var PuzzleView = Backbone.View.extend({
        el: '#puzzleViewContainer',

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.append(puzzleViewTemplate);
        }

    });

    return PuzzleView;
});