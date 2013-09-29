define(function (require) {

    var Backbone = require('Backbone');

    var Puzzles = require('puzzles');
    var Circles = require('circles');
    var Planks = require('planks');
    var Sum = require('sum');


    var Router = Backbone.Router.extend({
        routes:{
            'puzzle-game':'loadPuzzles',
            'circle-game':'loadCircles',
            'planks-game':'loadPlanks',
            'sum-game':'loadSum'
        },

        loadPuzzles:function () {
            new Puzzles();
        },

        loadCircles:function () {
            new Circles();

        },

        loadPlanks:function () {
            new Planks();

        },

        loadSum:function () {
            new Sum();
        }
    });


    var r = new Router();
    Backbone.history.start();

});