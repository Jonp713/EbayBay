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
                    localField: 'products',
                    foreignKey: 'orderId'
                }
            }
        }
    });
}).run(function(OrderFactory) {});
