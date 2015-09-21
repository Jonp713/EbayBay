app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/order',
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

app.controller('OrderCtrl', function ($scope, OrderFactory, $state) {
    $scope.checkout = function(){
        console.log('checking out')
    }
    
});
