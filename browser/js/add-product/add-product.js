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
        quantity: null,
        keywords: []
    }
    $scope.quantitySelections = [];
    //function createQuantity(num) {
    //    return {name: String(num), quantity: num};
    //}
    //for(var i = 1; i <= 9; i++) {
    //    $scope.quantitySelections.push(createQuantity(i));
    //}
    //console.log($scope.quantitySelections);
    //$scope.quantitySelections.push({name: '10+', quantity: 10});
    $scope.addProduct = function() {

    }
});
