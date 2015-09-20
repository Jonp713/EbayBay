app.directive('locationDetail', function () {

    return {
        restrict: 'E',
        scope: {
            locations: "="
        },
        templateUrl: 'js/location/location.detail.html',
        link: function ($scope, elem) {
			$scope.locations.hello = "hello";
			$scope.locations.street = $scope.locations.street.replace(/\s/g, "%20");
			$scope.locations.replacedState = $scope.locations.state.name.replace(/\s/g, "%20");
            console.log($scope.locations);

			elem.find("iframe").attr("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyBpCDfFwSOlqjm1mZnIQQ0CyBhC6TegmrE&q=" + $scope.locations.street + "%20" + $scope.locations.city + "%20" + $scope.locations.replacedState + "%20" + $scope.locations.zip + "%20USA");

        }

    };

});
