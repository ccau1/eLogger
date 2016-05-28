'use strict';

angular.module(Constants.Module).directive('userAvatarForm', ['$reactive', 'user', 'fileUpload', 'Upload', function ($reactive, user, fileUpload, Upload) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '=',
			'onSubmit': '&'
		},
		templateUrl: 'core/client/shared/users/userAvatarFormView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);

			user.onReady(function() {

			});
		},
		link: function ($scope, element, attrs) {

			$scope.upload = function (dataUrl, name) {
				$scope.picFile.blobUrl = dataUrl;
				fileUpload.add($scope.picFile).done(function(obj) {
					if (user.currentUser.profile.avatar) {
						Uploads.remove(user.currentUser.profile.avatar.uploadId);
					}
					Meteor.users.update({ _id: user.currentUser._id }, { $set: { 'profile.avatar': obj } });

					$scope.onSubmit({ type: 'add', obj: obj });
				});
			}
		}
	}
}]);