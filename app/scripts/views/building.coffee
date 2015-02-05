define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
  'collections/building'
  'models/building'
], ($, _, Backbone, JST, BuildingCollection, BuildingModel) ->
  'use strict'
  BuildingView = Backbone.View.extend(
    template: JST['app/scripts/templates/building.hbs']
    el: $('.page')
    events: ''# 'click .deleteBlog': 'deleteBlog'
    # deleteBlog: (ev) ->
    #   console.log 'Calling deleteBlog'
    #   ev.preventDefault()
    #   id = $(ev.currentTarget).data('blog-id')
    #   blog = new BlogModel(_id: id)
    #   blog.destroy success: ->
    #     require [ 'routes/blog' ], (router) ->
    #       router.navigate '/#blogs', trigger: true
    #       return
    #     return
    #   return
    initialize: () ->
      # @listenTo @model, 'change', @render
      console.log "@model", @model
      # L.mapbox.accessToken = "pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw"
      # map = L.mapbox.map("map", "arminavn.l00353h2").setView([
      #   42.34
      #   -71.09
      # ], 16)
    render: ->
      buildings = new BuildingCollection
      that = this
      buildings.fetch
        success: (data) ->
          console.log 'Found buildings = ' + data.toJSON()
          that.$el.html that.template(buildings: data.toJSON())
          this
        error: (model, xhr, options) ->
          console.log 'Error occured while retreiving blogs. (Status = ' + xhr.status + ')'
          that.$el.html that.template(title: 'error')
          this
      return
  )
  BuildingView

# ---
# generated by js2coffee 2.0.0










# define [
#   'jquery'
#   'underscore'
#   'backbone'
#   'templates'
# ], ($, _, Backbone, JST) ->
#   class BuildingView extends Backbone.View
#     template: JST['app/scripts/templates/building.ejs']

#     tagName: 'div'

#     id: 'map'

#     className: 'building'

#     events: {}

#     initialize: () ->
#         @listenTo @model, 'change', @render
#         L.mapbox.accessToken = "pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw"
#         map = L.mapbox.map("map", "arminavn.l00353h2").setView([
#           42.34
#           -71.09
#         ], 16)
#         textControl = L.Control.extend(
#           options:
#             position: "topleft"
#           onAdd: (map) =>
#             _textDomEl = L.DomUtil.create('div', 'container control-info')
#             _el = L.DomUtil.create('svg', 'svg')
#             map.getPanes().overlayPane.appendChild(_el)
#             L.DomUtil.enableTextSelection(_textDomEl)  
#             map.getPanes().overlayPane.appendChild(_textDomEl)
#             _textDomObj = $(L.DomUtil.get(_textDomEl))
#             _textDomObj.css('width', $(map.getContainer())[0].clientWidth/3)
#             _textDomObj.css('height', $(map.getContainer())[0].clientHeight)
#             _textDomObj.css('background-color', 'white')
#             _textDomObj.css('overflow', 'scroll')
#             L.DomUtil.setOpacity(L.DomUtil.get(_textDomEl), .8)
#             L.DomUtil.setPosition(L.DomUtil.get(_textDomEl), L.point(40, -65), disable3D=0)
#         )
#         map.addControl new textControl()

#     render: () ->
#         @$el.html @template(@model.toJSON())
