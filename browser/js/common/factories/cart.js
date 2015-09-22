app.factory('CartFactory', function($http, AuthService, $state) {
    var addToCart = function(product, quantity) {
        return $http.post('/api/cart/', {product: product, quantity: quantity});
    }

    var removeFromCart = function(product){
        return $http.delete('/api/cart/'+product._id);

    }

    var getCart = function() {
        return $http.get('/api/cart/')
        .then(function(response) {
                return response.data;
            })
    }

    var updateCart = function(cartObj) {
        return $http.put('/api/cart/', cartObj)
            .then(function(response) {
                return response.data;
            });
    };
        var transmitToOrder = function(cartObj){
        return AuthService.getLoggedInUserOrNone()
            .then(function(user){
                console.log('user', user)
                var newOrder = {
                    products: cartObj
                };
                if(user._id) newOrder.user = user;
                $http.post('/api/orders/', newOrder)
                .then(function(order){
                    console.log('order passed to state.go', order.data)
                    $state.go('order', {id: order.data._id});
                });
               
                
            });
    };

    return {
        addToCart: addToCart,
        getCart: getCart,
        removeFromCart: removeFromCart,
        updateCart: updateCart,
        transmitToOrder: transmitToOrder
    }
});
