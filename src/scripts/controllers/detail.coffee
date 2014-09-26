angular.module 'yo-intervengo'

.controller 'DetailCtrl', ($scope, report, MARKER_HTML) ->
    $scope.r = report
    $scope.center = lat: report.loc.lat, lng: report.loc.lon, zoom: 15
    $scope.marker =
      point:
        lat: report.loc.lat
        lng: report.loc.lon
        icon:
          type: 'div'
          iconSize: [36, 50]
          html: MARKER_HTML.replace '{{:type:}}', report.type