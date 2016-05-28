angular.module(Constants.Module).factory('utils', ['$rootScope', '$mdDialog', '$mdMedia', '$mdToast', function($rootScope, $mdDialog, $mdMedia, $mdToast) {

    var dialog = function(ev, templateUrl, controller, data, options) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $rootScope.dialogFullscreen;

        if ($rootScope.dialogFullscreen == undefined) {
            $rootScope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $rootScope.dialogFullscreen = (wantsFullScreen === true);
            });
        }

        var opts = {
            controller: controller,
            templateUrl: templateUrl || 'DialogFormController',
            parent: angular.element(document.body),
            targetEvent: ev ? ev : angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            locals: {
                data: data
            }
        };
        if (options) $.extend(true, opts, options);

        return $mdDialog.show(opts);
    };

    var toast = function(content, type) {
        if (!type) type = 0;

        var t = $mdToast.simple()
            .textContent(content)
            .position('top right')
            .hideDelay(3000);

        switch (type) {
            case 0:
                // success
                break;
            case 1:
                // error
                t.theme('error-toast');
                break;
        }

        $mdToast.show(t);
    }

    var toastTypes = {
        SUCCESS: 0,
        FAIL: 1
    };

    return {
        dialog: dialog,
        toast: toast,
        TOAST_TYPE: toastTypes
    }
}]);