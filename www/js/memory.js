bstrap.controller('MemoryController', function($scope, $interval){
    var _beacons = app.demo ? [{
            uuid: app.uuid,
            major: 2000,
            minor: 10
        },
        {
            uuid: app.uuid,
            major: 2000,
            minor: 20
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

    $scope.startInterval = function() {
        if ( angular.isDefined(timeoutId) ) { return; }
        console.log("startInterval");
        
        timeoutId = $interval(function() {
            console.log("beacons:" + JSON.stringify(_beacons));
            $scope.beacons = _beacons;
        }, 2000);
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
