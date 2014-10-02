angular.module 'yo-intervengo'

.controller 'PubWorkCtrl', ($scope, work, MARKER_HTML) ->
  $scope.w = work
  $scope.center = lat: work.geo_location[0], lng: work.geo_location[1], zoom: 15
  $scope.marker =
    point:
      lat: work.geo_location[0]
      lng: work.geo_location[1]
      icon:
        type: 'div'
        iconSize: [36, 50]
        html: MARKER_HTML.replace '{{:type:}}', work.type