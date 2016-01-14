var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var destFolder = '/build';

var config = {
    context: __dirname,
    debug: true,
    cache: true,

    verbose: true,
    displayErrorDetails: true,
    stats: {
        colors: true,
        reasons: true
    },

    entry: {
        'demo_vendor_libs': [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-component', // polyfill component API for angular < 1.5
            'angular-messages',
            'angular-material',
            './node_modules/angular-material/angular-material.css'
        ]
    },

    output: {
        path: path.join(__dirname, destFolder),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd'
    },

    // modles to compile .less and include .css
    // in the .ts use code like: require('./button.less');
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }]
    },

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};

module.exports = config;
