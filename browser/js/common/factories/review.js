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
}).run(function(ReviewFactory){});
