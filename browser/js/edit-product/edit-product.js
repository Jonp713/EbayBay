app.config(function ($stateProvider) {
    $stateProvider
        .state('product.edit', {
            url: '/edit',
            templateUrl: 'js/edit-product/edit-product.html',
            controller: 'EditProductController',
            resolve: {
                states: function(StateFactory) {
                    return StateFactory.findAll();
                }
            }
        });
});

app.controller('EditProductController', function ($scope, $state, product, states) {
    $scope.states = states;
    $scope.product = product;
    console.log(product);
});
