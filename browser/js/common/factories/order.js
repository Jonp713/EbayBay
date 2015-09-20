
app.factory('OrderFactory', function(DS) {
    return DS.defineResource({
        name: 'orders',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                users: {
                    localKey: 'userId',
                    localField: 'user'
                }
            },
            hasMany: {
                products: {
                    localField: 'product',
                    foreignKey: 'orderId'
                }
            }
        },
        // methods: {
        //     var getProducts = function() {

        //         return $http.get('/api/products/', {_id: })
        //         .then(function(response) {
        //                 return response.data;
        //     })
        // }
        
    });
}).run(function(OrderFactory) {});
