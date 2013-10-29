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

                    if (i === 7) {
                        polygon.attr({
                            'stroke-width': 6,
                            stroke: '#e74c3c'
                        });
                        text.attr({
                            text: ''
                        });

                        props.sumPolygon = polygon;
                        props.sumText = text;

                    } else {
                        props.polygons.push(polygon);
                        props.texts.push(text);

                    }
                }

                props.startPolygonsCount = 3;
                props.activeP = props.paper.set();
                props.activeT = props.paper.set();
                props.selectedP = props.paper.set();
                props.selectedT = props.paper.set();
                start();
            },

            start = function() {

                var arr = [];

                while (arr.length < (props.startPolygonsCount)) {
                    var randomnumber = _.random(1, 13);
                    var found = false;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] === randomnumber) {
                            found = true;
                            break;
                        }
                    }
                    if (!found && randomnumber !== 7) {
                        arr[arr.length] = randomnumber;
                    }
                }


                props.polygons.forEach(function(p) {
                    if (_.contains(arr, p.data('index'))) {
                        props.activeP.push(p);

                    }
                });

                props.texts.forEach(function(t) {
                    if (_.contains(arr, t.data('index'))) {
                        props.activeT.push(t);
                    }
                });

                //props.activeP = _.shuffle(props.activeP);
                // props.activeT = _.shuffle(props.activeT);

                displayActivePolygons();
                displayActiveText();
            },


            displayActivePolygons = function() {

                var index = 0;

                props.activeP[index].animate({
                    'stroke-opacity': 0.4

                }, 300, function() {
                    props.activeP[index].click(polygonClick);
                    animateNext(++index);
                });
            },

            animateNext = function(index) {
                if (index < props.activeP.length) {

                    props.activeP[index].animate({
                        'stroke-opacity': 0.4

                    }, 300, function() {
                        props.activeP[index].click(polygonClick);
                        animateNext(++index);
                    });
                }
            },

            displayActiveText = function() {
                var index = 0;

                props.activeT[index].animate({
                    opacity: 1

                }, 300, function() {
                    props.activeT[index].click(polygonClick);
                    animateTNext(++index);
                });
            },

            animateTNext = function(index) {
                if (index < props.activeT.length) {

                    props.activeT[index].animate({
                        opacity: 1

                    }, 300, function() {
                        props.activeT[index].click(polygonClick);
                        animateTNext(++index);
                    });

                } else {
                    props.sumText.attr({
                        text: sumValue()
                    });

                    props.sumPolygon.animate({
                        'stroke-opacity': 0.4
                    }, 300);
                    props.sumPolygon.click(polygonSumClick);
                    props.sumText.animate({
                        opacity: 1
                    }, 300);
                    props.sumText.click(polygonSumClick);
                }
            },

            sumValue = function() {
                var shuffleT = _.filter(_.shuffle(props.activeT), function(p) {
                    return p.data('index') !== 7;
                });
                var sum = 0;
                for (var i = 0; i < shuffleT.length - 1; ++i) {
                    sum += parseInt(shuffleT[i].attr('text'), 10);
                }
                return sum;
            },

            polygonSumClick = function() {
                if (props.selectedT.length === props.activeP.length - 1) {
                    var sum = 0;
                    props.selectedT.forEach(function(t) {
                        sum += parseInt(t.attr('text'), 10);
                    });

                    if (parseInt(props.sumText.attr('text'), 10) === sum) {

                        if (props.startPolygonsCount === 12) {
                            alert('Great! You win!!!');
                        } else {
                            props.sumPolygon.animate({
                                'stroke-opacity': 1
                            }, 700, function() {
                                props.startPolygonsCount += 1;
                                resetDesk();
                                start();
                            });
                        }
                    }
                }
            },

            resetDesk = function() {
                props.activeP.clear();
                props.activeT.clear();
                props.selectedP.clear();
                props.selectedT.clear();

                props.polygons.forEach(function(p) {
                    p.attr({
                        'stroke-opacity': 0
                    });
                    p.data('selected', 'false');
                    p.unclick(polygonClick);
                });
                props.texts.forEach(function(t) {
                    t.attr({
                        opacity: 0
                    });
                    t.data('selected', 'false');
                    t.unclick(polygonClick);
                });
                props.sumPolygon.unclick(polygonSumClick);
                props.sumText.unclick(polygonSumClick);
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
                            props.selectedP.push(p);

                        } else {
                            p.animate({
                                'stroke-opacity': 0.4

                            }, 700);

                            p.data('selected', 'false');
                            props.selectedP.pop(p);
                        }
                    }
                });

                props.texts.forEach(function(t) {
                    if (t.data('index') === index) {
                        if (t.data('selected') !== 'true') {
                            t.data('selected', 'true');
							props.selectedT.push(t);
                        } else {
                            t.data('selected', 'false');
							props.selectedT.pop(t);
                        }
                    }
                });
            };

        return {
            init: init

        };
    })();
});