app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl:  'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve:{
            isAdmin: function(AuthService){
                return AuthService.getLoggedInUser().then(function(user){
                    return user.isAdmin;
                });
            }
        },
        data: {
            authenticate: true
        }
    });

});

app.controller('AdminCtrl',function ($scope,$state,isAdmin) {
    if(!isAdmin){
        $state.go('login');
    }
});