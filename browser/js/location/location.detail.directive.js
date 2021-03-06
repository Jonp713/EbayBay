app.directive('locationDetail', function ($sce) {
    return {
        restrict: 'E',
        scope: {
            locations: "="
        },
        templateUrl: 'js/location/location.detail.html',
        link: function ($scope, elem) {
			$scope.locations.street = $scope.locations.street.replace(/\s/g, "%20");
			$scope.locations.replacedState = $scope.locations.state.name.replace(/\s/g, "%20");

			$scope.address = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBpCDfFwSOlqjm1mZnIQQ0CyBhC6TegmrE&q=" + $scope.locations.street + "%20" + $scope.locations.city + "%20" + $scope.locations.replacedState + "%20" + $scope.locations.zip + "%20USA");
			//elem.find("iframe").attr("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyBpCDfFwSOlqjm1mZnIQQ0CyBhC6TegmrE&q=" + $scope.locations.street + "%20" + $scope.locations.city + "%20" + $scope.locations.replacedState + "%20" + $scope.locations.zip + "%20USA");

        }

    };

});
