'use strict';

angular.module(Constants.Module).directive('addressMap', ['$compile', 'settings', '$log', '$mdMedia', '$mdDialog', 'leafletData', 'leafletBoundsHelpers', function ($compile, settings, $log, $mdMedia, $mdDialog, leafletData, leafletBoundsHelpers) {
    return {
        restrict: 'E', // E = element, A = attribute, C = class, M = comment
        scope: { // @ = local scope (string), = = bi-directional binding, & = parent execution binding (function)
            'addr': '=ngModel'
        },
        templateUrl: 'core/client/shared/addresses/addressMapView.ng.html',
        controller: function ($scope) {


            leafletData.getMap().then(function(map) {
                //L.GeoIP.centerMapOnPosition(map, 15);
                $log.info('map', map);
                setTimeout(function() {
                    $log.info('updating map');
                    map.invalidateSize();
                }, 600);
            });

            var tilesDict = {
                openstreetmap: {
                    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    options: {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                opencyclemap: {
                    url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    options: {
                        attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                    }
                },
                openMapSurfer_Roads: {
                    name: 'openMapSurfer_Roads',
                    url: 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
                    type: 'xyz',
                    options: {
                        //apikey: '',
                        //mapid: '',
                        attribution: 'nothing'
                    }
                },
                mapbox_outdoors: {
                    name: 'Mapbox Outdoors',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    options: {
                        apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                        mapid: 'bufanuvols.lia3no0m'
                    }
                },
                mapbox_wheat: {
                    name: 'Mapbox Wheat Paste',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    options: {
                        apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                        mapid: 'bufanuvols.lia35jfp'
                    }
                }
            };

            // TILES: http://leaflet-extras.github.io/leaflet-providers/preview/
            angular.extend($scope, {
                center: {
                    lat: $scope.addr.lat,
                    lng: $scope.addr.lng,
                    zoom: 12
                },
                bounds: {
                    addrMarker : {
                        lat: $scope.addr.lat,
                        lng: $scope.addr.lng
                    }
                },
                //bounds: leafletBoundsHelpers.createBoundsFromArray([
                //    [ $scope.addr.lat, $scope.addr.lng ]
                //]),
                markers: {
                    addrMarker: {
                        lat: $scope.addr.lat,
                        lng: $scope.addr.lng,
                        message: $scope.addr.text,
                        focus: true,
                        draggable: false
                    }
                },
                layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        mapbox_light: {
                            name: 'Mapbox Light',
                            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                            type: 'xyz',
                            layerOptions: {
                                apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                                mapid: 'bufanuvols.lia22g09'
                            }
                        }
                    }
                },
                defaults: {
                    tileLayer: 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
                    maxZoom: 19,
                    path: {
                        weight: 10,
                        color: '#800000',
                        opacity: 1
                    },
                    scrollWheelZoom: true
                }
            });

            $scope.$watch('center.zoom', function(zoom) {
                $log.info('mapZoom', zoom);
            });
        },
        link: function ($scope, element, attrs, ctrl) {
        }
    };
}]);