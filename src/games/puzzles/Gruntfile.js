module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        vars: {
            dist   : 'wwwroot',
            distjs : 'main.js',
            distcss: 'style.css'
        },

        jshint: {
            options: {
                curly  : true,
                eqeqeq : true,
                eqnull : true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },


            gruntfile: ['gruntfile.js'],

            appjs: ['app/scripts/main.js', 'app/scripts/**/*.js', '!app/scripts/vendor/**/*.js']
        },

        requirejs: {
            dev    : {
                options: {
                    baseUrl       : "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    //out           : "<%= vars.dist %>/scripts/<%= vars.distjs %>",
                    name          : "main",
                    dir           : '<%= vars.dist %>/scripts/',
                    optimize      : "uglify2",
                    uglify2       : {
                        output: {
                            beautify: true
                        }
                    }
                }
            },
            release: {
                options: {
                    baseUrl       : "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
                    //out           : "<%= vars.dist %>/scripts/<%= vars.distjs %>",
                    name          : "main",

                    dir                    : '<%= vars.dist %>/scripts/',
                    preserveLicenseComments: false,
                    optimize               : "uglify2",
                    generateSourceMaps     : true
//                    modules: [
//                        {
//                            name   : "main",
//                            include: [ "text" ]
//                        }
//                    ]
                }

            }
        },

        watch: {
            files: ['<%= jshint.gruntfile %>', '<%= jshint.appjs %>', 'app/*.html'],
            tasks: ['default']
        },

        connect: {
            dev    : {
                options: {
                    port: 4000,
                    base: '<%= vars.dist %>'
                }
            },
            release: {
                options: {
                    keepalive: true,
                    port     : 4000,
                    base     : '<%= vars.dist %>'
                }
            }
        },

        copy: {
            dev    : {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['index.html', 'scripts/**', 'css/**', 'fonts/**', 'images/**'],
                        dest  : '<%= vars.dist %>/'
                    },
                    {
                        expand : true,
                        flatten: true,
                        cwd    : 'app/',
                        src    : 'scripts/vendor/requirejs-text/text.js', dest: '<%= vars.dist %>/scripts'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['index.html', 'scripts/vendor/requirejs/require.js'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            }
        },

        clean: ['<%= vars.dist %>']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'jshint', 'copy:dev']);
    grunt.registerTask('live-dev', ['default', 'connect:dev', 'watch']);

    grunt.registerTask('release', ['clean', 'jshint', 'copy:release', 'requirejs']);
    grunt.registerTask('live-release', ['release', 'connect:release']);


};