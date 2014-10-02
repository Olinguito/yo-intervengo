angular.module 'yo-intervengo'

.controller 'NewCtrl', ($scope, Report, geolocation, $http, MARKER_HTML, leafletEvents, $compile,$timeout) ->
  $scope.report = type: 'request', location: {}, geo_location: []
  $scope.submited = no
  # marker config
  $scope.marker =
    loc:
      lat: $scope.mapCenter.lat
      lng: $scope.mapCenter.lng
      draggable: true
      icon:
        type: 'div'
        iconSize: [36, 50]
        html: MARKER_HTML.replace ':type:', 'report.type'
  # when geolocation data is ready
  geolocation.get().then (pos) ->
    [lat,lon] = [pos.coords.latitude, pos.coords.longitude]
    # marker new position
    $scope.marker.loc.lat = lat
    $scope.marker.loc.lng = lon
    # center map in new location
    angular.extend $scope.mapCenter, lat:lat,lng: lon, zoom: 15
    # free reverse geocode service
    $http.get("http://nominatim.openstreetmap.org/reverse?lat=#{lat}&lon=#{lon}")
      .success (res) ->
        doc = angular.element res
        # parse address data
        angular.extend $scope.report.location,
          address: doc.find('road').text()
          state: doc.find('state').text()
          city: doc.find('city').text()

  # compile marker to get angular bindings
  $scope.$on "leafletDirectiveMap.layeradd", (e, le) ->
    compileMarker = ->
      $compile(document.querySelector('.marker'))($scope) if le.leafletEvent.layer._icon?
    do compileMarker
    # Ugly Hack. -> event and compile work but marker html gets replaced later
    # only happens when coming form home ... WHY!!!
    $timeout compileMarker, 1500
  # on form submit
  $scope.saveReport = ->
    $scope.submited = yes
    if $scope.rForm.$valid
      $scope.report.geo_location[0] = $scope.marker.loc.lat
      $scope.report.geo_location[1] = $scope.marker.loc.lng
      Report.new $scope.report
      $scope.back()