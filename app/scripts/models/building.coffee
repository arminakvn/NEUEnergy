define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  BuildingModel = Backbone.Model.extend(
    # server should serve this through a GET function
    urlRoot: '/buildings'
    idAttribute: '_id'
    defaults: {})
  BuildingModel
