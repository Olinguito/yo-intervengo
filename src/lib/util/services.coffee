angular.module('util.services', [])
.factory "geolocation", ($q, $window) ->
  get: ->
    d = $q.defer()
    unless "geolocation" of $window.navigator
      d.reject new Error("Geolocation is not supported")
    else
      $window.navigator.geolocation.getCurrentPosition (pos) -> d.resolve pos
      , (error) -> d.reject error
    d.promise
  watch: ->
    d = $q.defer()
    unless "geolocation" of $window.navigator
      d.reject new Error("Geolocation is not supported")
    else
      $window.navigator.geolocation.watchPosition (pos) -> d.notify pos
      , (error) -> d.reject error
    d.promise.__proto__.updated = (fn) -> d.promise.then null, null, fn
    d.promise