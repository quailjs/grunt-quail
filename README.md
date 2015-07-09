grunt-quail
===

> Accessibility testing for your Grunt workflow.

This task is similar to [Qunit for Grunt](https://github.com/gruntjs/grunt-contrib-qunit) in that it loads a list of files and using PhantomJS tests them for accessibility with the [Quail accessibility plugin](http://quailjs.org).

Getting started
---

This task is not currently on NPM until we get more stable, but here's how it will work in the future:

```
npm install grunt-quail --save-dev
```

Then add the following to your `Gruntfile`:

```
grunt.loadNpmTasks('grunt-quail');
```

Options
---
Configuration options are pretty limited at the moment:

### files

A list of files that you would like to test for accessibility. It can handle partial HTML markup, and should not have problems with most templating languages. These follow the standard Grunt file patterns like wildcards, expand, etc.

### options
A list of options to pass to quail, these include:

#### accessibiltyTests
An array of test names to run. You can also pass the strings `wcag` or `508` to use a pre-defined guideline.

#### context
A jQuery-compatible selector of areas of the page to test. If you do not define a context, Quail will run on `*:first`.

```
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
```
