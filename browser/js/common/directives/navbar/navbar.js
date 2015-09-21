app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, ProductFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            scope.items = [
                { label: 'Products', state: 'product-list'},
                { label: 'Cart', state: 'cart' },
                { label: "Add Product", state: "addProduct", auth: true},
                { label: "Add Review", state: "addReview", auth: true},
                { label: "Checkout", state: "order"},
                { label: "Order History", state:"orderHistory", auth: true},
                // { label: 'Documentation', state: 'docs' },
                // { label: 'About', state: 'about' },
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
