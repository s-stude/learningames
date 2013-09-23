define( function(require) {

    var _ = require('Underscore');
    var Backbone = require('Backbone');

    var Desk = require('./Desk');
    var circleViewTemplate = require('text!./templates/circleView.html');

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