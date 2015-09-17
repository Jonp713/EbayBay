app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, user, reviews){
						
        	$scope.user = user;			
        	$scope.reviews = reviews;
			//calculate user's agg rating
			
        	if(reviews.length) $scope.userAggRating = (reviews.reduce((last, rev)=> rev.stars + last))/reviews.length;
        	
        	//view products => change to product filter state
        	//ui-sref="product-list({userId: user._id})"
        }, 
        resolve: {
        	user: function(UserFactory, $stateParams){
        		return UserFactory.find($stateParams.id);
        	},
        	reviews: function(ReviewFactory, $stateParams) {
        		return ReviewFactory.findAll({aboutUser: $stateParams.id});
        	}
        }
    });
			
});
