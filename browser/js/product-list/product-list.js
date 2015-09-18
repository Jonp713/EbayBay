app.config(function($stateProvider) {
    $stateProvider
        .state('product-list', {
            url: '/products?name&category&user&keywords&location',
            templateUrl: 'js/product-list/product-list.html',
            controller: 'ProductListController',
            resolve: {
                products: function(ProductFactory, $stateParams) {
                    console.log('in the resolve');
                    console.log($stateParams);
                    return ProductFactory.findAll($stateParams)
                        .then(function(elements){console.log(elements);
                            return elements});
                }
            }
        })
})


app.controller('ProductListController', function($scope, $location, products) {
    $scope.products = products;
});
