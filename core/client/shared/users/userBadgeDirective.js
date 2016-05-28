'use strict';

angular.module(Constants.Module).directive('userBadge', ['$reactive', function ($reactive) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '='
		},
		templateUrl: 'core/client/shared/users/userBadgeView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);

			$scope.getRoleIcon = function(roles) {
				var icon = undefined;
				lodash.each(roles, function(v) {
					switch (v) {
						case Constants.Roles.DRIVER:
							icon = 'local_shipping';
							break;
						case Constants.Roles.ASC:
							icon = 'record_voice_over';
							break;
						case Constants.Roles.ELC:
							icon = 'device_hub';
							break;
						case Constants.Roles.TOW_COMPANY:
							icon = 'router';
							break;
						//default:
						//	return 'account_circle';
					}
					if (icon) return false;
				});
				if (!icon) icon = 'account_circle';
				return icon;
			}

			$scope.sub_user = $scope.subscribe('users', function () {
				if ($scope.sub_user) $scope.sub_user.stop();
				if (!$scope.getReactively('ngModel')) return [{ _id: 0 }];
				var userId = lodash.isString($scope.getReactively('ngModel')) ? $scope.getReactively('ngModel') : $scope.getReactively('ngModel')._id;
				return [{_id: userId }];
			}, {
				onReady: function () {
				}
			});

			$scope.helpers({
				user: function() {
					var userId = $scope.getReactively('ngModel');
					if (userId && !lodash.isString(userId)) {
						userId = $scope.ngModel._id;
					}
					return Meteor.users.findOne({ _id: userId });
				}
			});
		},
		link: function ($scope, element, attrs) {

		}
	}
}]);