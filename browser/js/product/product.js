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
        })
})

app.controller('ProductController', function($scope, product, CartFactory, $state) {
    $scope.quantity = 1;
    console.log($scope.quantity);
    $scope.product = product;
    $scope.addToCart = function() {
        CartFactory.addToCart($scope.product,$scope.quantity)
        .then(function(element) {
                $state.go('home');
            })
    }

    $scope.removeFromCart = function() {
        CartFactory.removeFromCart($scope.product,$scope.quantity)
        .then(function(element) {
                $state.go('home');
            })
    }
});
