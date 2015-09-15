app.factory('Product', function (DS) {

	var Product = DS.defineResource({
		name: 'product', 
		idAttribute: "_id",		
	})

    return Product;


}).run(function(User){});
