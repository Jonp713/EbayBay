app.factory('CategoryFactory', function(DS) {
    return DS.defineResource({
        name: 'categories',
        idAttribute: '_id',
        relations: {
            hasMany: {
                products: {
                    localField: 'products',
                    foreignKey: 'categoryId'
                }
            }
        }
    });
}).run(function(CategoryFactory) {});
