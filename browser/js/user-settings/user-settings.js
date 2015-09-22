app.config(function ($stateProvider) {

    $stateProvider.state('user-settings', {
        url: '/user/settings',
        templateUrl: 'js/user-settings/user-settings.html',
        controller: 'UserSettingCtrl',
        // resolve: {
        //     orders: function(OrderFactory, AuthService){
        //         console.log('in order resolve')
        //         return AuthService.getLoggedInUser().then(function(user){
        //             console.log(user)
        //             return OrderFactory.findAll({user: user._id});
        //         });
        //     }
        // }
    });

});

// app.controller('UserSettingCtrl', function ($scope, OrderFactory, $state, orders) {
//     // $scope.orders = orders,
//     // console.log('orders', orders)
// });

app.controller("UserSettingCtrl", function($scope) {
    return;
});