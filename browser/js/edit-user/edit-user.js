app.config(function ($stateProvider) {
    $stateProvider
        .state('editUser', {
            url: 'users/:id/edit',
            templateUrl: 'js/edit-user/edit-user.html',
            controller: 'EditUserController',
            resolve: {
                states: function(StateFactory) {
                    return StateFactory.findAll();
                },
                product: function(UserFactory, $stateParams) {
                    return UserFactory.find($stateParams.id)
                }
            }
        });
});

app.controller('EditUserController', function ($scope, $state, product, states) {
    $scope.states = states;
    $scope.product = product;
});
