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
    $scope.product = product;
    $scope.addToCart = function(product) {
        CartFactory.addToCart(product)
        .then(function(element) {
                $state.go('home');
            })
    }
});
