app.config(function($stateProvider) {
    $stateProvider
        .state('product', {
            url: '/products/:id',
            templateUrl: 'js/product/product.html',
            controller: 'ProductController',
            resolve: {
                product: function(ProductFactory, $stateParams) {
                    return ProductFactory.find($stateParams.id)
                }
            }
        })
})
