'use strict';

angular.module(Constants.Module).directive('userList', ['$compile', 'settings', '$log', '$mdDialog', '$mdMedia', '$reactive', function ($compile, settings, $log, $mdDialog, $mdMedia, $reactive) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'ngModel': '=',
			'ngDisabled': '=',
			'roles': '=',
			'filter': '=',
			'selectedId': '='
		},
		templateUrl: 'core/client/shared/users/userListView.ng.html',
		controller: function ($scope) {
			$scope.C_roles = Constants.Roles;
			$reactive(this).attach($scope);

			$scope.$watch('roles', function(newVal) {
				if (newVal) {
					$scope._roles = newVal;
				} else {
					$scope._roles = lodash.values(Constants.Roles);
				}
			});


			$scope.$watch('selectedId', function(newVal, oldVal) {
				if (newVal && newVal != oldVal) {
					$scope.ngModel = Meteor.users.find({ _id: newVal }).fetch();
				}
			});

			$scope.subscribe('users', function() {
				var roles = $scope.getReactively('roles');
				var filter = $scope.getReactively('filter');
				if (roles.length) {
					return [{ $and: [{ 'roles.default-group': { $in: roles } }, filter] }];
				} else {
					return [filter];
				}
			});

			$scope.helpers({
				users: function() {
					return Meteor.users.find({}).fetch();
				},
				shops: function() {
					return Shops.find();
				}
			});

			$scope.selectUser = function(usr) {
				$log.info('Selected user', usr);
				$scope.ngModel = usr;
			}
		},
		link: function ($scope, element, attrs) {

		}
	}
}]);