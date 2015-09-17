app.directive('locationDetail', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            location: "="
        },
        templateUrl: 'js/location/location.detail.html',
        link: function (scope) {

        }

    };

});
