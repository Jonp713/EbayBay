app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            cartItems: function(CartFactory){
                console.log('in the cart resolve');
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
                $scope.cartItems = response;
            });
    };
    $scope.transmitToOrder = function(){
        console.log('transmit from the cart ctlr');
        return CartFactory.transmitToOrder($scope.cartItems);
        };
});
