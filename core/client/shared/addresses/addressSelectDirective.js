//'use strict';
//
//angular.module(Constants.Module).directive('addressSelect', ['$compile', 'settings', '$log', '$mdMedia', '$mdDialog', 'uiGmapGoogleMapApi', '$q', function ($compile, settings, $log, $mdMedia, $mdDialog, uiGmapGoogleMapApi, $q) {
//	return {
//		restrict: 'E', // E = element, A = attribute, C = class, M = comment
//		scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
//		    'ngModel': '=',
//            'onSelectedItemChange': '&',
//            'onSearchTextChange': '&',
//            'disabled': '='
//		},
//		templateUrl: 'core/client/shared/addresses/addressSelectView.ng.html',
//		controller: function ($scope) {
//
//	},
//		link: function ($scope, element, attrs, ctrl) {
//
//			var formatter = function(val) {
//				$log.info('formatter', val);
//			}
//			//setInterval(function() {
//			//	$log.info('ctrl', ctrl, attrs);
//			//}, 1000);
//			//ctrl.$formatters.unshift(formatter);
//
//		    // material form ele: https://material.angularjs.org/latest/demo/input, https://material.angularjs.org/latest/demo/autocomplete
//		    $scope.isDisabled = attrs.disabled == 'true';
//		    $scope.querySearch = querySearch;
//		    $scope.selectedItemChange = selectedItemChange;
//		    $scope.searchTextChange = searchTextChange;
//
//		    var geocoder = null;
//
//		    uiGmapGoogleMapApi.then(function (maps) {
//		        geocoder = new google.maps.Geocoder();
//		    });
//
//		    function createFilterFor(query) {
//		        var lowercaseQuery = angular.lowercase(query);
//		        return function filterFn(item) {
//		            return (item.value.indexOf(lowercaseQuery) === 0);
//		        };
//		    }
//
//		    function querySearch(query) {
//                var dfd = $q.defer();
//		        if (geocoder) {
//		            geocoder.geocode({ 'address': query }, function (results, status) {
//		                //console.log.log('geocode', status, results);
//
//		                var formattedResult = $.map(results, function (val, i) {
//                            var obj = {
//								text: val.formatted_address,
//								lat: val.geometry.location.lat(),
//								lng: val.geometry.location.lng(),
//
//							};
//
//							_.each(val.address_components, function(v, ind) {
//								if (v.types.indexOf('postal_code') != -1) {
//									obj.postalCode = v.long_name;
//								} else if (v.types.indexOf('country') != -1) {
//									obj.country = v.long_name;
//								} else if (v.types.indexOf('administrative_area_level_1') != -1) {
//									obj.state = v.long_name;
//								} else if (v.types.indexOf('locality') != -1) {
//									obj.city = v.long_name;
//								} else if (v.types.indexOf('sublocality') != -1) {
//									obj.district = v.long_name;
//								} else if (v.types.indexOf('neighborhood') != -1) {
//									obj.neighborhood = v.long_name;
//								} else if (v.types.indexOf('route') != -1) {
//									obj.streetName = v.long_name;
//								} else if (v.types.indexOf('street_number') != -1) {
//									obj.streetNumber = v.long_name;
//								}
//							});
//
//							return obj;
//		                });
//
//		                dfd.resolve(formattedResult);
//		            });
//		        }
//
//		        return dfd.promise;
//
//		        //var results = query ? $scope.itemList.filter(createFilterFor(query)) : $scope.itemList,
//                //    deferred;
//
//                //return results;
//		    }
//		    function searchTextChange(text) {
//		        $log.info('Text changed to ' + text);
//		        //$scope.ngModel = { Text: text };
//
//                //console.log.log($scope);
//                $scope.onSearchTextChange({ text: text });
//		    }
//		    function selectedItemChange(item) {
//		        $log.info('Item changed to ' + JSON.stringify(item));
//		        if (item) {
//		            $scope.ngModel = item;
//		        }
//		        if ($scope.onSelectedItemChange) $scope.onSelectedItemChange({ item: item });
//
//		    }
//
//		}
//	}
//}]);