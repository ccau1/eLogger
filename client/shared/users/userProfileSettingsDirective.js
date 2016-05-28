'use strict';

angular.module(Constants.Module).directive('userProfileSettings', ['user', 'utils', function (user, utils) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '='
		},
		templateUrl: 'client/shared/users/userProfileSettingsView.ng.html',
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
			$scope.genders = ['Male', 'Female'];

			user.onReady(function() {
				$scope.user = JSON.parse(JSON.stringify(user.currentUser));
				setTimeout(function() {
					$scope.$digest();
				});
			});

			$scope.$watch('user.profile', function(newVal, oldVal) {
				if (newVal != oldVal && oldVal != undefined) {
					Meteor.call('updateUserProfile', $scope.user, function(err) {
						if (!err) {
							utils.toast('Additional Information Updated', utils.TOAST_TYPE.SUCCESS);
							user.currentUser.profile = newVal;
						} else {
							utils.toast('Additional Information Update Error: ' + err.message, utils.TOAST_TYPE.FAIL);
						}
					});
				}
			}, true);
		}
	}
}]);