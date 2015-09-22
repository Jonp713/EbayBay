app.config(function ($stateProvider) {
    $stateProvider
        .state('user-list', {
            url: '/user/list',
            templateUrl: 'js/user-list/user-list.html',
            controller: 'UserListCtrl',
            resolve: {
                    userlist: function(UserFactory) {
                        // console.log('in the resolve');
                        // console.log($stateParams);
                        return UserFactory.findAll({})
                        .then(function(elements){
                            console.log(elements);
                            return elements;
                        });
                    }
            }
        });
});


app.controller("UserListCtrl", function($scope, UserFactory, userlist) {
    $scope.userlist = userlist;
    console.log(userlist);
});