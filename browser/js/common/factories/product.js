app.factory('ProductFactory', function (DS) {
<<<<<<< HEAD

=======
>>>>>>> 26a5089e8db86599dc0f15288f830e217f11c29b
	return DS.defineResource({
		name: 'products',
		idAttribute: "_id",
        relations: {
            belongsTo: {
                users: {
                    localKey: 'userId',
                    localField: 'user'
                }
            }
        }
	})
}).run(function(ProductFactory){});
