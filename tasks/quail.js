/*
 * grunt-quail
 * http://quailjs.org/
 *
 * Copyright (c) 2014 Kevin Miller, contributors
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  'use strict';
  var phantomjs = require('grunt-lib-phantomjs').init(grunt);
  var path = require('path');
  var asset = path.join.bind(null, __dirname, '..');
  phantomjs.on('quail.ok', function(msg) {
    grunt.log.writeln(msg);
  });

  phantomjs.on('quail.error', function(msg) {
    grunt.log.error(msg);
  });
  
  phantomjs.on('quail.fail', function(msg) {
    grunt.log.error(msg);
  });

  phantomjs.on('quail.done', function() {
    phantomjs.halt();
  });

  phantomjs.on('fail.load', function(url) {
    phantomjs.halt();
    grunt.warn('PhantomJS unable to load URL.');
  });

  phantomjs.on('fail.timeout', function() {
    phantomjs.halt();
    grunt.warn('PhantomJS timed out.');
  });

  grunt.registerMultiTask('quail', 'Check HTML for accessibility.', function() {
    var errorCount = 0;
    var options = this.options({
      // Default PhantomJS timeout.
      timeout: 5000,
      // QUnit-PhantomJS bridge file to be injected.
      inject: [
        asset('node_modules/jquery/dist/jquery.js'),
        asset('node_modules/quail/dist/quail.jquery.js'),
        asset('phantomjs/bridge.js')
      ],
      phantomScript: asset('phantomjs/main.js'),
      // Explicit non-file URLs to test.
      urls: [],
      force: false,
      quailPath : asset('node_modules/quail/dist')
    });
    var urls = options.urls.concat(this.filesSrc);
    

    // This task is async.
    var done = this.async();
    grunt.util.async.forEachSeries(urls, function(url, next) {
      grunt.log.writeln(url);
      grunt.event.emit('quail.spawn', url);
      phantomjs.spawn(url, {
        // Additional PhantomJS options.
        options: options,
        // Complete the task when done.
        done: function(err) {
          if (err) {
            done();
          }
          else {
            next();
          }
        }
      });
    },
    // All tests have been run.
    function() {
      
        grunt.log.ok('Accessibility testing complete');
      // All done!
      done();
    });

  });
};
