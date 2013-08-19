define([

	'underscore',
	'backbone',
	'jquery',
	'circles/desk',
	'text!circles/templates/circleView.html'

], function(_, Backbone, $, Desk, circleViewTemplate) {

	var CircleView = Backbone.View.extend({

		el: '#circle-view',

		initialize: function() {
			this.render();
			Desk.init('circle_view__paper');
		},

		render: function() {
			this.$el.append(circleViewTemplate);
			this.$el.addClass('animated fadeInDownBig');
			console.log('CircleView.render');
		}


	});

	return CircleView;

});