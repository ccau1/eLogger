EldLogs = new Mongo.Collection('eldLogs');

EldLogs.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.EldLog = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        label: 'Id'
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (!this.value) return new Date();
        },
        label: 'Created At'
    },
    vehicleId: {
        type: String,
        label: 'Vehicle'
    },
    status: {
        type: String,
        label: 'Status'
    },
    addr: {
        type: Schemas.Address,
        optional: true,
        label: 'Address'
    }
});

EldLogs.attachSchema(Schemas.EldLog);



Meteor.methods({
    addEldLog: function(obj, callback) {
        EldLogs.insert(obj, callback);
    },
    updateEldLog: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        EldLogs.update({_id: id}, {$set: obj}, callback);
    },
    deleteEldLog: function(id) {
        EldLogs.remove(id);
    }
})