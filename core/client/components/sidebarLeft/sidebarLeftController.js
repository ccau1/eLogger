angular.module(Constants.Module).controller('SidebarLeftController', ['$scope', '$state', function ($scope, $state) {
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
                    }
                },
                {
                    title: 'Documents',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('documents');
                    }
                },
                {
                    title: 'Account',
                    subtitle: '',
                    desc: '',
                    onClick: function() {
                        $state.go('settings');
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