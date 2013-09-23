define( function(require) {
    var _ = require('Underscore');
    var Backbone = require('Backbone');
    var Raphael = require('Raphael');

    // var rect = require('./rect');

    return (function Desk() {

        var props = {},

            initProps = function(overrides) {
                var computed = {
                    holder: overrides.holder,
                    paperWidth: overrides.paperWidth,
                    paperHeight: overrides.paperHeight,
                    rectWeight: overrides.rectWeight,
                    rectHeight: overrides.rectHeight
                };

                for (var p in computed) {
                    props[p] = computed[p];
                }

            },

            init = function(overrides) {
                initProps(overrides);
                props.paper = Raphael(props.holder, props.paperWidth, props.paperHeight);
                initRects();
            },

         

            initRects = function() {
                var
                rects = [],
                    x = 85,
                    y = 100;

                for (var i = 0; i < props.planksCount; i++) {

                    x += 35;

                    var r = rect.create({
                        paper: props.paper,
                        x: x,
                        y: y,
                        value: value,
                        weight: props.rectWeight,
                        height: props.rectHeight,
                        click: rectClick
                    });

                    rects.push(r);


                }

                props.rects = rects;

            };


        return {
            init: init

        };
    })();
});