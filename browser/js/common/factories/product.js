app.factory('Product', function (DS) {

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
}).run(function(Product){});
