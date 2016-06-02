angular.module(Constants.Module).config(['$stateProvider', '$urlRouterProvider', 'settingsProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, settingsProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    let baseResolve = {
        currentUser: function ($q) {
            if (Meteor.userId() == null) {
                return $q.reject('AUTH_REQUIRED');
            } else {
                return $q.resolve();
            }
        }
    };

    $stateProvider
        .state('admin', {
            url: "/admin",
            views: {
                'main': {
                    templateUrl: "client/components/admin/adminView.ng.html",
                    controller: "AdminController"
                }
            },
            data: {pageTitle: 'Admin'},
            resolve: lodash.assign(baseResolve, {})
        })
        .state('admin.company', {
            url: "/company",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/companies/companyView.ng.html",
                    controller: "CompanyController"
                }
            },
            data: {subTitle: 'Company', backView: { go: 'admin', params: {} } },
            resolve: lodash.assign(baseResolve, {})
        })
        .state('admin.vehicles', {
            url: "/vehicles",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/vehicles/vehiclesView.ng.html",
                    controller: "VehiclesController"
                }
            },
            data: {subTitle: 'Vehicles', backView: { go: 'admin', params: {} } },
            resolve: lodash.assign(baseResolve, {})
        })
        .state('admin.newVehicle', {
            url: "/vehicles/new",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/vehicles/vehicleView.ng.html",
                    controller: "VehicleController"
                }
            },
            data: {subTitle: 'New Vehicle', backView: { go: 'admin.vehicles', params: {} }},
            resolve: lodash.assign(baseResolve, {})
        })
        .state('admin.vehicle', {
            url: "/vehicles/:id",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/vehicles/vehicleView.ng.html",
                    controller: "VehicleController"
                }
            },
            data: {subTitle: 'Vehicles', backView: { go: 'admin.vehicles', params: {} }},
            resolve: lodash.assign(baseResolve, {
                subTitle: ['$stateParams', function($stateParams) {
                    if ($stateParams.id) {
                        this.data.subTitle = 'Vehicle (' + $stateParams.id + ')';
                    }
                    return this.data.subTitle;
                }]
            })
        })
        .state('admin.eldTypes', {
            url: "/ELD-plugins",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/eldTypes/eldTypesView.ng.html",
                    controller: "EldTypesController"
                }
            },
            data: {subTitle: 'ELD Plugins', backView: { go: 'admin', params: {} } },
            resolve: lodash.assign(baseResolve, {})
        })
        .state('admin.eldType', {
            url: "/ELD-plugins/:type",
            views: {
                'main': {},
                'admin': {
                    templateUrl: "client/components/eldTypes/eldTypeView.ng.html",
                    controller: "EldController"
                }
            },
            data: {subTitle: 'ELD Plugin', backView: { go: 'admin.eldTypes', params: {} }},
            resolve: lodash.assign(baseResolve, {
                subTitle: ['$stateParams', function($stateParams) {
                    if ($stateParams.id) {
                        this.data.subTitle = 'ELD (' + $stateParams.type.replace('-', ' ') + ')';
                    }
                    return this.data.subTitle;
                }]
            })
        })



}]);