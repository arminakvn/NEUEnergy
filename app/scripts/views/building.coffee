define [
  'jquery'
  'underscore'
  'backbone'
  'leaflet'
  'd3'
  'templates'
  'collections/building'
  'models/building'
], ($, _, Backbone, L, d3, JST, BuildingCollection, BuildingModel) ->
  'use strict'
  BuildingView = Backbone.View.extend(
    template: JST['app/scripts/templates/building.hbs']
    el: $('div#map')
    # events: 'click .path': 'deleteBlog'
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
      # console.log "@collection", @collection
      L.mapbox.accessToken = "pk.eyJ1IjoiYXJtaW5hdm4iLCJhIjoiSTFteE9EOCJ9.iDzgmNaITa0-q-H_jw1lJw"
      @map = L.mapbox.map("map", "arminavn.l00353h2").setView([
        42.34
        -71.09
      ], 16)
      buildings = new BuildingCollection
      buildings.fetch
        success: (data) =>
          buildings: data.toJSON()
          # console.log "buildings in initialize", buildings
          @collection = buildings
          selectEl = L.DomUtil.create("div", "info control")
          selectEl.innerHTML = "<form class='target'><select id='selectBuilding' class='target'></select></form>"
          $("#controls").append selectEl
          selEl = document.getElementById('selectBuilding')
          for eachModel in @collection.models
            opt = document.createElement('option')
            opt.appendChild( document.createTextNode(eachModel.attributes["Name"]) )
            selEl.add opt
          
          leafSelEle = L.DomUtil.get("selectBuilding")
          L.DomEvent.addListener selectEl.firstChild.firstElementChild, "change", ((e) ->
            e.stopPropagation()
            for each in _this.map.featureLayer._geojson.features
              if each.properties.title == @value
                buildingSelect = each
                featureData =[]
                for each_model in _this.collection.models
                  if each_model.attributes["Name"] == @value
                    featureData.push new L.LatLng(each_model.attributes["Centroid"][1], each_model.attributes["Centroid"][0]) 
            waitForElement = ->
              if typeof featureData != 'undefined'
                console.log "defined"
                _this.showD3 featureData 
              else
                setTimeout (->
                  waitForElement()
                  return
                ), 250
              return
            waitForElement()

            )
          @listenTo @collection, 'change', @render
        error: (model, xhr, options) ->
          console.log 'Error occured while retreiving blogs. (Status = ' + xhr.status + ')'
          that.$el.html that.template(title: 'error')
    

    showD3: (featureData)->
      # try
        # console.log _this
      console.log "featureData", featureData
      _g = d3.select(@.map.getPanes().overlayPane).select(".leaflet-zoom-animated").selectAll("g")
      console.log "_g", _g
      console.log _g.data(featureData).enter().append("div")
      _g_a = _g.append("g")
      console.log "_g_a", _g_a
      _g_a.append("circle").attr("r", 20
      ).attr("stroke", "white"
      ).attr("fill", "red"
      ).attr("stroke-width", "10"
      ).attr("cx", (featureData) =>
        
        waitForElement = ->
          if typeof featureData.lat != 'undefined'
            console.log "defined"
            console.log "featureData.lat", featureData.lat
            return _this.map.latLngToLayerPoint(featureData).x
          else
            setTimeout (->
              waitForElement()
              return
            ), 250
          return
        waitForElement()

        
      ).attr("cy", (featureData) =>
        return _this.map.latLngToLayerPoint(featureData[0]).y
      ).transition().delay(120).duration(1000).attr("r", 8000
      ).attr("stroke", "gray"
      ).attr("stroke-width", "1"
      ).attr("fill", "none"
      ).transition().delay(120).duration(1000).attr("r", 40000
      ).attr("stroke", "gray"
      ).attr("stroke-width", "2"
      ).attr("fill", "none")
      # catch e
        # ...
     
      return
    anotherHelper: ->
      # Helper code
      return

    render: ->
      console.log "this inside render", this
      console.log "$('container')", $(".container")
      
    
    #   console.log "@", @
    #   buildings = new BuildingCollection
    #   that = this
    #   buildings.fetch
    #     success: (data) =>
    #       console.log 'Found buildings = ' + data.toJSON()
    #       @.$el.html _this.template(buildings: data.toJSON())
    #       this
    #     error: (model, xhr, options) ->
    #       console.log 'Error occured while retreiving blogs. (Status = ' + xhr.status + ')'
    #       that.$el.html that.template(title: 'error')
    #       this
    #   return
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
