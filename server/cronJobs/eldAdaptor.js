
//SyncedCron.add({
//    name: 'eldAdaptor',
//    schedule: function(parser) {
//        // parser is a later.parse object
//        return parser.recur().every(1).minute();
//    },
//    job: function() {
//        var vehicles = Vehicles.find().fetch();
//        var eldPlugins = EldPlugins.find().fetch();
//        lodash.each(vehicles, function(v) {
//            if (v.eld) {
//                console.log('updating vehicle eld');
//                if (!v.eld.useCustomGlobal) {
//                    v.eld.global = lodash.find(eldPlugins, { companyId: v.companyId, type: v.eld.type }).data;
//                }
//
//                ELD_Adaptor[v.eld.type].get(v.eld).then(function (eldLog) {
//                    eldLog.vehicleId = v._id;
//                    console.log('done updating vehicle eld', eldLog);
//                    EldLogs.insert(eldLog);
//                }).catch(function(reason) {
//                    // log error
//                });
//            }
//        });
//    }
//});