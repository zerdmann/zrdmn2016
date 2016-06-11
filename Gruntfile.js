module.exports = function(grunt) {
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
  bake: {
  	build:
  		{ files: {"./release/index.html": "./base.html"}, }
  },
  sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                './release/main.css': './styles/main.scss'
            }
        }

  },
  copy: {
  	  fonts: {
    	expand: true,
    	src: 'fonts/*',
    	dest: 'release/',
    },

  },
  watch: {
      sass : {
        files : ['./styles/**'],
        tasks : ['sass']
      },
      bake : {
        files : ["./base.html", "/partials/**"],
        tasks : ['bake']
     	},
     	fonts: {
        	files : ['./fonts/**'],
        	tasks: ['copy:fonts']
     	},
 	}
 });

    grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-bake');
 	grunt.loadNpmTasks('grunt-sass');
 	grunt.loadNpmTasks('grunt-contrib-copy');


 	grunt.registerTask('default', ['watch']);

}


