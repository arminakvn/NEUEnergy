define [
  'underscore'
  'backbone'
  'models/building'
], (_, Backbone, BuildingModel) ->
  'use strict'
  BuildingCollection = Backbone.Collection.extend(
    url: '//localhost:3001/buildings/'
    model: BuildingModel)
  BuildingCollection