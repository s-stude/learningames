define([
	'jquery',
	'underscore',
	'raphael',
	'circles/points'
], function($, _, Raphael, Points) {
	return (function Desk() {

		var width,
			paper,
			interval,
			time = 4000,
			correctCount = 0,
			countCheck = 5,
			bonusY,
			anim,
			animParam = {
				y: 450
			},
			animC,
			animParamC = {
				cy: 450
			},
			allElements,
			resume,

			init = function(holder) {
				width = $('#' + holder).width();
				paper = Raphael(holder, width, 500);
				Points.init(paper);
				interval = setInterval(createSet, time);
				Points.updateInterval(interval);
				set = paper.set();
				$('#value').focus();
				$('#enter').click(function() {
					stop();
				});

				Points.stopWatch(paper,interval);
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
								if (!Points.endOfGame() && (!resume || !resume.id)) {
									set.forEach(function(elem) {
										elem.pause();
									});
									Points.stopWatchPause();
									clearInterval(interval);
									hideAllElements();
									displayResume();
								}
								break;
						}
					}

					$(this).data("prevType", e.type);
				});

				setTimeout(createSet, 1000);
			},

			hideAllElements = function() {
				var bot = paper.bottom;
				allElements = paper.set();
				while (bot) {
					allElements.push(bot);
					bot = bot.next;
				}
				allElements.attr({
					opacity: 0.3
				});
				$('#circle_view__elements').css('opacity', '0.3');

			},

			displayResume = function() {
				var cenetrX = paper.width / 2,
					centerY = paper.height / 2;

				resume = paper.path("M" + cenetrX + "," + centerY + "l50,25 c4,2.5 4,7.5 0,10 l-50,25 c-4,2.5 -7.5,0 -7.5, -5 l0,-50 c0,-5 4,-7.5 7.5-5z");

				resume.attr({
					cursor: 'pointer',
					//'stroke-width': 8,
					fill: '#1ABC9C',
					stroke: '#1ABC9C'
				});

				resume.click(function() {
					set.forEach(function(elem) {
						elem.resume();
					});

					Points.stopWatchResume();
					
					allElements.attr({
						opacity: 1
					});
					$('#circle_view__elements').css('opacity', '1');

					resume.remove();

					interval = setInterval(createSet, time);

					Points.updateInterval(interval);

									
					$('#value').focus();

				});
			},

			moveAnimation = function()

			{

				animC = Raphael.animation({
					cy: 450
				}, 5000, "bounce", function() {
					animateFault(this.attr('cx'), 450);
					this.remove();

				});

				anim = Raphael.animation({
					y: 450
				}, 5000, "bounce", function() {
					this.remove();
				});


			},


			createSet = function() {

				var
				text,
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


				Points.updateCount(paper);

				$('#paper').removeClass("success");
				$('#paper').removeClass("error");
				$('#value').focus();


				var randomNum1 = _.random(2, 9);

				var randomNum2 = _.random(2, 9);

				var randomX = _.random(150, (width - 55));

				var answer = randomNum1 * randomNum2;

				var question = randomNum1 + " x " + randomNum2;

				circ = paper.circle(randomX, 10, 50);
				circ.attr(c_fill);


				text = paper.text(randomX, 10, question);
				text.data('value', answer);
				circ.data('value', answer);
				text.attr(t_fill);


				set.push(circ, text);


				moveAnimation();
				circ.animate(animC);
				text.animateWith(circ, animParam, anim);


				if (correctCount >= countCheck) {
					if (time > 1000) {
						time -= 500;
					}
					clearInterval(interval);
					interval = setInterval(createSet, time);
					Points.updateInterval(interval);
					countCheck += 5;
				}


			},

			stop = function() {
				var value = $('#value').val(),
					bonusX;

				set.forEach(function(elem) {
					if (elem.data("value") && value === elem.data("value").toString()) {
						correctCount += 0.5;
						$('#paper').addClass("success");

						if (elem.type === 'circle') {
							bonusX = elem.attr('cx');
							bonusY = elem.attr('cy');
							animateSuccess(bonusX, bonusY);
						}

						elem.remove();
						$('#value').val('');
					} else {
						$('#value').val('');
					}

				});
			},

			animateSuccess = function(x, y) {
				var bonus = paper.text(x, y, "+10");


				var bonus_fill = {
					fill: "#1ABC9C",
					"font-family": "Lato, sans-serif",
					'font-size': "25"
				};

				bonus.attr(bonus_fill);

				bonusY = y - 50;

				bonus.animate({
					y: bonusY
				}, 2000, function() {
					this.remove();
				});

				Points.updatePoints(true);

				Points.updateSuccess();


			},


			animateFault = function(x, y) {
				var bonus = paper.text(x, y, "-10");

				var bonus_fill = {
					fill: "#E74C3C",
					"font-family": "Lato, sans-serif",
					'font-size': "25"
				};

				bonus.attr(bonus_fill);

				bonusY = y - 50;

				bonus.animate({
					y: bonusY
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
			init: init
		};

	})();

});