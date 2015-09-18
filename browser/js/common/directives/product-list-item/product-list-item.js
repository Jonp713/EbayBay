<<<<<<< HEAD
app.directive('productListItem', function(UserFactory) {
=======
app.directive('productListItem', function() {
>>>>>>> f9bfa75670b15ad00e995e638da3e02caef81688
    return {
    	restrict: 'E',
    	templateUrl: '/js/common/directives/product-list-item/product-list-item.html',
    	scope: {
<<<<<<< HEAD
    		product: '='
    	},
        link: function(scope, element, attrs) {
            var getUser = function() {
                UserFactory.find(scope.product.userId)
                .then(function(user) {
                        scope.user = user;
                    });
            };
            getUser();
        }
    };
});
=======
    		product: '=',
    	}
    };
});
>>>>>>> f9bfa75670b15ad00e995e638da3e02caef81688
