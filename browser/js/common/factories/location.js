app.factory('LocationFactory', function(DS) {
    return DS.defineResource({
        name: 'locations',
        idAttribute: '_id',
        relations: {
            belongsTo:{
                states: {
                    localKey: 'stateId',
                    localField: 'state'
                }
            }
        }
    });
}).run(function(LocationFactory) {});
