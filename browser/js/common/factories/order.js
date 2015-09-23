
app.factory('OrderFactory', function(DS, $http) {
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
            // hasMany: {
            //     products: {
            //         localField: 'products',
            //         foreignKey: 'orderId'
            //     }
            // }
        },
        methods: {
            submitOrder: function(order){

                return $http.put('/order/'+order._id, order), order;
            },
            // getTotal: function() {
            //     this.products.reduce(function(total, prod.price)){
                    
            //     }
                
            
        }
        
    });
}).run(function(OrderFactory) {});
