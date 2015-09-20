app.factory('StateFactory', function (DS) {
    return DS.defineResource({
        name: 'states',
        idAttribute: "_id"
    });
}).run(function(StateFactory){});

