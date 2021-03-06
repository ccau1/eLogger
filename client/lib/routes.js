import '/lib/Constants.js';

angular.module(Constants.Module).config(['$stateProvider', function ($stateProvider) {


    let baseResolve = {
        currentUser: ['$q', function ($q) {
            if (Meteor.userId() == null) {
                return $q.reject('AUTH_REQUIRED');
            } else {
                return $q.resolve();
            }
        }]
    };

    $stateProvider

    // Dashboard
        .state('settings.vehicle', {
            url: "/vehicle",
            views: {
                'main': {},
                'settings': {
                    templateUrl: "client/components/settings/vehicleSettingsView.ng.html",
                    controller: "VehicleSettingsController"
                }
            },
            data: {subTitle: 'Vehicle'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('account', {
            url: "/account",
            views: {
                'main': {
                    templateUrl: "client/components/account/accountView.ng.html",
                    controller: "AccountController"
                }
            },
            data: {pageTitle: 'Account'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('home', {
            url: "/",
            views: {
                'main': {
                    templateUrl: "client/components/home/homeView.ng.html",
                    controller: "HomeController"
                }
            },
            data: {pageTitle: 'Overview'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('documents', {
            url: "/documents",
            views: {
                'main': {
                    templateUrl: "client/components/documents/documentsView.ng.html",
                    controller: "DocumentsController"
                }
            },
            data: {pageTitle: 'Documents'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('newDocument', {
            url: "/documents/new",
            views: {
                'main': {
                    templateUrl: "client/components/documents/documentView.ng.html",
                    controller: "DocumentController"
                }
            },
            data: {pageTitle: 'Document', backView: { go: 'documents', params: {} }},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('document', {
            url: "/documents/:id",
            views: {
                'main': {
                    templateUrl: "client/components/documents/documentView.ng.html",
                    controller: "DocumentController"
                }
            },
            data: {pageTitle: 'Document', backView: { go: 'documents', params: {} }},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('dvirs', {
            url: "/DVIRs",
            views: {
                'main': {
                    templateUrl: "client/components/dvirs/dvirsView.ng.html",
                    controller: "DVIRsController"
                }
            },
            data: {pageTitle: 'DVIRs'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('newDvir', {
            url: "/DVIRs/new",
            views: {
                'main': {
                    templateUrl: "client/components/dvirs/dvirView.ng.html",
                    controller: "DVIRController"
                }
            },
            data: {pageTitle: 'DVIR', backView: { go: 'dvirs', params: {} }},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('dvir', {
            url: "/DVIRs/:id",
            views: {
                'main': {
                    templateUrl: "client/components/dvirs/dvirView.ng.html",
                    controller: "DVIRsController"
                }
            },
            data: {pageTitle: 'DVIRs', backView: { go: 'dvirs', params: {} }},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('dayLogs', {
            url: "/dayLogs",
            views: {
                'main': {
                    templateUrl: "client/components/dayLogs/dayLogsView.ng.html",
                    controller: "DayLogsController"
                }
            },
            data: {pageTitle: 'Logs'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('dayLog', {
            url: "/dayLogs/:date",
            views: {
                'main': {
                    templateUrl: "client/components/dayLogs/dayLogView.ng.html",
                    controller: "DayLogController"
                }
            },
            data: {pageTitle: 'Logs', backView: { go: 'dayLogs', params: {}}},
            resolve: lodash.assign(baseResolve, {
                pageSubTitle: ['$stateParams', function($stateParams) {
                    if ($stateParams.date) {
                        this.data.pageTitle = moment($stateParams.date).format('LL');
                    }
                }]
            })
        })
        // .state('logs', {
        //    url: "/logs",
        //    views: {
        //        'main': {
        //            templateUrl: "client/components/logs/logsView.ng.html",
        //            controller: "LogsController"
        //        }
        //    },
        //    data: {pageTitle: 'Logs'},
        //    resolve: lodash.assign(baseResolve, {
        //
        //    })
        //})
        //.state('log', {
        //    url: "/logs/:date",
        //    views: {
        //        'main': {
        //            templateUrl: "client/components/logs/logView.ng.html",
        //            controller: "LogController"
        //        }
        //    },
        //    data: {pageTitle: 'Log', backView: { go: 'logs', params: {}}},
        //    resolve: lodash.assign(baseResolve, {
        //
        //    })
        //})

}]);