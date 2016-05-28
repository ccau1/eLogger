angular.module(Constants.Module).directive('starRating',
    function() {
        return {
            restrict: 'E', // E = element, A = attribute, C = class, M = comment
            template : '<div class="rating"><md-icon class="material-icons" ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">star_rate</md-icon></div>',
            //'<ul class="rating">'
            //+ ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            //+ '  <md-icon class="material-icons">star_rate</md-icon>'
            //+ ' </li>'
            //+ '</ul>',
            scope : { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
                ngModel : '=',
                max : '=',
                onRatingSelected : '&',
                ngDisabled: '=?'
            },
            link : function(scope, elem, attrs) {
                if (!scope.ngModel) scope.ngModel = 3;
                if (scope.max == undefined) {
                    scope.max = 5;
                }

                var updateStars = function() {
                    scope.stars = [];
                    for ( var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ngModel
                        });
                    }
                };

                scope.toggle = function(index) {
                    if (scope.ngDisabled == undefined || scope.ngDisabled === false){
                        scope.ngModel = index + 1;
                        scope.onRatingSelected({
                            rating: index + 1
                        });
                    }
                    for (var i = 0; i < index + 1; i++) {

                    }
                };

                scope.$watch('ngModel',
                    function(newVal, oldVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );

                updateStars();
            }
        };
    }
);