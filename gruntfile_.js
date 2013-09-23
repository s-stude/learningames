module.exports = function (grunt) {

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        vars:{
            destdir: 'wwwroot',
            destappjs: 'rapp.js',
            destlibjs: 'libs.js',
            destcss: 'style.css'
        },

        jshint:{
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },

            gruntfile: ['gruntfile.js'],

            appjs:['assets/js/app/**/*.js', 'assets/js/app.js', 'assets/js/appmain.js', '!assets/js/app/game.js'],
            apptests: ['assets/js/tests/**/*.js']
        },
        
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },

        concat:{
            // appjs:{
            //     src:'<%= jshint.appjs %>',
            //     dest:'<%= vars.destdir %>/assets/js/<%= vars.destappjs %>'
            // },
            // libjs: {
            //     src: 'assets/js/lib/*.js',
            //     dest: '<%= vars.destdir %>/assets/js/<%= vars.destlibjs %>'
            // },
            css: { 
                src: 'assets/css/**/*.css',
                dest: '<%= vars.destdir %>/assets/css/<%= vars.destcss %>'
            }
        },

        uglify: {
            appjs: {
                files: {
                    '<%= vars.destdir %>/assets/js/<%= vars.destappjs %>': ['<%= jshint.appjs %>']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    '<%= vars.destdir %>/assets/css/<%= vars.destcss %>': ['assets/css/*.css']
                }
            }
        },

        copy:{
            main:{
                files:[
                    {src:['assets/css/*'], dest:'<%= vars.destdir %>/'},
                    {src:['app/*.html'], dest:'<%= vars.destdir %>/'},
                    {src:['assets/js/**/*'], dest:'<%= vars.destdir %>/'},
                    {src:['assets/images/*'], dest:'<%= vars.destdir %>/'}
                ]
            }
        },

        watch:{
            files:['<%= jshint.gruntfile %>','<%= jshint.appjs %>','<%= jshint.apptests %>', 'assets/css/**/*.css',  'index.html'],
            tasks:['jshint', 'karma', 'concat', 'copy']
        },

        connect:{
            server:{
                options:{
                    port:4000,
                    base:'./<%= vars.destdir %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', ['jshint', 'karma', 'concat', 'copy']);
    grunt.registerTask('notest', ['jshint', 'concat', 'copy']);
    grunt.registerTask('test', ['jshint', 'karma']);
    grunt.registerTask('prod', ['jshint','karma', 'uglify', 'copy', 'cssmin']);
    grunt.registerTask('live', ['connect', 'watch']);

};