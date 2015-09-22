app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function(OrderFactory, $stateParams){
                console.log('stateParams', $stateParams)
                return OrderFactory.find($stateParams.id)
            }
        }
    });

});

app.controller('OrderCtrl', function ($scope, OrderFactory, $state, order) {
    $scope.order = order;
    console.log('order in order ctlr', order)
    $scope.checkout = function(){
        console.log('checking out')
    }
    
});
