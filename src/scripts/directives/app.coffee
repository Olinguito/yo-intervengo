angular.module('yo-intervengo')

.directive 'tabs', (localStorageService) ->
    restrict: 'E'
    scope: active: '=' # will contain an array with the selected options ['request','complain','pub-work']
    replace: yes
    template: """
        <div class='tabs'>
            <div class='tab' ng-class="{'active':on(1)}" ng-click='set(1)'>Solicitudes</div><div class='tab' ng-class="{'active':on(2)}" ng-click='set(2)'>Quejas</div><div class='tab' ng-class="{'active':on(4)}" ng-click='set(4)'>Obras</div>
        </div>
        """
    link: (scope) ->
        options = 1: 'request', 2: 'complaint', 4: 'pub-work'
        selection = +localStorageService.get('tabs') || 3
        getActive = ->
            options[i] for i in [1,2,4] when (selection&i) is i
        scope.active = do getActive
        scope.on = (num) -> (selection & +num) is +num
        scope.set = (num) ->
            selection ^= +num # 011(3) xor 100(4) = 111(7)
            localStorageService.set 'tabs', selection
            scope.active = do getActive # selection = 111(7) => ['request','complain','pub-work']

.directive 'item', ->
    restrict: 'A'
    scope: item: '='
    template: """
        <div class="item">
            <a ng-href="#/{{ item.type }}/{{ item.id }}"><img ng-src="" alt="" /></a>
            <a ng-href="#/{{ item.type }}/{{ item.id }}"><h3>{{ item.name }}</h3></a>
            <i>\#{{ item.id }}</i>
            <div class='buttons'>
                <button class="join" ng-click="user.follow(item)">{{user.follows(item)?'abandonar':'seguir'}}
                </button><button title="Me gusta" class="like" ng-click="user.like(item)">{{ item.stats.like || 0}}
                </button><button title="No me gusta" class="dislike" ng-click="user.dislike(item)">{{ item.stats.dislike || 0 }}</button>
            </div>
        </div>
        """
    controller: ($scope, $rootScope) ->
        # expose user inside the isolated scope
        $scope.user = $rootScope.user
