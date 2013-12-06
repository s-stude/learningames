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
                
                events:{
                    'click #pause': 'pause',
                    'click #reset': 'reset'
                },
                
                pause:function(){
                    Desk.pause();
                },
                
                reset:function(){
                    Desk.reset();
                },

		render: function() {
			this.$el.append(circleViewTemplate);
			this.$el.addClass('animated fadeInDownBig');
			console.log('CircleView.render');
		}


	});

	return CircleView;

});