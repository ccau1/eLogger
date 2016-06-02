//SyncedCron.add({
//    name: 'eldAdaptor',
//    schedule: function(parser) {
//        // parser is a later.parse object
//        return parser.recur().every(5).minute();
//    },
//    job: function() {
//        var vehicles = Vehicles.find();
//        lodash.each(vehicles, function(v) {
//            console.log('each vehicle', v);
//            if (v.eld) {
//                ELD_Adaptor[v.eld.type].get(v.eld.deviceId).done(function (eldLog) {
//                    eldLog.vehicleId = v._id;
//                    EldLogs.insert(eldLog);
//                }).catch(function(reason) {
//                    // log error
//                });
//            }
//        });
//    }
//});