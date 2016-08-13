'use strict';

angular.module(Constants.Module).directive('dvirs', ['user', 'utils', 'dayLogs', '$reactive', '$mdDialog', function (user, utils, dayLogs, $reactive, $mdDialog) {
	return {
		restrict: 'E', // E = element, A = attribute, C = class, M = comment
		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
			'date': '='
		},
		templateUrl: 'client/shared/dvirs/dvirsView.ng.html',
		controller: function ($scope) {
			$reactive(this).attach($scope);

			$scope.subscribe('dvirsByDate', function() {
				console.log('dvirsByDate', $scope.getReactively('date'));
				return [$scope.getReactively('date')];
			});

			$scope.helpers({
				dvirs: function() {
					var filter = { forDate: moment($scope.getReactively('date')).startOf('day').valueOf() };

					return DVIRs.find(filter, { sort: { timestamp: -1 }});
				}
			})
		},
		link: function ($scope, element, attrs) {
			$scope.isToday = function(date) {
				return moment(date).startOf('day').valueOf() == moment($scope.date).startOf('day').valueOf();
			}


			$scope.delete = function(ev, dvir) {
				var confirm = $mdDialog.confirm()
						.title('Are you sure you want to delete this DVIR?')
						.textContent('This action cannot be undone.')
						.ariaLabel('Delete DVIR')
						.targetEvent(ev)
						.ok('Delete')
						.cancel('Cancel');
				$mdDialog.show(confirm).then(function() {
					Meteor.call('deleteDVIR', dvir._id, function(err) {

					});
				}, function() {

				});
			};

			$scope.edit = function(ev, dvir, page) {
				console.log('before edit', dvir);
				utils.dialog(ev, 'client/components/dvirs/dvirFormView.ng.html', 'DvirFormController', {
						dvir: lodash.cloneDeep(dvir),
						page: page
					}).then(function(result) {
						Meteor.call('updateDVIR', result.obj, function(err) {
							if (!err) {

							}
						})
					}, function() {

					});
			}

			$scope.addDVIR = function(ev) {
                utils.dialog(ev, 'client/components/dvirs/dvirFormView.ng.html', 'DvirFormController')
					.then(function(result) {
						result.obj.companyId = Meteor.user().profile.companyId;
						result.obj.forDate = moment($scope.date).startOf('day').valueOf();
						Meteor.call('addDVIR', result.obj, function(err) {
							if (!err) {

							}
						})
					}, function() {

					});
			}
		}
	}
}]);