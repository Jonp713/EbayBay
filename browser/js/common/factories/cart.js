app.factory('CartFactory', function($http) {
    var addToCart = function(product) {
        return $http.post('/api/cart/', {product: product});
    }
    var getCart = function() {
        return $http.get('/api/cart/');
    }
    return {
        addToCart: addToCart,
        getCart: getCart
    }
});
