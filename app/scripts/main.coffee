#/*global require*/
'use strict'

require.config
  shim: {
    bootstrap:
      deps: ['jquery'],
      exports: 'jquery'
  }
  paths:
    jquery: '../bower_components/jquery/dist/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
require [ 'app' ], (App) ->
  # Initialize our application.
  # fossa = new Fossa(
  #   host: '127.0.0.1'
  #   port: '27016'
  #   options: native_parser: true)
  App.initialize()
  return

