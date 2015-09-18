app.factory('CartFactory', function($http) {
    var addToCart = function(product, quantity) {
        return $http.post('/api/cart/', {product: product, quantity: quantity});
    }
    var getCart = function() {
        return $http.get('/api/cart/')
        .then(function(response) {
                return response.data;
            })
    }

    var removeFromCart = function(product) {
        return $http.delete('/api/cart' + product._id);
    }

    var updateCart = function() {

    };

    return {
        addToCart: addToCart,
        getCart: getCart,
        removeFromCart: removeFromCart,
        updateCart: updateCart
    }
});
