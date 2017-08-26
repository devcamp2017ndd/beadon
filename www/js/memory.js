bstrap.controller('MemoryController', function($scope, $interval, BeaconSearchService){
    var _beacons = app.demo ? [{
            uuid: app.uuid,
            major: 100,
            minor: 10,
            beadonName: 'hoge'
        },
        {
            uuid: app.uuid,
            major: 100,
            minor: 20,
            beadonName: 'piyo'
        }] : [];
    var timeoutId;

    $scope.beacons = [];

    $scope.isActiveBLE = function(){
        return app.demo ? true : app.locationManager;
    };

    $scope.detected = function() {
        return $scope.beacons.length > 0;
    };

    $scope.selectBeacon = function(index) {
        app.beacon = $scope.beacons[index];
        console.log(index);
        // beaconをpostしてURLを取得する。
        navi.pushPage('pages/memory/tabbar.html', {animation:'lift'});
    };

    var successCallback = function(beacons) {
        $scope.beacons = beacons;
    };
    $scope.startInterval = function() {
        if ( angular.isDefined(timeoutId) ) { return; }
        console.log("startInterval");
        
        timeoutId = $interval(function() {
            // console.log("beacons:" + JSON.stringify(_beacons));
            // $scope.beacons = _beacons;
            BeaconSearchService.find($scope, _beacons)
            .then(successCallback);
        }, 5000);
    };

    $scope.$on('$destroy', function() {
        if (angular.isDefined(timeoutId)) {
            $interval.cancel(timeoutId);
            timeoutId = undefined;
        }
    });

    $scope.$watch("_visibleTabber");

    var setUp = function() {
        try {
            app.locationManager = cordova.plugins.locationManager;
            if (!app.locationManager) {
                console.error("Can not find Bluetooth device");
                return;
            }
            var delegate = new app.locationManager.Delegate();
        } catch(e) {
            console.error(e);
            return;
        }
        
        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            _beacons = pluginResult.beacons;
        };
        
        app.beaconRegion = new app.locationManager.BeaconRegion(app.identifier, app.uuid);
        
        app.locationManager.setDelegate(delegate);
        
        app.locationManager.startRangingBeaconsInRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
    };
    
    ons.ready(function(){
        if (!app.demo) { setUp(); }
        $scope.startInterval();
    });

});

bstrap.factory('BeaconSearchService', function(AuthService, $q, $http){
    return {
        find: function($scope, beacons){
            var _user = AuthService.getUser();
            var req = {
                method: 'POST',
                url: app.api_gateway + '/getbeadon-json',
                data: {
                    id: _user.id, 
                    'auth-key': _user.authkey, 
                    beacons: beacons
                }
            };
            var deferred = $q.defer();

            $http(req)
            .then(function (response) {
                console.log("status:" + response.status);
                // console.log(response.data);
                var beacons = [];
                angular.forEach(response.data.beacons, function(beacon){
                    console.log(beacon)
                    if (beacon.beadonURL) {
                        beacons.push(beacon);
                    }
                });
                deferred.resolve(beacons);
            })
            .catch(function(response) {
                console.log("status:" + response.status);
                console.error('Error occurred:', response.status, response.data);
                deffered.reject();
            });
            return deferred.promise;
        }
    };
});