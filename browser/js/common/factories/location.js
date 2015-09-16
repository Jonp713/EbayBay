app.factory('LocationFactory', function(DS) {
    return DS.defineResource({
        name: 'locations',
        idAttribute: '_id',
    });
}).run(function(LocationFactory) {});
