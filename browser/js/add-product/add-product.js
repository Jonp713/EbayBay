app.config(function($stateProvider) {
    $stateProvider
        .state('addProduct', {
            url: '/products/add',
            templateUrl: 'js/add-product/add-product.html',
            controller: 'AddProductController',
        });
});

app.controller('AddProductController', function($scope, $state, ProductFactory) {
    $('.chosen-select').chosen();
    $scope.product = {
        name: null,
        category: null,
        quantity: null,
        price: null,
        keywords: [],
        location: {}
    }
    $scope.addProduct = function() {
        $scope.product.keywords = $scope.product.keywords.map(function(element) {
            return element.text;
        });
        ProductFactory.create($scope.product)
        .then(function(element) {
                $state.go('product' + element._id);
            })
    }

    //$scope.quantitySelections = [];
    //function createQuantity(num) {
    //    return {name: String(num), quantity: num};
    //}
    //for(var i = 1; i <= 9; i++) {
    //    $scope.quantitySelections.push(createQuantity(i));
    //}
    //console.log($scope.quantitySelections);
    //$scope.quantitySelections.push({name: '10+', quantity: 10});
});
