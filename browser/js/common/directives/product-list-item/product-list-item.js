app.directive('productListItem', function(UserFactory) {
    return {
    	restrict: 'E',
    	templateUrl: '/js/common/directives/product-list-item/product-list-item.html',
    	scope: {
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
