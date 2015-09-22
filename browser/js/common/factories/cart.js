app.factory('CartFactory', function($http, AuthService, $state) {
    var addToCart = function(product, quantity) {
        return $http.post('/api/cart/', {product: product, quantity: quantity});
    }

    var removeFromCart = function(product){
        console.log('in the removeFromCart');
        return $http.delete('/api/cart/'+product._id);

    }

    var getCart = function() {
        return $http.get('/api/cart/')
        .then(function(response) {
            console.log('cart on front end', response.data)
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
        return AuthService.getLoggedInUser()
            .then(function(user){
                var newOrder = {
                    products: cartObj,
                    user: user
                };
                $http.post('/api/orders/', newOrder)
                .then(function(order){
                    console.log(order._id)
                    $state.go('order', {id: order._id});
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
