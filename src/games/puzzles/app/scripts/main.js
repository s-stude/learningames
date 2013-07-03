require.config({
	paths: {
		'jquery' : 'vendor/jquery/jquery',
		'underscore' : 'vendor/underscore-amd/underscore',
		'backbone' : 'vendor/backbone-amd/backbone'
	}
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(['jquery', 'views/app'], function($, AppView){

	new AppView({
		el: $('#appview')
	});

});