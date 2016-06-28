module.exports = function(grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);


    var environmentConfig = {
        options: {
            space: '  ',
            name: 'Arcus.Config',
            dest: 'app/js/arcus.config.js'
        }
    };

    var environments = require('./environments.json');
    for (var key in environments) {
        environmentConfig[key] = environments[key];
    }

    // Set the current environment
    var _selectedEnvironment = grunt.option('ENV') || "production";
    _selectedEnvironment = 'ngconstant:' + _selectedEnvironment;


    grunt.initConfig({

        assetsDir: 'app',
        distDir: 'dist',

        ngconstant: environmentConfig,

        wiredep: {
            target: {
                src: [
                    'app/index.html',
                    'app/less/app.less'
                ]
            }
        },
        clean: {
            dist: ['.tmp', 'dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'dist/',
                    src: [
                        'index.html',
                        'img/**'
                    ]
                }]
            }
        },
        ngAnnotate: {
            options: {
                // Task-specific options go here.
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['index.html', '**/*.html'],
                    dest: 'dist'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/index.html'
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['app/**/*.html', 'app/**/*.js', 'app/**/*.css']
                },
                options: {
                    watchTask: true,
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: false, // must be false to avoid interfering with angular routing
                        forms: true
                    },
                    server: {
                        baseDir: "app"
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all : {
                src : ['app/js/**/*.js']
            }
        },
        watch: {
            options : {
                interrupt: true
            },
            js: {
                files: ['app/js/**/*.js'],
                tasks: ['newer:jshint']
            },
            html : {
                files: ['app/**/*.html']
            },
            css: {
                files: ['app/css/**/*.css'],
                tasks: ['csslint']
            },
            less: {
                files : ['app/less/**/*.less'],
                tasks: ['less:all']
            }
        },
        connect: {
            test : {
                options: {
                    port: 8887,
                    base: 'app',
                    keepalive: false,
                    livereload: false,
                    open: false
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all : {
                src : ['app/css/**/*.css']
            }
        },
        less: {
            options: {
                paths: ['app/less']
            },
            all: {
                files: {
                    'app/css/app.css': 'app/less/app.less'
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/js/{,*/}*.js',
                        'dist/css/{,*/}*.css'
                    ]
                }
            }
        },
        imagemin: {
            dist : {
                options : {
                    optimizationLevel: 7,
                        progressive: false,
                        interlaced : true
                },
                files: [{
                    expand: true,
                    cwd: 'app/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'jshint',
        'wiredep',
        'clean',
        _selectedEnvironment,
        'useminPrepare',
        'copy',
        'concat',
        'ngAnnotate',
        'uglify',
        'less',
        'cssmin',
        'rev',
        'imagemin',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('serve', [
        'wiredep',
        'less',
        _selectedEnvironment,
        'browserSync',
        'watch'
    ]);

};
