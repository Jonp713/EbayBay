app.factory('ProductFactory', function (DS) {
	return DS.defineResource({
		name: 'products',
		idAttribute: "_id",
        relations: {
            belongsTo: {
                users: {
                    localKey: 'userId',
                    localField: 'user'
                },
				locations: {
                    localKey: 'locationId',
                    localField: 'location'
				}
            },
        },
	});
}).run(function(ProductFactory){});
