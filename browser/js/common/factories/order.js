
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
                    foreignKey: 'productId'
                }
            }
        },
        // methods: {
        //     getTotal: function() {
        //         this.products.reduce(function(total, prod.price)){
                    
        //         }
                
        //     })
        // }
        
    });
}).run(function(OrderFactory) {});
