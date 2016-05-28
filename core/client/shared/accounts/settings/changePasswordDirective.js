'use strict';

angular.module(Constants.Module).directive('changePassword', ['utils', function (utils) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)

		},
		templateUrl: 'core/client/shared/accounts/settings/changePasswordView.ng.html',
		controller: function ($scope) {

		},
		link: function ($scope, element, attrs, ctrl) {
			$scope.cp = {};
			$scope.setPassword = function(obj) {
				var validation = $scope.validate(obj);
				if (!validation.success) {
					utils.toast('Password Changed Error: ' + validation.msg, utils.TOAST_TYPE.FAIL);
					return false;
				}
				Accounts.changePassword(obj.oldPassword, obj.newPassword, function(err) {
					if (!err) {
						utils.toast('Password Changed', utils.TOAST_TYPE.SUCCESS);
					} else {
						utils.toast('Password Changed Error: ' + err.msg, utils.TOAST_TYPE.FAIL);
					}
				});
			}
			$scope.validate = function(obj) {
				var result = {
					success: true,
					msg: ''
				};
				if (!obj) {
					result.success = false;
					result.msg = 'Object not initialized';
				};
				if (!obj.newPassword) {
					result.success = false;
					result.msg = 'New Password Not set';
				}
				if (obj.newPassword != obj.confirmPassword) {
					result.success = false;
					result.msg = 'New Password & Confirm Password Doesn\'t match';
				}

				return result;
			}
		}
	}
}]);