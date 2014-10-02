angular.module('util', [
  'util.directives'
  'util.services'
])
.run ($rootScope, $route, $window) ->
  # useful to know in what route am I
  $rootScope.in = (routeName) -> $route.current?.name is routeName
  $rootScope.back = -> do $window.history.back