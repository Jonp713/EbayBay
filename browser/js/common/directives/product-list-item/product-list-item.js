app.directive('productListItem', function(UserFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/common/directives/product-list-item/product-list-item.html',
        scope: {
            product: '='
        },

    };
});
