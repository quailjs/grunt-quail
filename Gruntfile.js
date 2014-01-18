/*! grunt-quail quailjs.org | quail-lib.org/license */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    quail: {
      testing: {
        files: [{
          expand  : true,
          cwd     : 'test/',
          src     : ['*.html']
        }],
        options: {
          context : 'body',
          accessibilityTests: [
            "imgHasAlt"
          ]
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['tasks/*', 'phantomjs/*']
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-quail');

  // By default, just run tests
  grunt.registerTask('default', ['jshint', 'quail']);

};