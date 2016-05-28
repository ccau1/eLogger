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
            data: {pageTitle: 'Overview'},
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
        .state('projectCreate', {
            url: "/projects/create",
            views: {
                'main': {
                    templateUrl: "client/components/projects/projectCreateView.ng.html",
                    controller: "ProjectCreateController"
                }
            },
            data: {pageTitle: 'Create a Project'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('projectSearch', {
            url: "/projects/search",
            views: {
                'main': {
                    templateUrl: "client/components/projects/projectSearchView.ng.html",
                    controller: "ProjectSearchController"
                }
            },
            data: {pageTitle: 'Search Available Projects'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('projects', {
            url: "/projects",
            views: {
                'main': {
                    templateUrl: "client/components/projects/projectsView.ng.html",
                    controller: "ProjectsController"
                }
            },
            data: {pageTitle: 'My Projects'},
            resolve: lodash.assign(baseResolve, {

            })
        })
        .state('projectDetail', {
            url: "/projects/:id",
            views: {
                'main': {
                    templateUrl: "client/components/projects/projectDetailView.ng.html",
                    controller: "ProjectDetailController"
                }
            },
            data: {pageTitle: 'My Projects'},
            resolve: lodash.assign(baseResolve, {

            })
        })

}]);