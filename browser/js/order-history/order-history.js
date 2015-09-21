app.config(function ($stateProvider) {

    $stateProvider.state('pastOrders', {
        url: '/order/history',
        templateUrl: 'js/past-orders/past-orders.html',
        controller: 'OrderCtrl',
        resolve: {
            orders: function(OrderFactory, AuthService){
                console.log('in order resolve')
                return AuthService.getLoggedInUser().then(function(user){
                    console.log(user)
                    return OrderFactory.findAll({user: user._id});
                });
            }
        }
    });

});

app.controller('PastOrderCtrl', function ($scope, OrderFactory, $state, orders) {
    $scope.orders = orders,
    console.log('orders', orders)
});
