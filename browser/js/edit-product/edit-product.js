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

app.controller('EditProductController', function ($scope, $state, product, states, ProductFactory) {
    $scope.states = states;
    $scope.product = product;
  
	 $scope.edit = function(){
		var productObj = angular.copy($scope.product);
		productObj.keywords = productObj.keywords.map(function (element) {
		  return element.text;
		});
				 
	 	ProductFactory.update(product._id, productObj).then(function(item){
	 		$state.go("product", {id: item._id});
	 	});
	 }
});
