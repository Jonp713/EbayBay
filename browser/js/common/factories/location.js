app.factory('location', function(DS) {
    return DS.defineResource({
        name: 'locations',
        idAttribute: '_id',
    });
}).run(function(Order) {});
