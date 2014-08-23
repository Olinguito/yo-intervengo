angular.module 'yo-intervengo'

.controller 'HomeCtrl', ($scope) ->
    $scope.list = no

    $scope.items = [
            name: 'Queja 1'
            type: 0
            loc:
                city: 'bogotá'
                addr: ''
                lat: 4.599198
                lon: -74.071066
        ,
            name: 'Queja 2'
            type: 0
            loc:
                city: 'bogotá'
                addr: ''
                lat: 4.620543
                lon: -74.086430
        ,
            name: 'Peticion 1'
            type: 1
            loc:
                city: 'bogotá'
                addr: ''
                lat: 4.669606
                lon: -74.060037
        ,
            name: 'Peticion 2'
            type: 1
            loc:
                city: 'bogotá'
                addr: ''
                lat: 4.595113
                lon: -74.102559
        ,
            name: 'Obra'
            type: 2
            loc:
                city: 'bogotá'
                addr: ''
                lat: 4.567312
                lon: -74.102202
    ]

    angular.extend $scope,
        center:
            lat: 4.669606
            lng: -74.060037
            zoom: 11
        defaults:
            scrollWheelZoom: no
            zoomControl: no
            tileLayerOptions:
                attribution: '© Olinguito'
                detectRetina: yes
