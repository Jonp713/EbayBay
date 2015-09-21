app.config(function($stateProvider) {
    $stateProvider
        .state('addProduct', {
            url: '/products/add',
            templateUrl: 'js/add-product/add-product.html',
            controller: 'AddProductController',
            resolve: {
                states: function(StateFactory) {
                    return StateFactory.findAll();
                }
            }
        });
});

app.controller('AddProductController', function($scope, $state, ProductFactory, LocationFactory, states) {
    console.log(states);
    $scope.states = states;
    $scope.product = {
        name: null,
        category: null,
        quantity: null,
        price: null,
        description: null,
        keywords: []
    }
    $scope.addProduct = function() {
        var productObj = angular.copy($scope.product);
        productObj.keywords = productObj.keywords.map(function(element) {
            return element.text;
        });
        //$scope.product.location.state = $scope.product.location.state._id;
        LocationFactory.create(productObj.location)
        .then(function(location) {
                if(location) productObj.location = location._id;
                console.log('scope.product',productObj);
                return ProductFactory.create(productObj);
            })
            .then(function(element) {
                $state.go('product', {id: element._id});
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
