app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function(OrderFactory, $stateParams){
                console.log('stateParams', $stateParams);
                return OrderFactory.find($stateParams.id);
            }
        }
    });

});

app.controller('OrderCtrl', function ($scope, OrderFactory, $state, order) {
    $scope.order = order;
    console.log('order in order ctlr', order);
    $scope.checkout = function(){
        console.log('checking out');
    };

    $scope.shippingCosts = function() {
        // shipping is a flat rate $5.00
        if ($scope.preTaxTotal > 0){
            return 5;
        }   // returns $0 is no items have been added to the order
        return 0;
    };

    $scope.preTaxTotal = function() {
        var sum = 0;
        $scope.order.products.forEach(function(cartItem) {
            console.log('cart item ', cartItem);
            sum += cartItem.product.price;
        });
        return sum;
    };

    $scope.estTax = function() {
        return $scope.preTaxTotal() * 0.08;
    };

    $scope.total = function() {
        return $scope.estTax() + $scope.preTaxTotal() + $scope.shippingCosts();
    };
    
});
