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

            gruntfile: ['Gruntfile.js'],

            appjs: ['app/scripts/main.js', 'app/scripts/**/*.js', '!app/scripts/vendor/**/*.js']
        },

        requirejs: {
            dev    : {
                options: {
                    baseUrl       : "app/scripts",
                    mainConfigFile: "app/scripts/main.js",
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
                    baseUrl                : "app/scripts",
                    mainConfigFile         : "app/scripts/main.js",
                    name                   : "main",
                    dir                    : '<%= vars.dist %>/scripts/',
                    preserveLicenseComments: false,
                    optimize               : "uglify2",
                    generateSourceMaps     : true
                }

            }
        },

        watch: {
            appjs       : {
                files: ['app/scripts/main.js', 'app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'],
                tasks: ['jshint', 'copy:appjs']
            },
            vendorjs    : {
                files: ['app/scripts/vendor/**/*.js'],
                tasks: ['copy:vendorjs']
            },
            appcss      : {
                files: ['app/css/**/*.css'],
                tasks: ['copy:appcss']
            },
            apptemplates: {
                files: ['app/index.html', 'app/scripts/**/*.html'],
                tasks: ['copy:apptemplates']
            }
        },

        copy: {
            appjs: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['scripts/main.js', 'scripts/**', '!scripts/vendor/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            vendorjs: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['scripts/vendor/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            appcss: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['css/**'],
                        dest  : '<%= vars.dist %>/'
                    }
                ]
            },

            apptemplates: {
                files: [
                    {
                        expand: true,
                        cwd   : 'app/',
                        src   : ['index.html', 'scripts/**/*.html'],
                        dest  : '<%= vars.dist %>/'
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


        clean: ['<%= vars.dist %>/']
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

    grunt.registerTask('default', ['clean', 'jshint', 'copy:appjs', 'copy:vendorjs', 'copy:appcss', 'copy:apptemplates']);
    grunt.registerTask('live-dev', ['default', 'connect:dev', 'watch']);

    grunt.registerTask('release', ['clean', 'jshint', 'copy:release', 'requirejs']);
    grunt.registerTask('live-release', ['release', 'connect:release']);


};