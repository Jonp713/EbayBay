app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        // resolve: {
        //     cartItems: function(CartFactory){
        //         return CartFactory.getCart();
        //     }
        // }
    });

});

app.controller('CheckoutCtrl', function ($scope, CartFactory, $state, cartItems) {
    // $scope.updateCart = false;
    // $scope.cartItems = cartItems;
    // $scope.runUpdate = function() {
    //     CartFactory.updateCart($scope.cartItems)
    //     .then(function() {
    //             $state.go('cart');
    //         })
    // }
});
