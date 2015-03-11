MemoryStats = require './memory-stats'
RequestAnimationFrame = require 'requestanimationframe'

module.exports = module = angular.module 'angular-memory-stats', []

module.provider 'angularMemoryStats', ->
    cornersAvailable = ["topLeft", "topRight", "bottomLeft", "bottomRight"]
    defaultOptions =
        isEnabled : true
        corner : 'bottomRight'
        css : {}

    @isEnabled = defaultOptions.isEnabled
    @corner = defaultOptions.corner
    @css = defaultOptions.css

    enable = (enable = true) =>
        @isEnabled = enable

    setCorner = (corner) =>
        @corner = corner if corner and cornersAvailable.indexOf(corner) > - 1

    setCss = (css) =>
        @css = css if css

    $get = =>
        isEnabled: =>
            @isEnabled

        getCss: =>
            css =
                position: 'fixed'
                zIndex: 1
            corner = @corner
            if ["topLeft", "topRight", "bottomLeft", "bottomRight"].indexOf(corner) is - 1
                corner = defaultOptions.corner
            switch corner
                when "topLeft"
                    css.top = '5px'
                    css.left = '5px'
                when "topRight"
                    css.top = '5px'
                    css.right = '5px'
                when "bottomLeft"
                    css.bottom = '5px'
                    css.left = '5px'
                when "bottomRight"
                    css.bottom = '5px'
                    css.right = '5px'
            return angular.extend css, @css

    enable: enable
    setCorner: setCorner
    setCss: setCss
    $get: $get

module.directive 'angularMemoryStats' , ->
    restrict: 'E'
    scope: false
    controller: ($scope, $element, angularMemoryStats) ->
        if !angularMemoryStats.isEnabled()
            return
        stats = new MemoryStats()
        $element.css angularMemoryStats.getCss()
        $element.append stats.domElement
        update = ->
            stats.update()
            RequestAnimationFrame update
        RequestAnimationFrame update
