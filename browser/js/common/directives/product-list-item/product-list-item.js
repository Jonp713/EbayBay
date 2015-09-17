app.directive('productListItem', function() {
    return {
    	restrict: 'E',
    	templateUrl: '/js/common/directives/product-list-item/product-list-item.html',
    	scope: {
    		product: '=',
    	}
    };
});