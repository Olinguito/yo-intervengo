angular.module('yo-intervengo', [
    'ngRoute'
    'ngTouch'
    'ngAnimate'
    'util.directives'
    'mobile.directives'
    'leaflet-directive'
])
.config ($routeProvider) ->
    $routeProvider.when '/',
        name: 'home'
        templateUrl: 'views/home.html'
        controller: 'HomeCtrl'
    .when '/login',
        name: 'login'
        templateUrl: 'views/login.html'
    .when '/register',
        name: 'register'
        templateUrl: 'views/register.html'
        controller: 'RegisterCtrl'
    .when '/report/:id',
        name: 'detail'
        templateUrl: 'views/detail.html'
        controller: 'DetailCtrl'
    .when '/new',
        name: 'new'
        title: 'Nuevo reporte'
        templateUrl: 'views/new.html'
    .when '/profile',
        name: 'profile'
        title: 'Perfil'
        templateUrl: 'views/profile.html'

.run ($rootScope, $location, $window) ->
    $rootScope.l = $location
    $rootScope.inHome = -> $location.path() is '/'
    $rootScope.back = -> do $window.history.back
    $rootScope.loading = no
    $rootScope.show =
        list: no
        loading: no
#    $rootScope.controles =
#        back: -> do $window.history.back
#        footer: no
#        main:
#            action: ->
#            text: null
#            visible: yes