module.exports = function(grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	/* Configure task(s) */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/* UGLIFY */
		uglify: { /* 2 different options, Build and Dev */
			build: {
				files: [{
					expand: true,
					src: 'src/js/*.js',
					dest: 'js/',
					flatten: true,
					rename: function(destBase, destPath) {
						return destBase+destPath.replace('.js', '.min.js')
					}
				}]
			},
			dev: {
				options: {
					beautify: true,
					quoteStyle: 1,
					mangle: false,
					compress: false, // { drop_console: true }
					preserveComments: 'all'
				},
				src: 'src/js/*.js',
				dest: 'js/scriptmin.js'
			}
		},
		/* SASS */
		sass: { /* 2 different options, Build and Dev */
			build: {
		    	options: {
					style: 'compressed',
					sourcemap: 'none',
					precision: 2,
					update: true
				},
				files: { /* target file : soure file */                     
		        'css/style.css': 'src/sass/main.scss',
		      }
		    },                      
		    dev: {                            
		      options: {                       
		        outputStyle: 'expanded'
		      },
		      files: { /* target file : soure file */               
		        'css/style.css': 'src/sass/main.scss',
		      }
		    }
		  },
		/* POSTCSS */
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}),
					require('cssnano')()
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},
		
		/* WATCH */
		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['uglify:dev']
			},
			css: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass:dev', 'postcss']
			},
			options: {
				reload: true,
				nospawn: true
			}
		}
	});

	/* Load plugins */
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );

	/* Register task(s) */
	grunt.registerTask( 'default', ['uglify:dev', 'sass:dev', 'postcss'] ); /* [task:option] */
	grunt.registerTask( 'build', ['uglify:build', 'sass:build', 'postcss'] );
}