app.config(function($stateProvider) {
    $stateProvider
        .state('product', {
            url: '/products/:id',
            templateUrl: 'js/product/product.html',
            controller: 'ProductController',
            resolve: {
                product: function(ProductFactory, $stateParams) {
                    return ProductFactory.find($stateParams.id);
                },
                canEdit: function(AuthService, product) {
                    return AuthService.getLoggedInUser()
                    .then(function(user) {
                            if(!user) return false;
                            return product.user._id === user._id;
                        })
                }
            }
        });
});

app.controller('ProductController', function($scope, product, CartFactory, UserFactory, $state, AuthService, canEdit) {
    $scope.canEdit = canEdit;
    $scope.quantity = 1;
    // console.log($scope.quantity);
    $scope.product = product;

    $scope.addToCart = function() {
        CartFactory.addToCart($scope.product,$scope.quantity)
        .then(function() {
                $state.go('cart');
            });
    };

    $scope.removeFromCart = function() {
        CartFactory.removeFromCart($scope.product)
        .then(function() {
                $state.go('home');
            });
    };
	 
	UserFactory.find(product.user._id).then(function(user){
		return user.aggRating();
	}).then(function(aggRating){
		if(typeof aggRating == "number") aggRating = aggRating.toString().slice(0,3);
		$scope.product.user.aggRating = aggRating;
	});
});
