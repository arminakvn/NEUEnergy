define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  BuildingModel = Backbone.Model.extend(
    urlRoot: '/buildings'
    idAttribute: '_id'
    defaults: {})
  BuildingModel
