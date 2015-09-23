app.config(function ($stateProvider) {

    $stateProvider.state('order', {
        url: '/orders/:id',
        templateUrl: 'js/order/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function(OrderFactory, $stateParams){
                console.log('stateParams', $stateParams);
                return OrderFactory.find($stateParams.id);
            },
            recProds: function($http, order) {
                var numItems = order.products.length + 3;
                return $http.get(`/api/products/${order.products[0].product._id}/recommendations/${numItems}`)
                .then(function(response){
                    console.log('responseData', response.data);
                    return response.data;
                }).then(function(recProds){
                    console.log(recProds);
                    var returnArr = [];
                    recProds.some(function(item){
                        for(var i = 0; i<order.products.length; i++){
                            //moves to the next loop of some if the product is already in the cart
                            console.log(item.product, order.products[i].product)
                            if (item.product === order.products[i].product) return false;
                        }
                        console.log('unique', item.product)
                        returnArr.push(item);
                        return returnArr.length>2;
                    });
                    return returnArr;
                });  
            }    
        }
    });

});

app.controller('OrderCtrl', function ($scope, $http, OrderFactory, $state, order, recProds) {
    $scope.order = order;
    $scope.recProds = recProds;
    console.log('recPRods', recProds)
    console.log('order in order ctlr', order);
    
    $scope.checkout = function(){
        console.log('checking out');
        $scope.order.status='processing';
        $scope.order.total = $scope.total();
        return $scope.submitOrder($scope.order)
        .then(function(){
            state.go('home')
        });
    };

    // $scope.shippingAdress = {
    //     streetAddress: null,
    //     city: null,
    //     state: null,
    //     zip: null,
    //     email: null,
    //     receiveEmails: false
    // }

    $scope.payment = {
        cardNumber: null,
        name: null,
        expire: null,
        csv: null
    },

    $scope.submitPayment = function(){
        $scope.order.payment = $scope.payment;
        return $scope.submitOrder($scope.order)
        .then(function(order){
            $state.href('#shipping-info')
        });
    }
    $scope.shipping;
    $scope.addShippingInfo = function(shipping){
        $scope.order.shippingAdress = shipping;
        console.log($scope.order);
        return $scope.submitOrder($scope.order)
                .then(function(order){
                    console.log(order)
                    $state.href('#order-info')
        });
    }
    
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

    $scope.submitOrder= function(order){
        console.log(order._id)
                return $http.put('/orders/'+order._id, order);
            };
    
});
