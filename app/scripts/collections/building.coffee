define [
  'underscore'
  'backbone'
  'models/building'
], (_, Backbone, BuildingModel) ->
  'use strict'
  BuildingCollection = Backbone.Collection.extend(
    url: '/buildings'
    model: BuildingModel)
  BuildingCollection