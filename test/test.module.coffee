require 'angular'
require '../dist/angular-memory-stats'

module.exports = module = angular.module 'test', [
    'angular-memory-stats'
]
module.config (angularMemoryStatsProvider) ->
    angularMemoryStatsProvider.enable true
    angularMemoryStatsProvider.setCorner('bottomRight') # topLeft, topRight, bottomLeft, bottomRight
    angularMemoryStatsProvider.setCss
        right: '50px'

module.run ($log) ->
    $log.info 'test running'
