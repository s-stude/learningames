define(function(require) {
    var _ = require('Underscore');
    var Backbone = require('Backbone');
    var Raphael = require('Raphael');

    var Points = require('./Points');

    return (function Desk() {

        var props = {},
                init = function(holder) {
                    props.width = $('#' + holder).width();
                    props.paper = Raphael(holder, props.width, 500);
                    initProps();
                    Points.init(props.paper);
                    props.interval = setInterval(createSet, props.time);
                    Points.updateInterval(props.interval);
                    set = props.paper.set();
                    makeFocus();
                    $('#enter').click(function() {
                        stop();
                    });

                    $('.val').click(function(e) {
                        e.preventDefault();
                        var value = $(this).attr("value");
                        $("#value").val($("#value").val() + value);

                    });

                    Points.stopWatch(props.paper, props.interval);
                    $(document).keydown(function(event) {
                        if (event.keyCode === 13) {
                            stop();
                        }
                    });

                    $(window).on("blur focus", function(e) {
                        var prevType = $(this).data("prevType");
                        if (prevType !== e.type) { //  reduce double fire issues
                            switch (e.type) {
                                case "blur":
                                    pause();
                                    break;
                            }
                        }

                        $(this).data("prevType", e.type);
                    });

                    setTimeout(createSet, 1000);
                },
                initProps = function() {
                    props.time = 4000;
                    props.correctCount = 0;
                    props.countCheck = 5;
                    props.animParam = {
                        y: 450
                    };
                    props.animParamC = {
                        cy: 450
                    };
                    props.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                },
                makeFocus = function() {
                    if (!props.isMobile) {
                        $('#value').focus();

                    }
                },
                
                pause = function() {
                    if (!Points.endOfGame() && (!props.resume || !props.resume.id)) {
                        set.forEach(function(elem) {
                            elem.pause();
                        });
                        Points.stopWatchPause();
                        clearInterval(props.interval);
                        hideAllElements();
                        displayResume();
                    }
                },
                
                reset = function() {
                    clearInterval(props.interval);
                    set.forEach(function(elem) {
                        elem.remove();
                    });
                    initProps();
                    Points.resetPoints(props.paper);
                    props.interval = setInterval(createSet, props.time);
                    Points.updateInterval(props.interval);
                    Points.stopWatch(props.paper, props.interval);
                },
                
                hideAllElements = function() {
                    var bot = props.paper.bottom;
                    props.allElements = props.paper.set();
                    while (bot) {
                        props.allElements.push(bot);
                        bot = bot.next;
                    }
                    props.allElements.attr({
                        opacity: 0.3
                    });
                    $('#circle_view__elements').css('opacity', '0.3');

                },
                displayResume = function() {
                    var cenetrX = props.paper.width / 2,
                            centerY = props.paper.height / 2;

                    props.resume = props.paper.path("M" + cenetrX + "," + centerY + "l50,25 c4,2.5 4,7.5 0,10 l-50,25 c-4,2.5 -7.5,0 -7.5, -5 l0,-50 c0,-5 4,-7.5 7.5-5z");

                    props.resume.attr({
                        cursor: 'pointer',
                        //'stroke-width': 8,
                        fill: '#1ABC9C',
                        stroke: '#1ABC9C'
                    });

                    props.resume.click(function() {
                        set.forEach(function(elem) {
                            elem.resume();
                        });

                        Points.stopWatchResume();

                        props.allElements.attr({
                            opacity: 1
                        });
                        $('#circle_view__elements').css('opacity', '1');

                        props.resume.remove();

                        props.interval = setInterval(createSet, props.time);

                        Points.updateInterval(props.interval);


                        makeFocus();

                    });
                },
                moveAnimation = function()

                {

                    props.animC = Raphael.animation({
                        cy: 450
                    }, 5000, "bounce", function() {
                        animateFault(this.attr('cx'), 450);
                        this.remove();

                    });

                    props.anim = Raphael.animation({
                        y: 450
                    }, 5000, "bounce", function() {
                        this.remove();
                    });


                },
                createSet = function() {

                    var text,
                        circ,
                        color = getColor(),
                        c_fill = {
                            fill: 'none',
                            stroke: color,
                            "stroke-width": 8
                            },
                    t_fill = {
                        fill: color,
                        "font-family": "Lato, sans-serif",
                        'font-size': "25"
                    };


                    Points.updateCount(props.paper);

                    $('#paper').removeClass("success");
                    $('#paper').removeClass("error");
                    makeFocus();


                    var randomNum1 = _.random(2, 9);

                    var randomNum2 = _.random(2, 9);

                    var randomX = _.random(150, (props.width - 55));

                    var answer = randomNum1 * randomNum2;

                    var question = randomNum1 + " x " + randomNum2;

                    circ = props.paper.circle(randomX, 10, 50);
                    circ.attr(c_fill);


                    text = props.paper.text(randomX, 10, question);
                    text.data('value', answer);
                    circ.data('value', answer);
                    text.attr(t_fill);


                    set.push(circ, text);


                    moveAnimation();
                    circ.animate(props.animC);
                    text.animateWith(circ, props.animParam, props.anim);


                    if (props.correctCount >= props.countCheck) {
                        if (props.time > 1500) {
                            props.time -= 250;
                        }
                        clearInterval(props.interval);
                        props.interval = setInterval(createSet, props.time);
                        Points.updateInterval(props.interval);
                        props.countCheck += 5;
                    }


                },
                stop = function() {
                    var value = $('#value').val(),
                            bonusX;

                    set.forEach(function(elem) {
                        if (elem.data("value") && value === elem.data("value").toString()) {
                            props.correctCount += 0.5;
                            $('#paper').addClass("success");

                            if (elem.type === 'circle') {
                                bonusX = elem.attr('cx');
                                props.bonusY = elem.attr('cy');
                                animateSuccess(bonusX, props.bonusY);
                            }

                            elem.remove();
                            $('#value').val('');
                        } else {
                            $('#value').val('');
                        }

                    });
                },
                animateSuccess = function(x, y) {
                    var bonus = props.paper.text(x, y, "+10");


                    var bonus_fill = {
                        fill: "#1ABC9C",
                        "font-family": "Lato, sans-serif",
                        'font-size': "25"
                    };

                    bonus.attr(bonus_fill);

                    props.bonusY = y - 50;

                    bonus.animate({
                        y: props.bonusY
                    }, 2000, function() {
                        this.remove();
                    });

                    Points.updatePoints(true);

                    Points.updateSuccess();


                },
                animateFault = function(x, y) {
                    var bonus = props.paper.text(x, y, "-10");

                    var bonus_fill = {
                        fill: "#E74C3C",
                        "font-family": "Lato, sans-serif",
                        'font-size': "25"
                    };

                    bonus.attr(bonus_fill);

                    props.bonusY = y - 50;

                    bonus.animate({
                        y: props.bonusY
                    }, 2000, function() {
                        this.remove();
                    });


                    Points.updatePoints(false);

                    Points.updateFail();


                },
                getColor = function() {
                    //var colors = new Array("#2ECC71","#3498DB","#9B59B6","#34495E","#2980B9","#8E44AD","#F39C12","#D35400","#E67E22");
                    var colors = new Array("#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#34495E");
                    return colors[_.random(0, 4)];
                };



        return {
            init: init,
            pause: pause,
            reset: reset
        };

    })();

});