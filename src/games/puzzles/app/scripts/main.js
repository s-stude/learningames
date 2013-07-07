require.config({
	paths: {
		'jquery' : 'vendor/jquery/jquery',
		'underscore' : 'vendor/underscore-amd/underscore',
		'backbone' : 'vendor/backbone-amd/backbone',
		'raphael' : 'vendor/raphael-tmp/raphael',
		'text' : 'vendor/requirejs-text/text'
	}
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(['jquery', 'text', 'views/puzzleView'], function($, text, PuzzleView){

	new PuzzleView();

});