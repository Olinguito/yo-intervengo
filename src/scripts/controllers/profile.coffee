angular.module 'yo-intervengo'

.controller 'ProfileCtrl', ($scope) ->
  $scope.byType = (item) -> $scope.type.indexOf(item.type) isnt -1