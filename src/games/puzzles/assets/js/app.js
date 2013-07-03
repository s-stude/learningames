requirejs.config({
    'paths':{
        'app':'app',
        'lib':'lib',
        'tmpl':'tmpl',
        'tests': 'tests',
        'jquery':'/assets/js/lib/jquery',
        'underscore' : '/assets/js/lib/underscore',
        'backbone' : '/assets/js/lib/backbone',
        'raphael': '/assets/js/lib/raphael-min'
    },
    shim : {
        'underscore' : {
            exports: '_'
        },
        'raphael' : {
            exports: 'raphael'
        }
    }
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(['appmain'], function(appmain){
    appmain.initialize();
});
