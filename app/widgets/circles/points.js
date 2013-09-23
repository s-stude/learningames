define( function(require) {

    var CustomAttributes = require('CustomAttributes');

	return (function() {

		var props = {},

		init = function(paper) {

			initProps();

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
			props.pointsValue = paper.text(50, 55, props.points);
			props.countValue = paper.text(50, 155, 0);
			props.successValue = paper.text(50, 255, 0);
			props.failValue = paper.text(50, 355, 0);
			lineLeft.attr({
				stroke: '#1ABC9C'
			});
			pointsText.attr(text_fill);
			props.pointsValue.attr(value_fill);
			countText.attr(text_fill);
			props.countValue.attr(value_fill);
			successText.attr(text_fill);
			props.successValue.attr(value_fill);
			failText.attr(text_fill);
			props.failValue.attr(value_fill);
			timeText.attr(text_fill);
			watch.attr(watch_fill);
			props.indicatorArc = paper.path().attr({
				"stroke": "#1ABC9C",
				"stroke-width": 25,
				arc: [50, 470, 0, 60, 15]
			});



		},

		initProps = function()
		{
			props.points = 0;
			props.fail = 0;
			props.success = 0;
			props.generalCount = 0;
			props.stopWatchTime = 180000;
			props.end = false;

		},

		updatePoints = function(result) {

			props.points = result ? props.points += 10 : props.points -= 10;

			props.pointsValue.attr({
				text: props.points
			});
		},

		updateCount = function(paper) {

			props.generalCount += 1;

			var prCount = paper.text(0, 155, props.generalCount);

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
				props.countValue = this;
			});

			var animParamP = {
				x: 50
			};

			props.countValue.animate(countAnimation);
			prCount.animateWith(props.countValue, animParamP, prCountAnimation);
		},

		updateSuccess = function() {

			props.success += 1;

			props.successValue.attr({
				text: props.success
			});

		},

		updateFail = function() {

			props.fail += 1;

			props.failValue.attr({
				text: props.fail
			});

		},

		stopWatch = function(paper) {

			var strokeRadius = 15;

			props.indicatorArc.animate({
				arc: [50, 470, 60, 60, strokeRadius]
			}, props.stopWatchTime, function() {
				set.forEach(function(elem) {
					elem.remove();
				});
				clearInterval(props.interval);
				props.end = true;
				displayResults(props.success, 250, "#1ABC9C", "success", paper);
				displayResults(props.fail, 500, "#E74C3C", "fail", paper);
				displayResults(props.generalCount, 750, "#34495E", "count", paper);
			});


		},


		stopWatchPause = function() {
			props.indicatorArc.pause();

		},

		stopWatchResume = function() {
			props.indicatorArc.resume();
		},

		endofGame = function() {
			return props.end;
		},

		displayResults = function(points, location, color, text, paper) {
			var ranges = _.range(0, points, 1),
				locationY = 200,
				pointsText = paper.text(location, locationY, 0),
				resultText = paper.text(location, locationY + 80, text),
				text_fill = {
					fill: '#34495E',
					"font-family": "Lato, sans-serif",
					'font-size': "15"
				},
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

            resultText.attr(text_fill);
            var circ = paper.circle(location, locationY, 60);

			circ.attr({
				"stroke": color,
				"stroke-width": 10,
				opacity: 0.5
			});


			var indicatorArc = paper.path().attr({
				"stroke": color,
				"stroke-width": 10,
				arc: [location, locationY, 0, 77, 60]
			});

			indicatorArc.animate({
				arc: [location, locationY, points, 77, 60]
			}, ranges.length * 100, function() {
				// anim complete here
			});


		},

		updateInterval = function(newInterval)
		{
			props.interval = newInterval;
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