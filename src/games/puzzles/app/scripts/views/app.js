define([

	'jquery', 
	'underscore', 
	'backbone'

	], function ($, _, Backbone) {
		var AppView = Backbone.View.extend({
			initialize: function(){
				console.log('AppView initialized');
			}
		});

		return AppView;
	});