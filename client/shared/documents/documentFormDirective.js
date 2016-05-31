'use strict';

angular.module(Constants.Module).directive('documentForm', ['user', 'utils', function (user, utils) {
    return {
        restrict: 'E', // E = element, A = attribute, C = class, M = comment
        scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'document': '=ngModel',
            'ngDisabled': '=',
            'onChange': '&?'
        },
        templateUrl: 'client/shared/documents/documentFormView.ng.html',
        controller: function ($scope) {
            $scope.modelOptions = {
                updateOn: 'default blur',
                debounce: {
                    default: 500,
                    blur: 0
                }
            };
        },
        link: function ($scope, element, attrs) {

            $scope.fileUploaded = function(action, items) {
                if (items.length) {
                    $scope.document.file = items[0];
                }
            };

            $scope.submitForm = function() {
                console.log('submit', $scope.document);
                Meteor.call('addDocument', $scope.document, function(err) {
                    if (!err) {
                        utils.toast('Document Added', utils.TOAST_TYPE.SUCCESS);
                    } else {
                        utils.toast('Document Add Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                    }
                });
            };

            $scope.$watch('document', function(newVal, oldVal) {
                if (oldVal != undefined && newVal._id && oldVal._id && newVal != oldVal) {
                    // update doc
                    Meteor.call('updateDocument', $scope.document, function(err) {
                        if (!err) {
                            utils.toast('Document Updated', utils.TOAST_TYPE.SUCCESS);
                        } else {
                            utils.toast('Document Update Error: ' + err.reason, utils.TOAST_TYPE.FAIL);
                        }
                    });
                }
            }, true);
        }
    }
}]);