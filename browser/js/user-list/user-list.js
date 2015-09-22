app.config(function ($stateProvider) {
    $stateProvider
        .state('user-list', {
            url: '/user/list',
            templateUrl: 'js/user-list/user-list.html',
            controller: 'UserListCtrl',
            resolve: {
                userlist: function(UserFactory) {
                    return UserFactory.findAll({})
                        .then(function(elements){
                            return elements;
                        });
                    }
            }
        });
});

app.controller("UserListCtrl", function($scope, UserFactory, userlist) {
    $scope.userlist = userlist;
	 
	 $scope.edit = function(){ 
	 	ProductFactory.update(product._id, $scope.user).then(function(item){
	 		$state.go("product", {id: item._id});
	 	});
	 }
});
