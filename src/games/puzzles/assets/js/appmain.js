define([
	'jquery',
	'underscore', 
	'backbone'
	], function($, _, Backbone){

		var initialize = function(){
			// var MainView = Backbone.View.extend({
			// 	el: $('#herounit'),

			// 	events: {
			// 		'click #btnplaygame' : 'playgame'
			// 	},

			// 	playgame : function(){
			// 		console.log('#btnplaygame was clicked');
			// 	}
			// });

			// var v = new MainView();
			// v.render();


			SearchView = Backbone.View.extend({ 
				initialize: function(){ 
					alert("Alerts suck."); 
				} 
			}); 
		};

		return {
			initialize: initialize 
		};
});