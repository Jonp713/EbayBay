//app.factory('Review', function (DS) {
//    var Review = DS.defineResource({
//        name: 'reviews',
//        idAttribute: "_id",
//        relations: {
//            hasOne: {
//                users: {
//                    localKey: 'userId',
//                    localField: 'user'
//                }
//            }
//        }
//    });
//
//    return Review;
//}).run(function(Review){
//    Review.findAll()
//        .then(function(elements){
//            console.log(elements);
//        })
//});
