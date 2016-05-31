import '/lib/Constants.js';

angular.module(Constants.Module).config(['$stateProvider', '$urlRouterProvider', 'settingsProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, settingsProvider, $locationProvider) {


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

    // Dashboard
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

}]);