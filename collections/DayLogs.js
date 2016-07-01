DayLogs = new Mongo.Collection('dayLogs');
DayLogSummaries = new Mongo.Collection('dayLogSummaries');

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
    addDayLogTravelLog: function(id, status, time, callback) {
        var dl = DayLogs.findOne({ _id: id });
        if (!dl) return false;

        var existingTravelLog = lodash.find(dl.travelLog, { 'start': time });
        if (existingTravelLog) {
            dl.travelLog = _.remove(dl.travelLog, existingTravelLog);
        }


        dl.travelLog.push({ start: time, status: status });
        dl.lastStatus = status;

        dl.travelLog = _.sortBy(dl.travelLog, ['start']);
        delete dl._id;
        DayLogs.update({_id: id}, {$set: dl}, callback);
    },
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
    },
    getDayLogSummaryList: function(datestamp) {
        function filterByRole() {
            var usr = Meteor.users.findOne({ _id: this.userId });
            var filter = {};
            if (Roles.userIsInRole(this.userId, 'admin')) {
                filter.company = usr.profile.companyId;
            } else if (Roles.userIsInRole(this.userId, 'driver')) {
                filter.company = usr.profile.companyId;
                filter.owner = usr._id;
            }

            return filter;
        }


        function quarterTime(time, roundType) {
            time.set('second', 0);
            var min = time.get('minute');
            var newMin = 0;
            if (min < 15) {
                newMin = 0;
            } else if (min < 30) {
                newMin = 15;
            } else if (min < 45) {
                newMin = 30;
            } else if (min < 60) {
                newMin = 45;
            }

            if (roundType == Constants.Round.CEIL) {
                newMin += 15;
                if (newMin == 60) newMin = 0;
            }

            return time.set('minute', newMin);
        }

        function addTotalTravelTime(daylogs) {
            lodash.each(daylogs, function (dl, dl_k) {
                daylogs[dl_k].totalTravelTime = 0;
                lodash.each(dl.travelLog, function (tl, tl_k) {
                    if (tl.status == Constants.Log.Status.D) {
                        if (tl_k == dl.travelLog.length - 1) {
                            // last item for the day, get diff to end of day or current time (if date is today)
                            var endTime = moment().valueOf() > moment(tl.start).startOf('day').add(1, 'days').valueOf() ? moment(tl.start).startOf('day').add(1, 'days').valueOf() : quarterTime(moment(), Constants.Round.CEIL).valueOf();
                            daylogs[dl_k].totalTravelTime += dl.travelLog[tl_k + 1].start - tl.start;
                        } else {
                            // not last item, get end time from next item
                            daylogs[dl_k].totalTravelTime += dl.travelLog[tl_k + 1].start - tl.start;
                        }
                    }
                });
            });
        }

        var filter = { date: datestamp };

        var daylogs = DayLogs.find(lodash.assign(filter, filterByRole()), { sort: { date: -1 }}).fetch();

        addTotalTravelTime(daylogs);

        return daylogs;
    }
})