define([
    '.',
    'underscore',
    'raphael',
    'planks/plank'

], function($, _, Raphael, plank) {

    return (function Desk() {

        var props = {},
            get = function(prop) {
                return props[prop];
            },

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
                props.paper = Raphael(get('holder'), get('paperWidth'), get('paperHeight'));
                initPlanks();
            },

            plankDragOnStart = function(plank) {
                plank.ox = plank.attr('x');
                plank.oy = plank.attr('y');

                props.planksToMove = props.paper.set();

                plankIndex = plank.data('index');


                if (get('index') + 2 >= plankIndex) {
                    _.each(get('planks'), function(p) {
                        if (p.rect.data('index') <= plankIndex) {
                            props.planksToMove.push(p.rect);
                        }
                    });
                }

            },

            plankDragOnMove = function(plank, dx, dy) {

                var nowY = Math.max(50, plank.oy + dy);

                nowY = Math.min(200, nowY);

                props.planksToMove.attr({
                    y: nowY
                });

                if (plank.attr('y') > 150) {
                    props.planksToMove.attr({
                        fill: 'red'
                    });
                } 
                else {
                    props.planksToMove.attr({
                        fill: '#2ECC71'
                    });
                }

            },

            plankDragOnEnd = function(plank) {
                if (plank.attr('y') > 150) {
                    props.planksToMove.remove();
                    props.index += props.planksToMove.length;
                } else {
                    props.planksToMove.attr({
                        y: plank.oy
                    });
                }

            },

            initPlanks = function() {
                var
                planks = [],
                    x = 85,
                    y = 50;

                for (var i = 0; i < get('planksCount'); i++) {

                    x += 35;

                    var p = plank.create({
                        paper: get('paper'),
                        x: x,
                        y: y,
                        index: i,
                        weight: get('plankWeight'),
                        height: get('plankHeight'),
                        onStart: plankDragOnStart,
                        onMove: plankDragOnMove,
                        onEnd: plankDragOnEnd
                    });

                    planks.push(p);


                }

                props.planks = planks;
                props.index = 0;

            };


        return {
            init: init

        };
    })();
});