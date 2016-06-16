SyncedCron.start();


//var vehicles = Vehicles.find().fetch();
//var eldPlugins = EldPlugins.find().fetch();
//lodash.each(vehicles, function(v) {
//    if (v.eld) {
//        if (!v.eld.useCustomGlobal || !v.eld.isCustomGlobal) {
//            v.eld.global = lodash.find(eldPlugins, { companyId: v.companyId, type: v.eld.type }).data;
//        }
//        console.log('updating vehicle eld', v.eld);
//
//        ELD_Adaptor[v.eld.type].get(v.eld).then(function (eldLog) {
//        //    eldLog.vehicleId = v._id;
//        //    console.log('done updating vehicle eld', eldLog);
//        //    EldLogs.insert(eldLog);
//        }).catch(function(reason) {
//            // log error
//        });
//    }
//});