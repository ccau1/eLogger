DVIRs = new Mongo.Collection('dvirs');

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
    note: {
        type: String,
        //defaultValue: '',
        optional: true,
        label: 'Note'
    }
});

Schemas.VehicleDefectReport = new SimpleSchema({
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

Schemas.TrailerDefectReport = new SimpleSchema({
    componentIds: {
        type: [String],
        defaultValue: [],
        label: "Component ID"
    },
    defects: {
        type: [Schemas.Defect],
        defaultValue: [],
        label: 'Defect'
    }
});

Schemas.DVIR_Signatures = new SimpleSchema({
    driver: {
        type: String,
        label: 'Driver Signature'
    },
    mechanic: {
        type: String,
        optional: true,
        label: 'Mechanic Signature'
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
    forDate: {
        type: Number,
        autoValue: function() {
            if (!this.value) return moment().startOf('day').valueOf();
        },
        label: 'For Date'
    },
    carrier: {
        type: String,
        label: 'Carrier'
    },
    location: {
        type: String,
        label: 'Location'
    },
    odometer: {
        type: Number,
        label: 'Odometer'
    },
    vehicle: {
        type: Schemas.VehicleDefectReport,
        label: 'Vehicle'
    },
    trailer: {
        type: Schemas.TrailerDefectReport,
        label: 'Trailer'
    },
    defectsCorrected: {
        type: Boolean,
        defaultValue: false,
        label: 'Defects Corrected'
    },
    defectsNeedNotCorrect: {
        type: Boolean,
        defaultValue: false,
        label: 'Defects Need Not Correct'
    },
    signatures: {
        type: Schemas.DVIR_Signatures,
        label: 'Signatures'
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
            if (!this.value) {
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