app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, user, reviews, UserFactory){
						
        	$scope.user = user;			
        	$scope.reviews = reviews;
			//calculate user's agg rating
			UserFactory.find(user._id).then(function(user){
				return user.aggRating();
			}).then(function(aggRating){
				if(	typeof aggRating == "number") aggRating = aggRating.toString().slice(0,3);
				$scope.aggRating = aggRating;
			});
        	//view products => change to product filter state
        	//ui-sref="product-list({userId: user._id})"
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
