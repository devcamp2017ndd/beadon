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
    $scope.beacons = [];

    $scope.isActiveBLE = function(){
        return app.demo ? true : app.locationManager;
    };

    $scope.detected = function() {
        return $scope.beacons.length > 0;
    }

    $scope.startInterval = function() {
        if ( angular.isDefined(app.stop) ) { return; }
        console.log("startInterval");
        
        app.stop = $interval(function() {
            console.log("beacons:" + JSON.stringify(_beacons) + Date.now());
            $scope.beacons = _beacons;
        }, 2000);
    };

    $scope.$on('$destroy', function() {
        if (angular.isDefined(app.stop)) {
            $interval.cancel(app.stop);
            app.stop = undefined;
        }
    });

    var setUp = function() {
        try {
            app.locationManager = cordova.plugins.locationManager;
            if (!app.locationManager) {
                ons.notification.alert("Please Turn on Bluetooth");
                return;
            }
            var delegate = new app.locationManager.Delegate();
        } catch(e) {
            console.error(e);
            return;
        }
        
        var _time = Date.now();
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
