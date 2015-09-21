app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/checkout',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        // resolve: {
        //     // orders: function(OrderFactory, AuthService){
        //     //     console.log('in order resolve')
        //     //     return AuthService.getLoggedInUser().then(function(user){
        //     //         console.log('legloggedinuser', user)
        //     //         return OrderFactory.findAll({user: user._id});
        //     //     });
        //     // }
        // }
    });

});

app.controller('OrderCtrl', function ($scope, OrderFactory, $state, orders) {
    $scope.orders = orders,
    console.log(orders)
    $scope.checkout = function(){
        console.log('orders', $scope.orders)
    }
    
});
