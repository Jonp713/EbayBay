app.factory('User', function (DS) {

	var User = DS.defineResource({
		name: 'users', 
		idAttribute: "_id",		
	})

    return User;


}).run(function(User){
	
	User.findAll().then(function(users){
		console.dir(users);
		
	});
});
