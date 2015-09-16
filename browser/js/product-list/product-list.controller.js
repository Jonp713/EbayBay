app.controller('ProductListController', function($scope, $location, products, ProductFactory) {
    $scope.products = products;
    console.log($location);
    //$scope.products = products;
});
