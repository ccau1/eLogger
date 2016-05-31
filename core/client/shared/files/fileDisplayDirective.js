'use strict';

angular.module(Constants.Module).directive('fileDisplay', ['user', function (user) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'file': '=ngModel',
			'onChange': '&',
			'ngDisabled': '='
		},
		templateUrl: 'core/client/shared/files/fileDisplayView.ng.html',
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

			$scope.getFileURL = function() {
				return $scope.file.urls.original;
			}

			$scope.allowDelete = function(ev, item) {
				var ownerUser = Meteor.users.findOne({ _id: item.owner});
				if ($scope.ngDisabled) return false;
				if (user.currentUser && user.currentUser._id == item.owner) {
					return true;
				} else {
					return false;
				}
			}

			$scope.remove = function(ev, item) {
				Uploads.remove(item.uploadId);
				$scope.onChange({ action: 'remove', items: [item] });
			}
		}
	}
}]);