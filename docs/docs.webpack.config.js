const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const StringReplacePlugin = require("string-replace-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

// helper to return a command line arg by name.
function getArg(name) {
  return process.argv.filter(function(arg, i) {
    return process.argv[i-1] === name;
  })[0];
}

let cliOptions = {
  livereload: !!getArg('--livereload') || false // e.g. `webpack -w --env dev --livereload` (note the -w parameter to autowatch src files too)
};

let config = {
  context: __dirname,
  debug: true,
  cache: true,

  verbose: true,
  displayErrorDetails: true,
  stats: {
    colors: true,
    reasons: true
  },

  devtool: 'source-map',

  entry: {
    'os-elements-docs': ['./src/index.ts', '../dist/os-elements.js']
  },

  output: {
    path: path.join(__dirname, '../dist/docs'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { // compile .ts to .js
        test: /\.ts$/,
        loaders: ['ng-annotate', 'awesome-typescript-loader']
      },
      { // inline all HTML templates into our src
        test: /src\/.*ts/,
        loader: StringReplacePlugin.replace({
          replacements: [
            { // rename the property from templateUrl to template
              pattern: /templateUrl:\s*string;/g,
              replacement: function (m, templateUrl) {
                return `template: string;`;
              }
            },
            { // inline the template's HTML contents
              pattern: /this\.templateUrl\s*=\s*'([^']+?\.html)'/g,
              replacement: function (m, templateUrl) {
                const templateFile = path.join(path.dirname(this.resource), templateUrl);
                const templateContent = fs.readFileSync(templateFile, 'utf-8');
                const shortenedTemplate = templateContent
                  .replace(/([\n\r]\s*)+/gm, ' ')
                  .replace(/"/g, '\\"');
                console.log('inlined the html for component: ' + templateFile);
                return `this.template = "${shortenedTemplate}"`;
              }
            }
          ]
        })
      },
      { test: require.resolve('jquery/jquery'), loader: 'expose?jQuery!expose?$' },
      { test: require.resolve('material-design-lite'), loader: 'imports-loader?this=>window!exports?window.componentHandler' },
      {// tell webpack that Flatdoc has a dependency on jQuery
        test: /(flatdoc)/,
        loader: 'imports-loader?this=>window!exports?window.Flatdoc'
      }
    ]
  },

  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './index.html',
      chunks: ['os-elements-docs'],
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new StringReplacePlugin()
    // new webpack.ProvidePlugin({
    //   $: "jquery/jquery",
    //   jQuery: "jquery/jquery"
    // })
  ],

  resolve: {
    extensions: ['', '.ts', '.js']
  }

};

// if livereload is truthy, add the livereload plugin to auto-refresh the webpage
if (cliOptions.livereload) {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }));
}

module.exports = config;
