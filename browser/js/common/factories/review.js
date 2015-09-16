app.factory('Review', function (DS) {
    return DS.defineResource({
        name: 'reviews',
        idAttribute: "_id",
        relations: {
            hasOne: {
                users: {
                    localKey: 'userId',
                    localField: 'user'
                }
            }
        }
    });
}).run(function(Review){});
