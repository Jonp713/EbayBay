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
                        });
                },
                recProds: function($http, $stateParams){
                    return $http.get(`/api/products/${$stateParams.id}/recommendations/3`)
                    .then(function(response){
                        return response.data;
                    });
                }
            }
        });
});

app.controller('ProductController', function($scope, product, CartFactory, UserFactory, $state, AuthService, canEdit, recProds) {
    $scope.canEdit = canEdit;
    $scope.quantity = 1;
    // console.log($scope.quantity);
    $scope.product = product;
    $scope.recProds = recProds;
    $scope.isAdmin = AuthService.isAdmin;

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
		$scope.product.user.aggRating = aggRating;
	});
});
