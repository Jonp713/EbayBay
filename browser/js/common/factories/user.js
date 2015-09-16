app.factory('User', function (DS) {

	var User = DS.defineResource({
		name: 'users',
		idAttribute: "_id",
        relations: {
            hasMany: {
                products: {
                    localField: 'products',
                    foreignKey: 'userId'
                }
            }
        }
	})

    return User;


}).run(function(User){
    User.findAll()
        .then(function(element) {
            console.log(element);
        })
});
