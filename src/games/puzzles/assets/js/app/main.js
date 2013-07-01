define('app/main', function(require){
	var $ = require('jquery');
	var _ = require('underscore');

	var desk = require('app/desk');
	
	desk.init({
		holder: 'paper',
		width: 300,
		height: 300,
		rows: 3,
		cols: 3
	});

});