app.config(function($stateProvider) {
    $stateProvider
        .state('product', {
            url: '/products/:id',
            templateUrl: 'js/product/product.html',
            controller: 'ProductController',
            resolve: {
                product: function(ProductFactory, $stateParams) {
                    return ProductFactory.find($stateParams.id);
                }
            }
        });
});

app.controller('ProductController', function($scope, product, CartFactory, $state) {
    // Work in progress. The quantity shouldn't be hardcoded 
    $scope.quantity = product.quantity;
    // console.log($scope.quantity);
    $scope.product = product;
    $scope.addToCart = function() {
        CartFactory.addToCart($scope.product,$scope.quantity)
        .then(function() {
                $state.go('cart');
            });
    };

    $scope.removeFromCart = function() {
        CartFactory.removeFromCart($scope.product)
        .then(function() {
                $state.go('home');
            });
    };
});
