'use strict';

angular.module(Constants.Module).directive('filesDisplay', ['user', function (user) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'files': '=ngModel',
			'hideDetail': '=',
			'onChange': '&'
		},
		templateUrl: 'core/client/shared/files/filesDisplayView.ng.html',
		controller: function ($scope) {
		},
		link: function ($scope, element, attrs) {
			$scope.showDetails = function() {
				return !angular.isDefined($scope.hideDetail);
			}
			$scope.fileSizeText = function(size) {
				var kb = size / 1000;
				if (kb < 1000) {
					return kb + 'kb';
				} else {
					return (kb / 1000) + 'mb';
				}
			};

			$scope.allowDelete = function(ev, item) {
				var ownerUser = Meteor.users.findOne({ _id: item.owner});
				if (user.currentUser && user.currentUser._id == item.owner ||
						Roles.userIsInRole(item.owner, [Constants.Roles.ELC], 'default-group') ||
						(user.isCurrentUserInRole(Constants.Roles.TOW_COMPANY) && user.currentUser.profile.towCompanyId == ownerUser.profile.towCompanyId)) {
					return true;
				} else {
					return false;
				}
			}

			$scope.remove = function(ev, items) {
				//Uploads.remove(item.uploadId);
				lodash.each(items, function(v) {
					$scope.files.splice($scope.files.indexOf(v), 1);
				});
				$scope.onChange({ action: 'remove', items: items });
			}
		}
	}
}]);