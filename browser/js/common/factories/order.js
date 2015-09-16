app.factory('Order', function(DS) {
    return DS.defineResource({
        name: 'orders',
        basePath: '/api/users/',
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
                    localField: 'products',
                    foreignKey: 'orderId'
                }
            }
        }
    });
}).run(function(Order) {});
