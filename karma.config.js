var _ = require("lodash");
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

webpackConfig.devtool = 'inline-source-map';

console.log('webpackConfig', webpackConfig);


module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      // tests
      'test/*_test.js',
      'test/**/*_test.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/*_test.js': ['webpack'],
      'test/**/*_test.js': ['webpack']
    },

    logLevel: config.LOG_DEBUG,

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: {
        colors: true
      },
      noInfo: false
    },
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    plugins: [
      "karma-webpack",
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher"
    ]
  });
};
