app.factory('UserFactory', function (DS) {
	return DS.defineResource({
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
	});
}).run(function(UserFactory){});
