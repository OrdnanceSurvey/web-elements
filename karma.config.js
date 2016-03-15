var _ = require("lodash");
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'jasmine-matchers'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-aria/angular-aria.js',
      './node_modules/angular-component/dist/angular-component.js', // polyfill component API for angular < 1.5
      './node_modules/angular-messages/angular-messages.js',
      './node_modules/angular-material/angular-material.js',
      './node_modules/angular-sanitize/angular-sanitize.js',
      './node_modules/rx/dist/rx.js',
      './node_modules/rx-angular/dist/rx.angular.js',

      // unit test main entry
      'test/unit/test_index.js'
    ],

    preprocessors: {
      'test/unit/test_index.js': ['webpack']
    },

    logLevel: config.LOG_DEBUG,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        colors: true
      },
      noInfo: true
    },

    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-jasmine-matchers"
    ]
  });
};
