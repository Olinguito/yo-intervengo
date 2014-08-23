angular.module('mobile.directives', [])
.directive 'button', ->
    restrict: 'EC'
    link: (scope, element, attr) ->
        element.on 'touchstart', ->
            element.addClass 'active'
        element.on 'touchend touchcancel', ->
            element.removeClass 'active'

#
#.directive 'statusBar', ->
#    restrict: 'E'
#    replace: yes
#    scope:
#        titleClick: '&'
#        title: '@'
#    transclude: yes
#    template:
#        """
#        <header class='status-bar' ng-show='sb.visible'>
#          <button class='back' ng-click='back()'></button>
#          <button class='title' ng-click='titleClick()' ng-show="titleVisible">{{title}}</button>
#          <div class='buttons' ng-transclude></div>
#        </header>
#        """
#    controller: ($scope, $window, Ui) ->
#        $scope.back = -> do $window.history.back
#        $scope.titleVisible = yes
#        $scope.sb = Ui.statusBar
#        $scope.$on '$locationChangeSuccess', -> $scope.sb.visible = yes
#        @showTitle = -> $scope.titleVisible = yes
#        @hideTitle = -> $scope.titleVisible = no
#        return
#
#.directive 'search', (Ui) ->
#    restrict: 'C'
#    replace: yes
#    require: '^statusBar'
#    scope:
#        q: '='
#    transclude: yes
#    template: "<input type='search' ng-model='q' tabindex='1' ng-focus='on()' ng-blur='off()' placeholder='{{text}}' ng-show='s.visible'/>"
#    link: (scp, e, a, sbCtrl, transclude) ->
#        scp.off = sbCtrl.showTitle
#        scp.on = sbCtrl.hideTitle
#        scp.s = Ui.search
#        scp.$on '$locationChangeSuccess', -> scp.s.visible = no
#        transclude scp, (clone) ->
#            scp.text = clone.text()