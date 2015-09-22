app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function(OrderFactory, $stateParams){
                console.log($stateParams)
                return OrderFactory.find($stateParams.id)
            }
        }
    });

});

app.controller('OrderCtrl', function ($scope, OrderFactory, $state, order) {
    $scope.order = order;
    $scope.checkout = function(){
        console.log('checking out')
    }
    
});
