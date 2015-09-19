app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/checkout',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        // resolve: {
        //     cartItems: function(CartFactory){
        //         return CartFactory.getCart();
        //     }
        // }
    });

});

app.controller('OrderCtrl', function ($scope, CartFactory, $state, cartItems) {
    // $scope.updateCart = false;
    // $scope.cartItems = cartItems;
    // $scope.runUpdate = function() {
    //     CartFactory.updateCart($scope.cartItems)
    //     .then(function() {
    //             $state.go('cart');
    //         })
    // }
});
