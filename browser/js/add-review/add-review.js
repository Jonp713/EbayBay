app.config(function ($stateProvider) {

    $stateProvider.state('addReview', {
        url: '/review/add/:userId',
        templateUrl: 'js/add-review/add-review.html',
        controller: 'AddReviewCtrl',
        // resolve: {
  //       	aboutUser: function($stateParams){
  //       		return UserFactory.find($stateParams.id);
  // 			};
  //       }
    });

});

app.controller('AddReviewCtrl', function ($scope, $state, ReviewFactory, AuthService, $stateParams) {
    
	$scope.addReview = function(review){
		
		AuthService.getLoggedInUser().then(function(user){
			
			review.byUser = user._id;
			review.aboutUser = $stateParams.userId;
			console.log(user);
			return ReviewFactory.create(review);
			
		}).then(function(element){
            $state.go('user', {id: element.aboutUser});
		});
	}
});
