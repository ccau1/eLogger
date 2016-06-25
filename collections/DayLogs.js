DayLogs = new Mongo.Collection('dayLogs');

DayLogs.allow({
    insert: function(userId, doc) {
        // true if userId exists
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    }
});

Schemas.TravelLog = new SimpleSchema({
    start: {
        type: Number,
        label: 'Start Time'
    },
    status: {
        type: String,
        label: 'Status'
    }
});

Schemas.DayLog = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
        label: 'Id'
    },
    date: {
        type: Number,
        autoValue: function() {
            if (!this.value) return moment().startOf('day').valueOf();
        },
        label: 'Datestamp'
    },
    distance: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        label: 'Distance'
    },
    travelLog: {
        type: [Schemas.TravelLog],
        defaultValue: [],
        label: 'Travel Log'
    },
    lastStatus: {
        type: String,
        label: 'Last Status'
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
        //autoValue: function() {
        //    // TODO:: for some reason _id throws error...but inserts company id properly
        //    if (!this.value && Meteor.isServer) {
        //        //var usr = Meteor.user();
        //        //return Companies.findOne({ _id: usr.profile.companyId })._id;
        //    }
        //},
    },
});

DayLogs.attachSchema(Schemas.DayLog);



Meteor.methods({
    addDayLog: function(obj, callback) {
        DayLogs.insert(obj, callback);
    },
    updateDayLog: function(obj, callback) {
        var id = obj._id;
        delete obj._id;
        DayLogs.update({_id: id}, {$set: obj}, callback);
    },
    deleteDayLog: function(id) {
        DayLogs.remove(id);
    }
})