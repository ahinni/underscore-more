var _ = require('underscore');

module.exports = function(grunt) {

  // Our custom tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    exec: {
      mocha_test: {
        // Workaround for grunt-mocha-test not giving good errors on failure
        cmd: 'find test | xargs node_modules/.bin/mocha --colors'
      }
    },
    jshint: {
      options: {
        trailing: true,
        evil: true,
        curly: false, // forces curly braces for if statements: needs discussion (false means not enforcing)
        eqeqeq: true, // forces === and !==
        eqnull: true, // allows for foo == null (which will check for null or undefined)
        expr: true, // allows x.foo && x.foo() etc.
        sub: true,
        strict: false, // we should probably take out our "use strict" at top of files and turn this on and globalstrict off
        globalstrict: true,
        boss: true,
        node: true,
        browser: true,
        globals: {
          "describe": true,
          "it": true,
          "before": true,
          "beforeEach": true
        }
      },
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', '!test/fixtures/**']
    },
    watch: {
      scripts: {
        files: ['**/*.js', '!Gruntfile.js', '!**/node_modules/**'],
        tasks: ['exec:mocha_test', 'jshint']
      }
    }
  });

  grunt.registerTask('default', ['test', 'jshint']);
  grunt.registerTask('test', 'exec:mocha_test');
};
