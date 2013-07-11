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
			rect,
			text,
			count = 0,
			countCheck = 5,
			bonusX,
			points = 0,
			counts = 0,
			success = 0,
			fail = 0,
			lineLeft,
			pointsText,
			pointsValu,
			countText,
			countValue,
			successText,
			successValue,
			failText,
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
			};



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

			lineLeft = paper.path("M{0} {1}L{2} {3}", 95, 5, 95, 497);
			pointsText = paper.text(50, 25, 'points');
			pointsValue = paper.text(50, 55, points);
			countText = paper.text(50, 135, 'counts');
			countValue = paper.text(50, 165, counts);
			successText = paper.text(50, 245, 'success');
			successValue = paper.text(50, 275, 0);
			failText = paper.text(50, 355, 'fail');
			failValue = paper.text(50, 385, 0);

			var
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

			counts += 1;

			updateCount(counts);

			$('#paper').removeClass("success");
			$('#paper').removeClass("error");
			$('#value').focus();

			var color = getColor();

			var c_fill = {
				fill: 'none',
				stroke: color,
				"stroke-width": 8
			};

			var t_fill = {
				fill: color,
				"font-family": "Lato, sans-serif",
				'font-size': "25"
			};

			var randomNum1 = getRandom(2, 9);

			var randomNum2 = getRandom(2, 9);

			var randomX = getRandom(150, (width - 55));

			var answer = randomNum1 * randomNum2;

			var question = randomNum1 + " x " + randomNum2;

			rect = paper.circle(randomX, 10, 50);
			rect.attr(c_fill);


			text = paper.text(randomX, 10, question);
			text.data('value', answer);
			rect.data('value', answer);
			text.attr(t_fill);


			set.push(rect, text);


			moveAnimation();
			rect.animate(animC);
			text.animateWith(rect, animParam, anim);



			if (count >= countCheck) {
				if (time > 1000) {
					time -= 500;
				}
				clearInterval(interval);
				interval = setInterval(createSet, time);
				countCheck += 5;
			}


		},

		stop = function() {
			var value = $('#value').val();

			set.forEach(function(elem) {
				if (value == elem.data("value")) {
					count += 0.5;
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