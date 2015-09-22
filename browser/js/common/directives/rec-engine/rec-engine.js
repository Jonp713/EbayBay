app.directive('recEngine', function(UserFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/rec-engine/rec-engine.html',
        scope: {
            recProds: '='
        }
    };
});