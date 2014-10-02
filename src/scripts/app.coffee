###
  Manual app bootstraping
###
angular.element(document).ready ->
  start = -> angular.bootstrap document, ['yo-intervengo']
  if document.URL.match(/^https?:/)
  then do start
  else document.addEventListener 'deviceready', start

###
  App module
###
angular.module('yo-intervengo', [
  'ngRoute'
  'ngTouch'
  'ngAnimate'
  'util'
  'mobile.directives'
  'leaflet-directive'
  'LocalStorageModule'
])
.config ($routeProvider, localStorageServiceProvider) ->
  $routeProvider.when '/',
    name: 'home'
    templateUrl: 'views/home.html'
    controller: 'HomeCtrl'
    resolve: user: ['User', (User) -> User.loggedIn ]
  .when '/start',
    name: 'start'
    templateUrl: 'views/start.html'
    controller: 'StartCtrl'
    resolve:
      login: ['User', '$q', (User, $q) ->
        d = $q.defer()
        User.loggedIn.then (-> d.reject 'logged-in'), (-> d.resolve())
        d.promise
      ]
  .when '/new',
    name: 'new'
    title: 'Nuevo reporte'
    templateUrl: 'views/new.html'
    controller: 'NewCtrl'
    resolve: user: ['User', (User) -> User.loggedIn ]
  .when '/profile',
    name: 'profile'
    title: 'Perfil'
    templateUrl: 'views/profile.html'
    controller: 'ProfileCtrl'
    resolve: user: ['User', (User) -> User.loggedIn ]
  .when '/pub-work/:id',
    name: 'pub-work'
    title: 'Obra Pública'
    templateUrl: 'views/pubwork.html'
    resolve: user: ['User', (User) -> User.loggedIn ]
    controller: () ->
  .when '/:type/:id',
    name: 'detail'
    templateUrl: 'views/detail.html'
    controller: 'DetailCtrl'
    resolve:
      user: ['User', (User) -> User.loggedIn ]
      report: ['Report','$route', (Report,$route) ->
        Report.get($route.current.params.id)
      ]
      title: [
        '$route', ($route) ->
          type =
            complain: 'Queja', request: 'Petición'
          $route.current.$$route.title = "#{type[$route.current.params.type]}"
      ]
  .otherwise
      name: 'not-found'
      title: 'No encontrado'
      template: '<p>La ruta que buscas no esta disponible</p>'

  localStorageServiceProvider.setPrefix 'yi'

.value('MARKER_HTML', "<svg class='marker marker-{{:type:}}'><path d='m 35.702414,17.8168 c 0,-9.765924 -7.936493,-17.702419 -17.702417,-17.702419 -9.7928265,0 -17.70241606,7.936495 -17.70241606,17.702419 0,4.089312 1.39897486,7.828881 3.71266446,10.842059 h -0.0269 l 13.9897516,21.22676 13.989752,-21.22676 h -0.0269 c 2.367495,-3.013178 3.76647,-6.752747 3.76647,-10.842059 z M 17.999997,12.489933 c 2.932467,0 5.326867,2.367497 5.326867,5.326867 0,2.932468 -2.367496,5.326868 -5.326867,5.326868 -2.932468,0 -5.326867,-2.367497 -5.326867,-5.326868 0,-2.932467 2.394399,-5.326867 5.326867,-5.326867 z' /></svg>")

.value('ApiUrl', 'http://api.yointervengo.olinguito.com.co')

.run ($rootScope, $location, $window) ->
  $rootScope.$on '$routeChangeError', (e,cur,nxt,rejection) ->
    $location.path('/start').replace() if rejection.reason is 'no-user'
    $location.path('/').replace() if rejection is 'logged-in'

  $rootScope.show = list: no, loading: no
  $rootScope.q = name: '', type: [] # search
  # map config
  $rootScope.mapDefaults =
    scrollWheelZoom: no
    zoomControl: no
    tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    tileLayerOptions: attribution: '© Olinguito', detectRetina: yes
  $rootScope.mapCenter = lat: 4.624009, lng: -74.079673, zoom: 5