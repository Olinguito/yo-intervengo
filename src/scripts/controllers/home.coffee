angular.module 'yo-intervengo'

.controller 'HomeCtrl', ($scope, $compile, Report, geolocation, MARKER_HTML) ->
  $scope.markers = {}
  # fetch data from server/file
  $scope.items = Report.list()
  # get markers in the format needed by leaflet-directive
  getMarkers = (items) ->
    markers = {}
    for item,i in items
      markers[item.id] =
        lat: item.loc.lat
        lng: item.loc.lon
        message: "<div item='items[#{i}]'></div>"
        icon:
          type: 'div'
          iconSize: [36, 50]
          html: MARKER_HTML.replace '{{:type:}}', item.type
          popupAnchor: [2, -20]
        popupOptions:
          maxWidth: 400, closeButton: off
    markers
  # filter
  $scope.byType = (item) -> $scope.q.type.indexOf(item.type) isnt -1
  # update markers
  $scope.$watchCollection 'filteredItems', (n, o) ->
    return if n is o
    $scope.markers = getMarkers n

  # compile popup on open
  $scope.$on 'leafletDirectiveMap.popupopen', (e, le) ->
    $compile(le.leafletEvent.popup._contentNode)($scope)
  # map config
  geolocation.get().then (pos) ->
    angular.extend $scope.mapCenter, lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 13
  # search message
  $scope.$root.searchMessage = ->
    return "No hay reportes ni obras en tu zona" if $scope.items.length is 0
    return "Selecciona una o más pestañas" if $scope.q.type.length is 0
    n = 'request': 'peticiones', 'complain': 'quejas', 'pub-work': 'obras'
    list = n[$scope.q.type[0]]
    for t, i in slice = $scope.q.type[1...]
      list += "#{if i is slice.length-1 then ' y' else ','} #{n[t]}"
    "Busca #{list} en tu zona"
