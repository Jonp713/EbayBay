app.factory('UserFactory', function (DS, ReviewFactory) {
	
	
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
        },
	    methods: {
	      // resource-specific instance method
	      aggRating: function () {
			return ReviewFactory.findAll({aboutUser: this._id})
  				   .then(function(reviews) {
					   
					   if(reviews.length){						   
							var result = reviews.reduce(function(last, rev){ 
								return rev.stars + last 
							}, 0); 
							
							result = result/reviews.length;
					   }else{
					   	 var result = "No Reviews";
					   } 
						
						
						return result;
           	 		});
	      }
	  	}
	});
}).run(function(UserFactory){});
