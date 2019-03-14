var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  performance: {maxAssetSize: 1000},
  mode: 'production',
  context: __dirname,
  // entry: './assets/js/index',
  entry: {
      maincss: [
          './assets/css/scss/main.scss'
      ],
      openlayers: [
          './assets/js/openlayers.js',
      ],
      leaflet: [
          './assets/js/leaflet.js',
      ],
      main: [
          './assets/js/main.js'
      ]
    },
  output: {
      path: path.resolve('./assets/webpack_bundles/'),
      filename: "[name].js"
      // filename: "[name]-[hash].js"
  },
  module: {
      rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }],
      rules: [{
          test: /\.scss$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
      }]
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ]
}
