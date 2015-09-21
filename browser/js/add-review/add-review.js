app.config(function ($stateProvider) {

    $stateProvider.state('addReview', {
        url: '/review/add',
        templateUrl: 'js/add-review/add-review.html',
        controller: 'AddReviewCtrl',
        // resolve: {
        //     cartItems: function(CartFactory){
        //         return CartFactory.getCart();
        //     }
        // }
    });

});

app.controller('AddReviewCtrl', function ($scope, CartFactory, $state, cartItems) {
    // $scope.updateCart = false;
    // $scope.cartItems = cartItems;
    // $scope.runUpdate = function() {
    //     CartFactory.updateCart($scope.cartItems)
    //     .then(function(response) {
    //             console.log(response);
    //             $scope.cartItems = response;
    //         });
    // };
});
