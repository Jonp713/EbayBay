app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, user, reviews, UserFactory, AuthService){
						
        	$scope.user = user;			
        	$scope.reviews = reviews;
			//calculate user's agg rating
			UserFactory.find(user._id).then(function(user){
				return user.aggRating();
			}).then(function(aggRating){
				$scope.aggRating = aggRating;
			});
			
         $scope.isAdmin = AuthService.isAdmin;
			
			$scope.isLoggedIn = AuthService.isAuthenticated;
        }, 
        resolve: {
        	user: function(UserFactory, $stateParams){
        		return UserFactory.find($stateParams.id);
        	},
        	reviews: function(ReviewFactory, user, $stateParams) {
        		return ReviewFactory.findAll({aboutUser: $stateParams.id})
                .then(function(reviews) {
                    return reviews;
                });
        		}
        }
    });
			
});
