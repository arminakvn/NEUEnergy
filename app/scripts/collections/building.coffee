define [
  'underscore'
  'backbone'
  'models/Building-model'
], (_, Backbone, BuildingModel) ->

  class BuildingCollection extends Backbone.Collection
    model: BuildingModel