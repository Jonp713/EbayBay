app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            cartItems: function (CartFactory) {
                console.log('in the cart resolve');
                return CartFactory.getCart();
            },
            recProds: function ($http, cartItems) {
                var obj = {};
                cartItems.forEach(function(element, index) {
                    obj['product' + index] = element.product._id;
                })
                var numItems = cartItems.length + 3;
                return $http.get(`/api/products/recommendations/${numItems}`, {params: obj})
                    .then(function (response) {
                        console.log('responseData', response.data);
                        return response.data;
                    })
            }

            // recProds: function($http, cartItems){
            //     console.log('resolving recs')
            //     var recProdsArr = cartItems.map(function(item){
            //         return $http.get(`/api/products/${item.product._id}/recommendations/3`)
            //         .then(function(response){
            //             console.log('response', response.data)
            //         return response.data;
            //         });
            //     });
            //     return $q.all(recProdsArr)
            //     .then(function(recProdArrMap){
            //         console.log('after q.all', recProdArrMap)
            //         var uniqueProds = [];
            //         //recProdArrMap is an array of the return arrays of each cart item's sim prods
            //         recProdArrMap.forEach(function(prodArr){
            //             //go through the arrays to add them to one unique collection
            //             prodArr.forEach(function(prodScoreObj){
            //                 var found = false;
            //                 uniqueProds.some(function(uniqueProd){
            //                     //test to see if the prod is already in the return array
            //                     if(prodScoreObj.product === uniqueProd.product){
            //                         //if the product has already been found, add the scores
            //                         uniqueProd.score += prodScoreObj.score;
            //                         found = true
            //                         return found;
            //                         console.log('changed score', uniqueProd);
            //                     }
            //                 })
            //                 if(!found) uniqueProds.push(prodScoreObj);
            //             })
            //         })
            //         console.log('uniqueProds', uniqueProds);
            //         return uniqueProds;
            //     });


            // }

        }
    });

});

app.controller('CartCtrl', function ($scope, CartFactory, $state, cartItems, recProds) {
    $scope.updateCart = false;
    $scope.cartItems = cartItems;
    $scope.recProds = recProds;
    console.log($scope.recProds)
    $scope.runUpdate = function () {
        CartFactory.updateCart($scope.cartItems)
            .then(function (response) {
                $scope.cartItems = response;
            });
    };
    $scope.transmitToOrder = function () {
        console.log('transmit from the cart ctlr');
        return CartFactory.transmitToOrder($scope.cartItems);
    };
});
