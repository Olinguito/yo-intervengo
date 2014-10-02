angular.module 'yo-intervengo'

.controller 'DetailCtrl', ($scope, report, MARKER_HTML) ->
    $scope.r = report
    $scope.center = lat: report.geo_location[0], lng: report.geo_location[1], zoom: 15
    $scope.marker =
      point:
        lat: report.geo_location[0]
        lng: report.geo_location[1]
        icon:
          type: 'div'
          iconSize: [36, 50]
          html: MARKER_HTML.replace '{{:type:}}', report.type