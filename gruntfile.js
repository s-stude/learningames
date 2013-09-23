module.exports = function (grunt) {

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        vars:{
            appdir:'app',

//            dist:'serverside/aspnetmvc/public',
//            distroot:'serverside/aspnetmvc/public',

            dist:'wwwroot/public',
            distroot:'wwwroot',

            distjs:'main.js',

            distcss:'styles.css',
            distvendorcss:'vendor.css',
            distappcss:'app.css'
        },

        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                eqnull:true,
                browser:true,
                globals:{
                    jQuery:true
                }
            },

            gruntfile:['gruntfile.js'],

            appjs:['<%= vars.appdir %>/widgets/main.js', '<%= vars.appdir %>/widgets/**/*.js']
        },

        cssmin:{
            appcss:{
                files:{
                    '<%= vars.dist %>/css/<%= vars.distappcss %>':['<%= vars.appdir %>/widgets/**/*.css']
                }
            },
            distcss:{
                files:{
                    '<%= vars.dist %>/css/<%= vars.distcss %>':[
                        '<%= vars.dist %>/css/<%= vars.distvendorcss %>',
                        '<%= vars.dist %>/css/<%= vars.distappcss %>'
                    ]
                }
            }
        },

        requirejs:{
            appcss:{
                options:{
                    optimizeCss:'standard.keepLines',
                    cssImportIgnore:null,
                    cssIn:'<%= vars.appdir %>/css/<%= vars.distvendorcss %>',
                    out:'<%= vars.dist %>/css/<%= vars.distvendorcss %>'

                }
            },
            release:{
                options:{
                    mainConfigFile:"<%= vars.appdir %>/widgets/main.js",
                    name:"main",
                    dir:'<%= vars.dist %>/rjs-build/',
                    preserveLicenseComments:false,
                    optimize:"uglify2",
                    generateSourceMaps:true
                }
            }
        },

        watch:{
            appjs:{
                files:['<%= vars.appdir %>/widgets/main.js', '<%= vars.appdir %>/widgets/**/*.js'],
                tasks:['jshint', 'copy:appjs']
            },
            vendorjs:{
                files:['components/**/*.js'],
                tasks:['copy:vendorjs']
            },
            appcss:{
                files:['<%= vars.appdir %>/css/<%= vars.distvendorcss %>', '<%= vars.appdir %>/widgets/**/*.css'],
                tasks:['requirejs:appcss', 'cssmin:appcss', 'cssmin:distcss']
            },
            apptemplates:{
                files:['<%= vars.appdir %>/widgets/**/*.html'],
                tasks:['copy:apptemplates']
            }

//            release:{
//                files:[
//                    '<%= vars.appdir %>/widgets/main.js',
//                    '<%= vars.appdir %>/widgets/**/*.js',
//                    '<%= vars.appdir %>/css/<%= vars.distvendorcss %>',
//                    '<%= vars.appdir %>/widgets/**/*.css',
//                    '<%= vars.appdir %>/*.html',
//                    '<%= vars.appdir %>/widgets/**/*.html'
//                ],
//                tasks:[
//                    'requirejs',    // only before 'copy:release'
//                    'copy:release', // only after 'requirejs' task
//                    'cssmin:appcss',
//                    'cssmin:distcss',
//                    'clean:rjsbuild']
//            }
        },

        copy:{
            appjs:{
                files:[
                    {
                        expand:true,
                        cwd:'<%= vars.appdir %>/',
                        src:['widgets/main.js', 'widgets/**'],
                        dest:'<%= vars.dist %>/'
                    }
                ]
            },

            vendorjs:{
                files:[
                    {
                        expand:true,
                        src:['components/**', 'static_components/**'],
                        dest:'<%= vars.distroot %>/'
                    }
                ]
            },

            rootpages:{
                files:[
                    {
                        expand:true,
                        cwd:'<%= vars.appdir %>/',
                        src:['*.html', 'components/bootstrap-glyphicons/fonts/*.*', 'images/**'],
                        dest:'<%= vars.distroot %>/'
                    }
                ]
            },

            glyphicons:{
                files:[
                    {
                        expand:true,
                        src:['components/bootstrap-glyphicons/fonts/*.*'],
                        dest:'<%= vars.distroot %>/'
                    }
                ]
            },

            apptemplates:{
                files:[
                    {
                        expand:true,
                        cwd:'<%= vars.appdir %>/',
                        src:['widgets/**/*.html'],
                        dest:'<%= vars.dist %>/'
                    }
                ]
            },

            release:{
                files:[
                    {
                        expand:true,
                        src:['components/bootstrap-glyphicons/fonts/*.*'],
                        dest:'<%= vars.distroot %>/'
                    },
                    {
                        expand:true,
                        src:['components/requirejs/require.js'],
                        dest:'<%= vars.distroot %>/'
                    },
                    {
                        expand:true,
                        cwd:'<%= vars.dist %>/rjs-build',
                        src:['main.js', '*.map'],
                        dest:'<%= vars.dist %>/widgets'
                    },
                    {
                        expand:true,
                        cwd:'<%= vars.appdir %>/',
                        src:['*.html', 'images/**'],
                        dest:'<%= vars.distroot %>/'
                    }
                ]
            }
        },

        connect:{
            basic:{
                options:{
                    port:4000,
                    base:'<%= vars.distroot %>'
                }
            },
            alive:{
                options:{
                    keepalive:true,
                    port:4000,
                    base:'<%= vars.distroot %>'
                }
            }
        },


        clean:{
            distroot:['<%= vars.distroot %>/'],
            rjsbuild:['<%= vars.dist %>/rjs-build']
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
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'clean:distroot',
        'jshint',
        'copy:appjs',
        'copy:vendorjs',
        'requirejs:appcss',
        'cssmin:appcss',
        'cssmin:distcss',
        'copy:apptemplates',
        'copy:rootpages',
        'copy:glyphicons'
    ]);

    grunt.registerTask('live', [
        'default',

        'connect:basic', 'watch'

//        'watch:appjs',
//        'watch:vendorjs',
//        'watch:appcss',
//        'watch:apptemplates'
    ]);


    grunt.registerTask('release', [
        'clean:distroot',
        'jshint',
        'requirejs', // only before 'copy:release'
        'copy:release', // only after 'requirejs' task
        'cssmin:appcss',
        'cssmin:distcss',
        'clean:rjsbuild'
    ]);

    grunt.registerTask('live-release', ['release', 'connect:alive']);
    grunt.registerTask('live-release-watch', ['release', 'connect:basic', 'watch:release']);
};