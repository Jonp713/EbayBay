app.factory('CartFactory', function($http) {
    var addToCart = function(product, quantity) {
        return $http.post('/api/cart/', {product: product, quantity: quantity});
    }

    var removeFromCart = function(product, quantity){
        return $http.delete('/api/cart/'+product._id, {product: product, quantity: quantity});

    }

    var getCart = function() {
        return $http.get('/api/cart/');
    }
    return {
        addToCart: addToCart,
        getCart: getCart,
        removeFromCart: removeFromCart
    }
});
