var fs = require('fs');
var _ = require("lodash");
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

// prepare webpack config for unit tests
var webpackTestConfig = _.merge({}, webpackConfig, {});

//
// Use ENV vars on Travis and sauce.json locally to get credentials
if (!process.env.SAUCE_USERNAME) {
  if (!fs.existsSync('sauce.json')) {
    console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
    process.exit(1);
  } else {
    process.env.SAUCE_USERNAME = require('./sauce').username;
    process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
  }
}



// Browsers to run on Sauce Labs
var customLaunchers = {
  'SL_Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  'SL_InternetExplorer': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10'
  },
  'SL_FireFox': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '45'
  }
};


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

    reporters: ['dots', 'saucelabs', 'nested', 'coverage', 'threshold', 'coveralls'],

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

    thresholdReporter: {
      statements: 48, // 90
      branches: 26, // 60
      functions: 27, // 85
      lines: 47 // 90
    },

    sauceLabs: {
      testName: 'OS Web elements'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true

  });
};
