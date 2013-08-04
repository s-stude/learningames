define(function() {
	return (function() {
		var time = 4000,
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
			base_fill = {
				stroke: '#1ABC9C'
			},

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

			updatePoints = function(text) {
				pointsValue.attr({
					text: text
				});
			},

			updateCount = function(count,paper) {


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
			init: init,
			time: time,
			correctCount: correctCount,
			countCheck: countCheck,
			points: points,
			fail: fail,
			success: success,
			generalCount: generalCount,
			countValue: countValue,
			successValue: successValue,
			updatePoints: updatePoints,
			updateCount: updateCount,
			updateSuccess: updateSuccess,
			updateFail: updateFail
		};

	})();
});