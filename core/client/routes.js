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
        .state('settings', {
            url: "/settings",
            views: {
                'main': {
                    templateUrl: "core/client/components/settings/settingsView.ng.html",
                    controller: "SettingsController"
                }
            },
            data: {pageTitle: 'Settings'},
            resolve: lodash.assign(baseResolve, {})
        })
        .state('settings.theme', {
            url: "/theme",
            views: {
                'main': {},
                'settings': {
                    templateUrl: "core/client/components/settings/themeSettingsView.ng.html",
                    controller: "ThemeSettingsController"
                }
            },
            data: {subTitle: 'Theme'},
            resolve: lodash.assign(baseResolve, {})
        })
        .state('settings.account', {
            url: "/account",
            views: {
                'main': {},
                'settings': {
                    templateUrl: "client/components/settings/accountSettingsView.ng.html",
                    controller: "AccountSettingsController"
                }
            },
            data: {subTitle: 'Account'},
            resolve: lodash.assign(baseResolve, {})
        })
        .state('settings.userInfo', {
            url: "/user-information",
            views: {
                'main': {},
                'settings': {
                    templateUrl: "core/client/components/settings/userInfoSettingsView.ng.html",
                    controller: "UserInfoSettingsController"
                }
            },
            data: {subTitle: 'User Information'},
            resolve: lodash.assign(baseResolve, {})
        })






        .state('login', {
            url: "/login",
            views: {
                'account': {
                    templateUrl: 'core/client/components/account/loginView.ng.html',
                    controller: "LoginController"
                }
            },
            data: {pageTitle: 'Login'},//, pageSubTitle: 'statistics & reports'},
        })
        .state('register', {
            url: "/register",
            views: {
                'account': {
                    templateUrl: 'core/client/components/account/registerView.ng.html',
                    controller: "RegisterController"
                }
            },
            data: {pageTitle: 'Register'},//, pageSubTitle: 'statistics & reports'},
        })
        .state('resetpw', {
            url: "/reset-password",
            views: {
                'account': {
                    templateUrl: 'core/client/components/account/resetPasswordView.ng.html',
                    controller: "ResetPasswordController"
                }
            },
            data: {pageTitle: 'Reset Password'},//, pageSubTitle: 'statistics & reports'},
        })



}]);