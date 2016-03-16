var _ = require("lodash");
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

// prepare webpack config for unit tests
var webpackTestConfig = _.merge({}, webpackConfig, {
  devtool: 'inline-source-map',
  module: {
    postLoaders: [
      {
        test: /\.ts$/,
        loader: 'istanbul-instrumenter'
      }
    ]
  }
});

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

    logLevel: config.LOG_INFO,

    webpack: webpackTestConfig,

    webpackMiddleware: {
      noInfo: true
    },

    singleRun: true,

    browsers: ['PhantomJS'],

    reporters: ['progress', 'nested', 'coverage', 'threshold'],

    coverageReporter: {
      dir: 'build/reports/coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    },

    // TODO: temporary lowered to 10%
    thresholdReporter: {
      statements: 42, // 90
      branches: 16, // 60
      functions: 21, // 85
      lines: 41 // 90
    }

  });
};
