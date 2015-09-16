app.factory('ReviewFactory', function (DS) {
    return DS.defineResource({
        name: 'reviews',
        idAttribute: "_id",
        relations: {
            belongsTo: {
                users: [{
                    localKey: 'aboutUser',
                    localField: 'aboutUserPop'
                }, 
                {
                    localKey: 'byUser',
                    localField: 'byUserPop'
                }] 
            }
        }
    });
<<<<<<< HEAD
}).run(function(ReviewFactory){});
=======
}).run(function(Review){});
>>>>>>> 26a5089e8db86599dc0f15288f830e217f11c29b
