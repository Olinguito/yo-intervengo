angular.module 'yo-intervengo'

.controller 'ProfileCtrl', ($scope, user) ->
  $scope.user = user
  $scope.byType = (item) -> $scope.type.indexOf(item.type) isnt -1