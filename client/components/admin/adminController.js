angular.module(Constants.Module).controller('AdminController', ['$mdMedia', '$scope', '$state', function($mdMedia, $scope, $state) {
    $scope.settings = {
        curView: ''
    };
    $scope.showRegion = function(view) {
        if (view == 'menu') {
            return !$state.current.views.admin || $mdMedia('gt-sm');
        } else if (view == 'content') {
            return $state.current.views.admin || $mdMedia('gt-sm');
        }
    }

    console.log('$state.current', $state.current.data);

    $scope.menuSections = [
        {
            header: '',
            items: [
                {
                    title: 'Company',
                    subtitle: '',
                    desc: '',
                    onClick: function () {
                        $state.go('admin.company');
                    }
                },
                {
                    title: 'Vehicles',
                    subtitle: '',
                    desc: '',
                    onClick: function () {
                        $state.go('admin.vehicles');
                    }
                }
            ]
        }
    ];
}]);