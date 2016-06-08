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
  watch: {
      sass : {
        files : ['./styles/*.scss'],
        tasks : ['sass']
      },
      bake : {
        files : ["./base.html", "/partials/**"],
        tasks : ['bake']
     	}
 	}
 });

    grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-bake');
 	grunt.loadNpmTasks('grunt-sass');

 	grunt.registerTask('default', ['watch']);

}


