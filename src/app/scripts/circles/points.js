define([
	'customAttributes'
], function(CustomAttributes) {
	return (function() {

		var points = 0,
			fail = 0,
			success = 0,
			generalCount = 0,
			stopWatchTime = 20000,
			pointsValue,
			countValue,
			successValue,
			failValue,
			indicatorArc,
			end = false,
			interval;

		init = function(paper) {

			var lineLeft = paper.path("M{0} {1}L{2} {3}", 95, 5, 95, 497),
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


			CustomAttributes.arcInit(paper);
			pointsValue = paper.text(50, 55, points);
			countValue = paper.text(50, 155, 0);
			successValue = paper.text(50, 255, 0);
			failValue = paper.text(50, 355, 0);
			lineLeft.attr({
				stroke: '#1ABC9C'
			});
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
			indicatorArc = paper.path().attr({
				"stroke": "#1ABC9C",
				"stroke-width": 25,
				arc: [50, 470, 0, 60, 15]
			});



		},

		updatePoints = function(result) {

			points = result ? points += 10 : points -= 10;

			pointsValue.attr({
				text: points
			});
		},

		updateCount = function(paper) {

			generalCount += 1;


			var prCount = paper.text(0, 165, generalCount);


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

		updateSuccess = function() {

			success += 1;

			successValue.attr({
				text: success
			});

		},

		updateFail = function() {

			fail += 1;

			failValue.attr({
				text: fail
			});

		},

		stopWatch = function(paper) {

			var strokeRadius = 15;

			indicatorArc.animate({
				arc: [50, 470, 60, 60, strokeRadius]
			}, stopWatchTime, function() {
				set.forEach(function(elem) {
					elem.remove();
				});
				clearInterval(interval);
				end = true;
				displayResults(success, 250, "#1ABC9C", paper);
				displayResults(fail, 500, "#E74C3C", paper);
				displayResults(generalCount, 750, "#34495E", paper);
			});


		},


		stopWatchPause = function() {
			indicatorArc.pause();

		},

		stopWatchResume = function() {
			indicatorArc.resume();
		},

		endofGame = function() {
			return end;
		},

		displayResults = function(points, location, color, paper) {
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

		updateInterval = function(newInterval)
		{
			interval = newInterval;
		},

		roundNumber = function(number, digits) {
			var multiple = Math.pow(10, digits);
			var rndedNum = Math.round(number * multiple) / multiple;
			return rndedNum;
		};


		return {
			init: init,
			updatePoints: updatePoints,
			updateCount: updateCount,
			updateSuccess: updateSuccess,
			updateFail: updateFail,
			stopWatch: stopWatch,
			stopWatchPause: stopWatchPause,
			stopWatchResume: stopWatchResume,
			endOfGame: endofGame,
			updateInterval: updateInterval
		};

	})();
});