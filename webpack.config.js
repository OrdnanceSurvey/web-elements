var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var destFolder = '/build';

var olExternals = {
  root: 'ol',
  commonjs2: 'openlayers',
  commonjs: 'openlayers',
  amd: 'openlayers'
};

var proj4Externals = {
  root: 'proj4',
  commonjs2: 'proj4',
  commonjs: 'proj4',
  amd: 'proj4'
};

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
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.js', '.css', '.styl']
  },
  entry: {
    'elements': [
      './src/components/zoombar/mdl-slider.css',
      './src/elements.styl',
      './src/elements.ts',
      './node_modules/material-design-lite/material.min.js'
    ]
  },

  output: {
    path: path.join(__dirname, destFolder),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd'
  },

  externals: [{
    'ol': olExternals,
    'openlayers': olExternals,
    'proj4': proj4Externals,
    'rx': 'rx'
  }],

  // modles to compile .less and include .css
  // in the .ts use code like: require('./button.less');
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      },
      {
        test: /\.jade$/,
        loader: 'template-html-loader'
      }
    ]
  },

  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],

  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  }
};

module.exports = config;
