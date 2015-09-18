app.directive('productListItem', function(UserFactory) {
    return {
    	restrict: 'E',
    	templateUrl: '/js/common/directives/product-list-item/product-list-item.html',
    	scope: {
    		product: '='
<<<<<<< HEAD
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
=======
    	}
>>>>>>> 989a18be13329ee4f268c488318cd18ac208e4b9
    };
});
