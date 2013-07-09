define([

    'underscore',
    'backbone',
    'jquery',
    'raphael'

], function (_, Backbone, $, Raphael) {


var CircleView = Backbone.View.extend({
 

 el:'#circle-view',

	 initialize:function () {
	var width = $('#paper').width();

	var paper = Raphael('paper', width, 500);

	var rect;

	var text;

	var count = 0;

	var time = 4000;

	var countCheck = 5;

	var bonusX;

	var points = 0;

	var counts = 0;

	var success = 0;

	var fail = 0;

	var bonusY;

	var base_fill = {
		stroke: '#1ABC9C'
	};


	var lineLeft = paper.path("M{0} {1}L{2} {3}", 95, 5, 95, 497);

	

	lineLeft.attr(base_fill);
	

	var pointsText = paper.text(50, 25, 'points');

	var text_fill = {
		fill: '#E74C3C',
		"font-family": "Lato, sans-serif",
		'font-size': "15"
	};



	pointsText.attr(text_fill);

	var pointsValue = paper.text(50, 55, points);



	var value_fill = {
		fill: '#1ABC9C',
		"font-family": "Lato, sans-serif",
		'font-size': "30"
	};


	pointsValue.attr(value_fill);

	var countText = paper.text(50, 135, 'counts');


	countText.attr(text_fill);

	var countValue = paper.text(50, 165, counts);

	countValue.attr(value_fill);

	var successText = paper.text(50, 245, 'success');


	successText.attr(text_fill);

	var successValue = paper.text(50, 275, 0);

	successValue.attr(value_fill);

	var failText = paper.text(50, 355, 'fail');


	failText.attr(text_fill);

	var failValue = paper.text(50, 385, 0);

	failValue.attr(value_fill);

	var set = paper.set();

	$('#value').focus();

	createSet();

	var interval = setInterval(createSet, time);

	$('#enter').click(function() {
		stop();
	});


	$(document).keydown(function(event) {
		if (event.keyCode === 13) {
			stop();
		}
	});



	function moveAnimation()

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

	


	}


	var anim = Raphael.animation(animParam, 5000);
	var animParam = {
		y: 450
	};

	
	var animC = Raphael.animation(animParamC, 5000);
	var animParamC = {
		cy: 450
	};


	function createSet() {



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


	}


	function stop() {
		var value = $('#value').val();

		set.forEach(function(elem) {
			if (value == elem.data("value")) {
				count += 0.5;
				$('#paper').addClass("success");

				if (elem.type == 'circle') {
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
	}


	function animateSuccess(x, y) {
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


	}

	function animateFault(x, y) {
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


	}


	function getRandom(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	function getColor() {
		//var colors = new Array("#2ECC71","#3498DB","#9B59B6","#34495E","#2980B9","#8E44AD","#F39C12","#D35400","#E67E22");
		var colors = new Array("#1ABC9C", "#3498DB", "#9B59B6", "#E74C3C", "#34495E");
		return colors[getRandom(0, 4)];
	}


	function updatePoints(text) {
		pointsValue.attr({
			text: text
		});
	}


	function updateCount(count) {


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
	}

	function updateSuccess(text) {
		successValue.attr({
			text: text
		});

	}

	function updateFail(text) {
		failValue.attr({
			text: text
		});

	}
}

	});

return CircleView;

});