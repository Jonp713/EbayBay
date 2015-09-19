app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;
        console.log(signupInfo);
        UserFactory.create(signupInfo)
        .then(function(){
            $state.go("home");
        }).catch(function() {
            $scope.error = "Missing signup credentials";
        });

        // AuthService.signup(signupInfo).then(function () {
        //     $state.go('home');
        // }).catch(function () {
        //     $scope.error = 'Missing signup credentials.';
        // });

    };

});