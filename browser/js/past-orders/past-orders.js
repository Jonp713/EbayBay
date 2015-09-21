app.config(function ($stateProvider) {

    $stateProvider.state('pastOrders', {
        url: '/orders',
        templateUrl: 'js/past-orders/past-orders.html',
        controller: 'OrderCtrl',
        resolve: {
            orders: function(OrderFactory, AuthService){
                console.log('in order resolve')
                return AuthService.getLoggedInUser().then(function(user){
                    return OrderFactory.findAll({user: user._id});
                });
            }
        }
    });

});

app.controller('PastOrderCtrl', function ($scope, OrderFactory, $state, orders) {
    $scope.orders = orders,
    console.log(orders)
});
