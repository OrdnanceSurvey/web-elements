const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const StringReplacePlugin = require("string-replace-webpack-plugin");

const olExternals = {
  root: 'ol',
  commonjs2: 'openlayers',
  commonjs: 'openlayers',
  amd: 'openlayers'
};

const proj4Externals = {
  root: 'proj4',
  commonjs2: 'proj4',
  commonjs: 'proj4',
  amd: 'proj4'
};

const rxAngularExternals = {
  root: 'Rx',
  commonjs2: 'rx-angular',
  commonjs: 'rx-angular',
  amd: 'rx-angular'
};

let config = {
  context: __dirname,
  debug: true,
  cache: true,

  verbose: true,
  displayErrorDetails: true,
  stats: {
    colors: true,
    reasons: true,

    children: false,
    timings: true
  },
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.ts', '.js']
  },
  entry: {
    'os-elements': './src/elements.ts'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
    libraryTarget: 'umd'
  },

  externals: [{
    'ol': olExternals,
    'openlayers': olExternals,
    'proj4': proj4Externals,
    'angular-material': 'angular-material',
    'material-design-lite': 'material-design-lite',
    'rx-angular': 'rx-angular',
    'rx': 'rx',
    'angular': 'angular'
  }],

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
                console.log('inline template for ', templateFile);
                return `this.template = "${shortenedTemplate}"`;
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"' // make most big libraries to minify nicely
      }
    }),
    new StringReplacePlugin()
  ]
};

module.exports = config;
