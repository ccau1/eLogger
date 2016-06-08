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

Schemas.ELD = new SimpleSchema({
    type: {
        type: String,
        label: 'Type'
    },
    device: {
        type: Object,
        blackbox: true,
        optional: true,
        label: 'Device Data'
    },
    useCustomGlobal: {
        type: Boolean,
        defaultValue: false,
        label: 'Is Custom Global'
    },
    global: {
        type: Object,
        blackbox: true,
        optional: true,
        label: 'Global Data'
    }
});


Schemas.Vehicle = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        label: 'Id'
    },
    companyId: {
        type: String,
        label: 'Company ID',
        autoValue: function() {
            // TODO:: for some reason _id throws error...but inserts company id properly

            if (!this.value && Meteor.isServer) {
                var usr = Meteor.user();
                return Companies.findOne({ _id: usr.profile.companyId })._id;
            }
        },
    },
    owner: {
        type: String,
        label: 'Owner',
        autoValue: function() {
            if (!this.value) return Meteor.userId();
        },
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        label: 'Created At'
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
    },
    eld: {
        type: Schemas.ELD,
        optional: true,
        label: 'ELD'
    }
});

Vehicles.attachSchema(Schemas.Vehicle);



Meteor.methods({
    addVehicle: function(obj, callback) {
        var usr = Meteor.users.findOne({ _id: this.userId });
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