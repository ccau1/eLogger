angular.module(Constants.Module).controller('SidebarLeftController', ['$scope', '$state', '$mdSidenav', function ($scope, $state, $mdSidenav) {
    $scope.$on('$includeContentLoaded', function () {
        //Layout.initSidebar(); // init sidebar
    });

    $scope.menuSections = [
        {
            header: '',
            items: [
                {
                    title: 'Admin',
                    subtitle: '',
                    desc: 'Management Center',
                    onClick: function() {
                        $state.go('admin');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'Documents',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('documents');
                        $mdSidenav('left').close();
                    }
                },
                {
                    title: 'Account',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('settings');
                        $mdSidenav('left').close();
                    }
                },

            ]
        }
    ];

    $scope.logout = function() {
        Accounts.logout();
        $state.go('login');
    }
}]);