app.factory('CartFactory', function($http) {
    var addToCart = function(product, quantity) {
        return $http.post('/api/cart/', {product: product, quantity: quantity});
    }
    var getCart = function() {
        return $http.get('/api/cart/');
    }
    return {
        addToCart: addToCart,
        getCart: getCart
    }
});
