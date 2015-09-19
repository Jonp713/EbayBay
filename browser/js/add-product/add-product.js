app.config(function($stateProvider) {
    $stateProvider
        .state('addProduct', {
            url: '/products/add',
            templateUrl: 'js/add-product/add-product.html',
            controller: 'AddProductController',
        });
});

app.controller('AddProductController', function($scope, $state) {
    $scope.product = {
        name: null,
        category: null,
        quantity: null
    }
    $scope.quantitySelections = [1,2,3,4,5,6,7,8,9];
    $scope.showQuantityInput = false;
});
