//import angular from 'angular';
import angularMeteor from 'angular-meteor';
import '/lib/Constants.js';
//import angularGoogleMaps from 'angular-google-maps';

mainApp = angular.module(Constants.Module, [
    angularMeteor,
    //"angular-meteor",
    "ui.router",
    "ngMaterial",
    "ngFileUpload",
    'ngImgCrop',
    //angularGoogleMaps,
    //"uiGmapgoogle-maps",
]);
//
//mainApp.config(['uiGmapGoogleMapApiProvider', '$mdThemingProvider', function (uiGmapGoogleMapApiProvider, $mdThemingProvider) {
//
//}]);

/* Setup global settings */
mainApp.provider('settings', function () {
    // supported languages
    var settings = {
        theme: 'theme-light',
        $get: function () {
            return settings;
        }
    };

    return settings;
});

mainApp.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('login');
        }
    });
});

mainApp.controller('AppController', ['$scope', '$state', function($scope, $state) {
    $scope.$state = $state;
}]);

