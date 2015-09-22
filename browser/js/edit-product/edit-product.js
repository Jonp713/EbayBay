app.config(function ($stateProvider) {
    $stateProvider
        .state('editProduct', {
            url: 'products/:id/edit',
            templateUrl: 'js/edit-product/edit-product.html',
            controller: 'EditProductController',
            resolve: {
                states: function(StateFactory) {
                    return StateFactory.findAll();
                },
                product: function(ProductFactory, $stateParams) {
                    return ProductFactory.find($stateParams.id)
                }
            }
        });
});

app.controller('EditProductController', function ($scope, $state, product, states) {
    $scope.states = states;
    $scope.product = product;
});
