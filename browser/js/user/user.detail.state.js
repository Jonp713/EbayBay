app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/user/user.detail.html',
        controller: function($scope, user, reviews){
        	$scope.user = user;
        	$scope.reviews = reviews;
        	//calculate user's agg rating
        	$scope.userAggRating = (reviews.reduce((last, rev)=> rev.stars + last))/reviews.length;
        	
        	//view products => change to product filter state
        	//ui-sref="product-list({userId: user._id})"
        }, 
        resolve: {
        	user: function(User, $stateParams){
        		return User.find($stateParams.id);
        	},
        	reviews: function(Review, stateParams) {
        		return Review.findAll({aboutUser: $stateParams.id});
        	}
        }
    });
});