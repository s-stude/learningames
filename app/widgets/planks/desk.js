define( function(require) {

    var _ = require('Underscore');
    var Backbone = require('Backbone');
    var Raphael = require('Raphael');

    var plank = require('./plank');

    return (function Desk() {

        var props = {},

            initProps = function(overrides) {
                var computed = {
                    holder: overrides.holder,
                    paperWidth: overrides.paperWidth,
                    paperHeight: overrides.paperHeight,
                    plankWeight: overrides.plankWeight,
                    plankHeight: overrides.plankHeight,
                    planksCount: overrides.planksCount

                };

                for (var p in computed) {
                    props[p] = computed[p];
                }

            },

            init = function(overrides) {
                initProps(overrides);
                props.paper = Raphael(props.holder, props.paperWidth, props.paperHeight);
                initPlanks();
            },

            plankDragOnStart = function(plank) {
                plank.ox = plank.attr('x');
                plank.oy = plank.attr('y');

                props.planksToDrag = props.paper.set();

                plankIndex = plank.data('index');


                if (props.canDrag && props.index + 2 >= plankIndex) {
                    _.each(props.planks, function(p) {
                        if (p.rect.data('index') <= plankIndex) {
                            props.planksToDrag.push(p.rect);
                        }
                    });
                }

                props.planksToDrag.attr({
                    fill: '#1abc9c'
                });

               

            },

            plankDragOnMove = function(plank, dx, dy) {

                var nowY = Math.max(100, plank.oy + dy);

                nowY = Math.min(250, nowY);

                props.planksToDrag.attr({
                    y: nowY
                });

                if (plank.attr('y') > 200) {
                    props.planksToDrag.attr({
                        stroke: '#E74C3C',
                        fill: '#E74C3C'
                    });
                } else {
                    props.planksToDrag.attr({
                        stroke: '#1abc9c',
                        fill: '#1abc9c'
                     });
                }

            },

            plankDragOnEnd = function(plank) {
                if (plank.attr('y') > 200) {
                    props.planksToDrag.remove();
                    props.index += props.planksToDrag.length;
                    props.canDrag = false;
                    if (props.index === props.planksCount) {
                        props.win = false;
                        endOfGame();
                    } else {
                        movePlanks();

                    }

                } else {
                    props.planksToDrag.attr({
                        y: plank.oy,
                        stroke: '#1abc9c',
                        fill: 'white'
                    });
                }

            },

            movePlanks = function() {
                var currentIndex = props.index,
                    planksToMove = props.paper.set(),
                    countToMove;

                if (currentIndex < props.target) {
                    countToMove = props.target - currentIndex;
                } else {
                    countToMove = _.random(1, 3);

                }

                _.each(props.planks, function(p) {
                    if (p.rect.data('index') < currentIndex + countToMove) {
                        planksToMove.push(p.rect);
                        p.rect.attr({
                            fill: '#1abc9c'
                        });
                        p.rect.animate({
                            y: 0
                        }, 1000, function() {
                            p.rect.remove();
                            props.canDrag = true;
                            endOfGame();
                        });
                    }
                });

                props.index += planksToMove.length;
                props.target += 4;

            },


            endOfGame = function() {
                if (props.index === props.planksCount) {
                    props.paper.remove();
                    if (props.win) {
                        $('#endOfGame').toggleClass('hide');
                        $('#endOfGame').addClass('animated fadeInDownBig');
                    } else {
                        $('#endOfGame').toggleClass('hide');
                        $('#endOfGame').addClass('animated fadeInDownBig');
                    }

                    
                }
            },

            initPlanks = function() {
                var
                planks = [],
                    x = 85,
                    y = 100;

                for (var i = 0; i < props.planksCount; i++) {

                    x += 35;

                    var p = plank.create({
                        paper: props.paper,
                        x: x,
                        y: y,
                        index: i,
                        weight: props.plankWeight,
                        height: props.plankHeight,
                        onStart: plankDragOnStart,
                        onMove: plankDragOnMove,
                        onEnd: plankDragOnEnd
                    });

                    planks.push(p);


                }

                props.planks = planks;
                props.index = 0;
                props.canDrag = true;
                props.target = 3;
                props.win = true;

            };


        return {
            init: init

        };
    })();
});