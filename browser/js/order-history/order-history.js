app.config(function ($stateProvider) {

    $stateProvider.state('orderHistory', {
        url: '/order/history',
        templateUrl: 'js/order-history/order-history.html',
        controller: 'OrderHistoryCtrl',
        resolve: {
            orders: function(OrderFactory, AuthService){
                // console.log('in order resolve');
                return AuthService.getLoggedInUser().then(function(user){
                    return OrderFactory.findAll({user: user._id});
                });
            }
        }
    });

});

app.controller('OrderHistoryCtrl', function ($scope, $state, orders) {
    $scope.orders = orders;
    // console.log('orders', orders);
});
