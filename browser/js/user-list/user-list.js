app.config(function ($stateProvider) {

    $stateProvider.state('user-list', {
        url: '/user/list',
        templateUrl: 'js/user-list/user-list.html',
        controller: 'UserListCtrl',
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

// app.controller('UserListCtrl', function ($scope, OrderFactory, $state, orders) {
//     // $scope.orders = orders,
//     // console.log('orders', orders)
// });

app.controller("UserListCtrl", function($scope) {
    return;
});