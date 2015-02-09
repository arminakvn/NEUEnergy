#/*global require*/
'use strict'

require.config
  shim: {
    leaflet: {
      exports: 'L'
    }
    bootstrap:
      deps: ['jquery'],
      exports: 'jquery'
  }
  paths:
    jquery: '../bower_components/jquery/dist/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    leaflet: '../bower_components/mapbox.js/mapbox'
    d3: '../bower_components/d3/d3'
require [ 'app' ], (App) ->
  App.initialize()
  return

