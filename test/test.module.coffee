require 'angular'
require '../dist/angular-memory-stats'

module.exports = module = angular.module 'test', [
    'angular-memory-stats'
]
module.config (angularMemoryStatsProvider) ->
    # angularMemoryStatsProvider.enable false
    angularMemoryStatsProvider.setCss
        top: '50px'
        left: '50px'
        position: 'fixed'
    angularMemoryStatsProvider.setPosition('absolute')
    angularMemoryStatsProvider.setCorner('topRight')
    angularMemoryStatsProvider.setZIndex(99)

module.run ($log) ->
    $log.info 'test running'
