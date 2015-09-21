app.config(function($stateProvider) {
    $stateProvider
        .state('order-history', {
            url: '/order/history',
            templateUrl: 'js/order-history/order-history.html',
            controller: 'OrderHistoryCtrl',
            // resolve: {
            //     products: function(ProductFactory, $stateParams) {
            //         // console.log('in the resolve');
            //         // console.log($stateParams);
            //         return ProductFactory.findAll($stateParams)
            //         .then(function(elements){
            //             // console.log(elements);
            //             return elements;
            //         });
            //     }
            // }
        });
});


app.controller('OrderHistoryCtrl', function($scope, $location, products) {
    // $scope.products = products;
});
