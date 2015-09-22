app.config(function ($stateProvider) {
    $stateProvider
        .state('editUser', {
            url: 'users/:id/edit',
            templateUrl: 'js/edit-user/edit-user.html',
            controller: 'EditUserController',
            resolve: {
                user: function(UserFactory, $stateParams) {
                    return UserFactory.find($stateParams.id)
                }
            }
        });
});

app.controller('EditUserController', function ($scope, $state, user, UserFactory) {
    $scope.user = user;
	console.log(user);
	 
	 $scope.edit = function(){ 
	 	UserFactory.update(user._id, $scope.user).then(function(item){
			console.log(item);
	 		$state.go("user", {id: item._id});
	 	});
	 }
});
