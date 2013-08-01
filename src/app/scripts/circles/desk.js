define([

	'jquery',
	'underscore',
	'raphael'


], function($, _, Raphael) {
	return (function Desk() {

		var width,
			paper,
			interval,
			time = 4000,
			hours = 1,
			correctCount = 0,
			countCheck = 5,
			points = 0,
			fail = 0,
			success = 0,
			generalCount = 0,
			pointsValue,
			countValue,
			successValue,
			failValue,
			bonusY,
			base_fill = {
				stroke: '#1ABC9C'
			},
			anim = Raphael.animation(animParam, 5000),
			animParam = {
				y: 450
			},
			animC = Raphael.animation(animParamC, 5000),
			animParamC = {
				cy: 450
			},
			arc,
			indicatorArc,
			allElements,


			init = function(holder) {

				width = $('#' + holder).width();

				paper = Raphael(holder, width, 500);

				initPoints();


				interval = setInterval(createSet, time);

				set = paper.set();

				$('#value').focus();

				$('#enter').click(function() {
					stop();
				});

				stopWatch();


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
							if(interval)
							{
								set.forEach(function(elem) {
									elem.pause();
								});
								indicatorArc.pause();
								clearInterval(interval);
								hideAllElements();
								displayResume();

							}
							break;
							case "focus":
								// stop animation
								break;
						}
					}

					$(this).data("prevType", e.type);
				});

				createSet();

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
				var resume,
					cenetrX = paper.width / 2,
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
					indicatorArc.resume();

					allElements.attr({
						opacity: 1
					});
					$('#circle_view__elements').css('opacity', '1');

					resume.remove();

					interval = setInterval(createSet, time);

					$('#value').focus();

				});
			},

		initPoints = function() {

			var
			lineLeft = paper.path("M{0} {1}L{2} {3}", 95, 5, 95, 497),
				pointsText = paper.text(50, 25, 'points'),
				countText = paper.text(50, 125, 'counts'),
				successText = paper.text(50, 225, 'success'),
				failText = paper.text(50, 325, 'fail'),
				timeText = paper.text(50, 425, 'time'),
				text_fill = {
					fill: '#E74C3C',
					"font-family": "Lato, sans-serif",
					'font-size': "15"
				},
				value_fill = {
					fill: '#1ABC9C',
					"font-family": "Lato, sans-serif",
					'font-size': "30"
				},
				watch_fill = {
					"stroke": "#E74C3C",
					"stroke-width": 2
				},
				watch = paper.circle(50, 470, 28);

			paper.customAttributes.arc = function(xloc, yloc, value, total, R) {


				var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a),
					path;
				if (total === value) {
					path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
					];
				} else {
					path = [
						["M", xloc, yloc - R],
						["A", R, R, 0, +(alpha > 180), 1, x, y]
					];
				}
				return {
					path: path
				};
			};

			pointsValue = paper.text(50, 55, points);

			countValue = paper.text(50, 155, 0);

			successValue = paper.text(50, 255, 0);

			failValue = paper.text(50, 355, 0);

			lineLeft.attr(base_fill);

			pointsText.attr(text_fill);

			pointsValue.attr(value_fill);

			countText.attr(text_fill);

			countValue.attr(value_fill);

			successText.attr(text_fill);

			successValue.attr(value_fill);

			failText.attr(text_fill);

			failValue.attr(value_fill);

			timeText.attr(text_fill);

			watch.attr(watch_fill);

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

		stopWatch = function() {

			var strokeRadius = 15;

			indicatorArc = paper.path().attr({
				"stroke": "#1ABC9C",
				"stroke-width": 25,
				arc: [50, 470, 0, 60, strokeRadius]
			});

			indicatorArc.animate({
				arc: [50, 470, 60, 60, strokeRadius]
			}, 60000, function() {
				set.forEach(function(elem) {
					elem.remove();
				});
				interval = clearInterval(interval);
				displayResults(success, 250, "#1ABC9C");
				displayResults(fail, 500, "#E74C3C");
				displayResults(generalCount, 750, "#34495E");
			});


		},

		displayResults = function(points, location, color) {
			var ranges = _.range(0, points, 1),
				pointsText = paper.text(location, 200, 0),
				i = 0,
				resultInterval = setInterval(function() {
					pointsText.attr({
						text: roundNumber(ranges[i], 2),
						fill: '#34495E',
						"font-family": "Lato, sans-serif",
						'font-size': "30"
					});
					i++;
					if (i >= ranges.length) {
						clearInterval(resultInterval);
						pointsText.attr({
							text: points
						});
					}
				}, 100);


			var circ = paper.circle(location, 200, 60);

			circ.attr({
				"stroke": color,
				"stroke-width": 10,
				opacity: 0.5
			});


			var indicatorArc = paper.path().attr({
				"stroke": color,
				"stroke-width": 10,
				arc: [location, 200, 0, 30, 60]
			});

			indicatorArc.animate({
				arc: [location, 200, points, 30, 60]
			}, ranges.length * 100, function() {
				// anim complete here
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


			generalCount += 1;

			updateCount(generalCount);

			$('#paper').removeClass("success");
			$('#paper').removeClass("error");
			$('#value').focus();


			var randomNum1 = getRandom(2, 9);

			var randomNum2 = getRandom(2, 9);

			var randomX = getRandom(150, (width - 55));

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

			points += 10;

			updatePoints(points);

			success += 1;

			updateSuccess(success);


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

			points -= 10;

			updatePoints(points);

			fail += 1;

			updateFail(fail);


		},

		getRandom = function(min, max) {
			return min + Math.floor(Math.random() * (max - min + 1));
		},

		getColor = function() {
			//var colors = new Array("#2ECC71","#3498DB","#9B59B6","#34495E","#2980B9","#8E44AD","#F39C12","#D35400","#E67E22");
			var colors = new Array("#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#34495E");
			return colors[getRandom(0, 4)];
		},

		updatePoints = function(text) {
			pointsValue.attr({
				text: text
			});
		},

		roundNumber = function(number, digits) {
			var multiple = Math.pow(10, digits);
			var rndedNum = Math.round(number * multiple) / multiple;
			return rndedNum;
		},


		updateCount = function(count) {


			var prCount = paper.text(0, 165, count);


			var prCount_fill = {
				fill: '#1ABC9C',
				"font-family": "Lato, sans-serif",
				'font-size': "30",
				'fill-opacity': '0.1'
			};


			prCount.attr(prCount_fill);

			var countAnimation = Raphael.animation({
				x: 90,
				'fill-opacity': 0.1
			}, 900, function() {
				this.remove();
			});

			var prCountAnimation = Raphael.animation({
				x: 50,
				'fill-opacity': 1
			}, 900, function() {
				countValue = this;
			});

			var animParamP = {
				x: 50
			};

			countValue.animate(countAnimation);
			prCount.animateWith(countValue, animParamP, prCountAnimation);
		},

		updateSuccess = function(text) {

			successValue.attr({
				text: text
			});

		},

		updateFail = function(text) {
			failValue.attr({
				text: text
			});

		};


		return {
			init: init

		};
	})();

});