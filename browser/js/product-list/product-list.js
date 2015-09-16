app.config(function($stateProvider) {
    $stateProvider
        .state('product-list', {
            url: '/products?name&category&userId&keywords&location',
            templateUrl: 'js/product-list/product-list.html',
            controller: 'ProductListController',
            resolve: {
                products: function(ProductFactory, $stateParams) {
                    console.log('in the state');
                    return ProductFactory.findAll($stateParams)
                        .then(function(elements){console.log(elements);
                            return elements});
                }
            }
        })
})
