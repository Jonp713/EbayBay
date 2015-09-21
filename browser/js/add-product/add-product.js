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

app.controller('AddProductController', function($scope, $state, ProductFactory, states) {
    console.log(states);
    $scope.states = states;
    $scope.product = {
        name: null,
        category: null,
        quantity: null,
        price: null,
        keywords: [],
    }
    $scope.addProduct = function() {
        $scope.product.keywords = $scope.product.keywords.map(function(element) {
            return element.text;
        });
        //$scope.product.location.state = $scope.product.location.state._id;
        ProductFactory.create($scope.product)
        .then(function(element) {
                console.log(element);
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
