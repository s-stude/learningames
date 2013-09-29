define(function(require) {
    var _ = require('Underscore');
    var Backbone = require('Backbone');
    var Raphael = require('Raphael');
    var Polygon = require('./polygon');

    return (function Desk() {

        var props = {},

            initProps = function(overrides) {
                var computed = {
                    holder: overrides.holder,
                    paperWidth: overrides.paperWidth,
                    paperHeight: overrides.paperHeight

                };

                for (var p in computed) {
                    props[p] = computed[p];
                }

            },

            init = function(overrides) {
                initProps(overrides);
                props.paper = Raphael(props.holder, props.paperWidth, props.paperHeight);
                initPolygons();
            },

            initPolygons = function() {

                var startX = 100,
                    startY = 150;

                props.polygons = props.paper.set();
                props.texts = props.paper.set();



                for (var i = 1; i <= 13; i++) {

                    if (i === 5) {
                        startX -= 525;
                        startY += 120;
                    } else if (i === 10) {
                        startX -= 525;
                        startY += 120;
                    } else {
                        if (i !== 0) {
                            startX += 150;
                        }

                    }

                    var polygon = Polygon.create({
                        paper: props.paper,
                        startX: startX,
                        startY: startY,
                        index: i
                    });

                    var text = Polygon.createText({
                        paper: props.paper,
                        startX: startX,
                        startY: startY - 60,
                        index: i
                    });

                    polygon.click(polygonClick);
                    text.click(polygonClick);

                    props.polygons.push(polygon);
                    props.texts.push(text);
                }
            },

            polygonClick = function() {

                var index = this.data('index');
                props.polygons.forEach(function(p) {
                    if (p.data('index') === index) {
                        if (p.data('selected') !== 'true') {
                            p.animate({
                                'stroke-opacity': 1
                                
                            }, 700);

                            p.data('selected', 'true');

                        } else {
                            p.animate({
                                'stroke-opacity': 0.4
                                
                            }, 700);

                            p.data('selected', 'false');
                        }


                    }
                });
            };


        return {
            init: init

        };
    })();
});