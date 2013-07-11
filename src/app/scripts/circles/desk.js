define([

	'jquery',
	'underscore',
	'raphael'


], function($, _, Raphael) {
	return (function Desk() {

		var
			width,
			paper,
			interval,
			time = 4000,
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


			$(document).keydown(function(event) {
				if (event.keyCode === 13) {
					stop();
				}
			});

		},

		initPoints = function() {

		var 
			lineLeft = paper.path("M{0} {1}L{2} {3}", 95, 5, 95, 497),
			pointsText = paper.text(50, 25, 'points'),
			countText = paper.text(50, 135, 'counts'),
			successText = paper.text(50, 245, 'success'),
			failText = paper.text(50, 355, 'fail'),
			text_fill = {
					fill: '#E74C3C',
					"font-family": "Lato, sans-serif",
					'font-size': "15"
			},
			value_fill = {
					fill: '#1ABC9C',
					"font-family": "Lato, sans-serif",
					'font-size': "30"
			};
				
		pointsValue = paper.text(50, 55, points);
			
		countValue = paper.text(50, 165, 0);
			
		successValue = paper.text(50, 275, 0);
			
		failValue = paper.text(50, 385, 0);

		lineLeft.attr(base_fill);

		pointsText.attr(text_fill);

		pointsValue.attr(value_fill);

		countText.attr(text_fill);

		countValue.attr(value_fill);

		successText.attr(text_fill);

		successValue.attr(value_fill);

		failText.attr(text_fill);

		failValue.attr(value_fill);

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
				if (value == elem.data("value")) {
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