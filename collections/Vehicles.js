Vehicles = new Mongo.Collection('vehicles');

Vehicles.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.Vehicle = new SimpleSchema({
    _id: {
        type: String,
        label: 'Id'
    },
    companyId: {
        type: String,
        label: 'Company ID'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        label: 'Created At'
    },
    owner: {
        type: String,
        label: 'Owner'
    },
    vin: {
        type: String,
        label: 'VIN'
    },
    year: {
        type: String,
        label: 'year'
    },
    manufacturer: {
        type: String,
        label: 'Manufacturer'
    },
    model: {
        type: String,
        label: 'Model'
    },
    licensePlate: {
        type: String,
        label: 'License Plate'
    },
    licensePlateNumber: {
        type: String,
        label: 'License Plate Number'
    },
    isMetric: {
        type: Boolean,
        label: 'Is Metric'
    }

});

Vehicles.attachSchema(Schemas.Vehicle);



Meteor.methods({
    addVehicle: function(obj, callback) {
        obj.owner = this.userId;
        Vehicles.insert(obj, callback);
    },
    updateVehicle: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        Vehicles.update({_id: id}, {$set: obj}, callback);
    },
    deleteVehicle: function(id) {
        Vehicles.remove(id);
    }
})