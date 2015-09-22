app.factory('UserFactory', function (DS, ReviewFactory) {
	
	
	return DS.defineResource({
		name: 'users',
		idAttribute: "_id",
        relations: {
            hasMany: {
                products: {
                    localField: 'products',
                    localKey: 'userId'
                }
            }
        },
				methods: {
					// resource-specific instance method
					aggRating: function () {
						return ReviewFactory.findAll({aboutUser: this._id})
						.then(function(reviews) {
							var result;
							if(reviews.length){
								result = reviews.reduce(function(last, rev){
									return rev.stars + last;
								}, 0);
								result /= reviews.length;
							} else {
								result = "No Reviews";
							}
						return result;
						});
					}
			}
	});
}).run(function(UserFactory){});
