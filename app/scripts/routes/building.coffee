define [
  'jquery'
  'backbone'
  'views/building'
], ($, Backbone, BuildingView) ->
  'use strict'
  BuildingRouter = Backbone.Router.extend(routes:
    'buildings': 'viewBuildings')
  # buildingListView = new BuildingListView

  initialize = ->
    router = new BuildingRouter
    router.on 'route:viewBuildings', ->
      console.log "somethinfg"
      # buildingListView.render()
      return
    console.log 'initializing the backbone history'
    Backbone.history.start()
    router

  initialize()
  # return {
  #  	initialize: initialize
  # };

# ---
# generated by js2coffee 2.0.0