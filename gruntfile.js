// Gruntfile with the configuration of grunt-express and grunt-open. No livereload yet!
module.exports = function(grunt) {
 
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  // Configure Grunt 
  grunt.initConfig({
    
    //grunt-contrib-compass to compile scss file to dist files
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '_scss',
          cssDir: 'css',
          environment: 'production'
        }
      }
    },
    postcss: {
      options: {
        map:true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },
    shell: {
      jekyllServe:{
        command: "jekyll serve --baseurl ''"
      },
      jekyllBuild:{
        command: 'jekyll build --config _config-dev.yml'
      }
    },

    //grunt-watch will monitor the project files
    watch: {
      options:{
        livereload: true
      },
      site: {
        files: ['**/*.html', '_data/*.yml', 'index.html', '**/*.md', '!_site/**/*'],
        tasks: ['shell:jekyllBuild'],
      },
      css: {
        files: ['_scss/*.scss', '!_site/**/*'],
        tasks: ['compass', 'postcss','shell:jekyllBuild'],
      },
      js: {
        files: ['js/*.js', '!_site/**/*'],
        tasks: ['shell:jekyllBuild']
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:4000/index.html'
      }
    }
  });
 
  // Creates the `server` task
  grunt.registerTask('serve', ['shell:jekyllServe']);
  //Compile scss task
  grunt.registerTask('default', ['compass','postcss','shell:jekyllBuild','open', 'watch']);
};