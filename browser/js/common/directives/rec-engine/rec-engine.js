app.directive('recProducts', function(UserFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/rec-engine/rec-engine.html',
        resolve: {
        	products: function(ProductFactory) {
        		return ProductFactory.find();
        	}
        }
        scope: {

            // recommendedProducts: '='
        },
       	link: 

    };
});