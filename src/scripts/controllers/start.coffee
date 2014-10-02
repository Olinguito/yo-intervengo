angular.module 'yo-intervengo'

.controller 'StartCtrl', ($scope, User, $location) ->
  $scope.login = true
  $scope.error = null
  $scope.data = {}
  pwdDontMatch = -> !$scope.login and ($scope.data.password isnt $scope.match)
  $scope.$watch 'login', -> $scope.error = null
  $scope.send = ->
    if $scope.lrForm.$invalid or pwdDontMatch()
      $scope.error = "Revisa que tus datos de #{if $scope.login then 'login' else 'registro'} sean validos"
      return
    $scope.error = null
    if $scope.login
      User.login($scope.data).then ->
        $location.path('/').replace()
      , -> $scope.error = "Email o contraseña invalidos"
    else
      User.register($scope.data).then ->
        $location.path('/').replace()
      , -> $scope.error = "Datos de registro invalidos"