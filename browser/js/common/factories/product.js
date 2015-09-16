app.factory('Product', function (DS) {

	var Product = DS.defineResource({
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

    return Product;
}).run(function(Product){});
