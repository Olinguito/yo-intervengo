angular.module('yo-intervengo')

.directive 'tabs', ->
    restrict: 'E'
    scope: active: '='
    replace: yes
    template: "<div class='tabs'><div class='tab'>Solicitudes</div><div class='tab'>Quejas</div><div class='tab'>Obras</div></div>"

.directive 'item', ->
    restrict: 'A'
    scope: item: '='
    template: """
        <a ng-href=""><img ng-src="" alt="" /></a>
        <h3>{{ item.name }}</h3>
        <div class='buttons'>
            <button class="join">unirse</button><button class="like">{{ item.likes || 0}}</button><button class="dislike">{{ item.dislikes || 0 }}</button>
        </div>
        """
