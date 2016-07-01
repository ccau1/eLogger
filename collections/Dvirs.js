DVIRs = new Mongo.Collection('Dvirs');

DVIRs.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.Defect = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    comment: {
        type: String,
        defaultValue: '',
        label: 'Comment'
    }
});

Schemas.DefectReport = new SimpleSchema({
    componentId: {
        type: String,
        label: "Component ID"
    },
    defects: {
        type: [Schemas.Defect],
        defaultValue: [],
        label: 'Defect'
    }
});

Schemas.DVIR = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        label: 'Id'
    },
    timestamp: {
        type: Number,
        autoValue: function() {
            if (!this.value) return moment().startOf('day').valueOf();
        },
        label: 'Timestamp'
    },
    location: {
        type: String,
        label: 'Location'
    },
    odometer: {
        type: Number,
        label: 'Odometer'
    },
    carrier: {
        type: String,
        label: 'Carrier'
    },
    vehicle: {
        type: Schemas.DefectReport,
        label: 'Vehicle'
    },
    trailer: {
        type: Schemas.DefectReport,
        label: 'Trailer'
    },
    userId: {
        type: String,
        label: 'User Id',
        optional: true,
        autoValue: function() {
            if (!this.value) return Meteor.userId();
        },
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
});

DVIRs.attachSchema(Schemas.DVIR);



Meteor.methods({
    addDVIR: function(obj, callback) {
        DVIRs.insert(obj, callback);
    },
    updateDVIR: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        DVIRs.update({_id: id}, {$set: obj}, callback);
    },
    deleteDVIR: function(id) {
        DVIRs.remove(id);
    }
})