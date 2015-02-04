define [
  'jquery'
  'underscore'
  'backbone'
  'routes/building'
], ($, _, Backbone, BuildingRouter) ->

  initialize = ->
    BuildingRouter.initialize()
    return

  { initialize: initialize }