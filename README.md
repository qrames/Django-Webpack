## Doc for Django application using JavaScript ES6 or next version
first : config standard project and application with django

next use Webpack
install django-webpack-loader

> I use the version : django-webpack-loader==0.6.0

add "webpack_loader" in your INSTALLED_APPS

creates a view for testing webpack config and edit base.html:
exemple :
>
{% load static %}
{% load render_bundle from webpack_loader %}
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
    {% render_bundle 'maincss' %}
</head>
<body>
    {% block header %}{% endblock %}
    {% block content %}{% endblock %}
    {% render_bundle 'openlayers' 'js' %}
    {% render_bundle 'leaflet' 'js' %}
    {% render_bundle 'main' 'js' %}
</body>
</html>

load render_bundle from webpack_loader
includ webpack_loader function

{% render_bundle 'name' %}
includ your files css or js


in settings.py :

creates filder : ./assets

>
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "node_modules"),
    os.path.join(BASE_DIR, "assets"),
]

and add config :
>
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}

webpack_bundles is in ./assets/webpack_bundles/
webpack-stats.json is in ./webpack-stats.json

## config webpack :
>npm install webpack webpack-bundle-tracker babel babel-loader babel-core babel-preset-es2015 --save-dev


creates file webpack.config.js in ./
`var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
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
      filename: "[name]-[hash].js"
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
}`

import :
> mode: 'production',


next create your entry name :
    exemple "maincss" is css file
    >
    entry: {
        maincss: './assets/css/scss/main.scss',
        ...

    in your template use this name :
    >
    {% render_bundle 'maincss' %}

if your have scss and ES6 files config the rules :
    >
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
    }

    the rules for file.js use
        babel_loader
    install :
        >npm install --save-dev babel-loader babel-core

    the rules for file.scss use
        style-loader css-loader sass-loader
    install :
        > npm install style-loader css-loader sass-loader node-sass webpack --save-dev

NOW RUN !!!!
>./node_modules/.bin/webpack --config webpack.config.js --watch

(the file webpack-stats.json contant webpack errors)
# Django-Webpack
