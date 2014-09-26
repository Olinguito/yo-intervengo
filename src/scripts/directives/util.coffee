angular.module('util.directives', ['ngRoute'])
.directive 'content', ->
    restrict: 'C'
    link: (scope,element) ->
        scope.$on '$routeChangeSuccess', (e,current) ->
            element.attr 'id', current.name

.directive 'titleBar', ->
    restrict: 'C'
    replace: yes
    transclude: yes
    template: """
        <div ng-show='title'>
            <h1>{{ title }}</h1>
            <div class='l-btns' ng-transclude></div>
        </div>"""
    link: (scope) ->
        scope.$on '$routeChangeSuccess', (e,current) ->
            scope.title = null
            scope.title = current.title if current.title?

.directive "match", ->
  restrict: "A"
  require: "ngModel"
  link: (scope, elem, attrs, control) ->
#    control.$$setOptions allowInvalid: on
    scope.$watchGroup [attrs.ngModel,attrs.match], (n) ->
      valid = n[0] is n[1]
      console.log n
      control.$setValidity 'match', valid