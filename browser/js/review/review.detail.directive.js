app.directive('reviewList', function () {

    return {
        restrict: 'E',
        scope: {
            review: "="
        },
        templateUrl: 'js/review/review.detail.html',
        link: function (scope) {
            scope.loop = function(num) {
                return new Array(num);
            };
        }

    };

});
