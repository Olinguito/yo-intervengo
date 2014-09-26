angular.module 'yo-intervengo'

.controller 'StartCtrl', ($scope, User, $location) ->
  $scope.login = true
  $scope.error = null
  $scope.data = {}
  pwdDontMatch = -> !$scope.login and ($scope.data.pwd isnt $scope.match)
  $scope.$watch 'login', -> $scope.error = null
  $scope.send = ->
    if $scope.lrForm.$invalid or pwdDontMatch()
      $scope.error = "Revisa que tus datos de #{$scope.login?'login':'registro'} sean validos"
      return
    $scope.error = null
    if $scope.login
      if User.login $scope.data
        $location.path '/'
      else $scope.error = "Email o contraseña invalidos"
    else
      User.register $scope.data
      $location.path '/'