app.factory('CartFactory', function($http) {
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

    return {
        addToCart: addToCart,
        getCart: getCart,
        removeFromCart: removeFromCart,
        updateCart: updateCart
    }
});
