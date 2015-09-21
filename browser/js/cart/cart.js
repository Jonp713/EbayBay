app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            cartItems: function(CartFactory){
                return CartFactory.getCart();
            }
        }
    });

});

app.controller('CartCtrl', function ($scope, CartFactory, $state, cartItems) {
    $scope.updateCart = false;
    $scope.cartItems = cartItems;
    $scope.runUpdate = function() {
        CartFactory.updateCart($scope.cartItems)
        .then(function(response) {
                console.log(response);
                $scope.cartItems = response;
            });
    }
});
