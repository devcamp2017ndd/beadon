bstrap.controller('MemoryController', function($scope, $interval){
    $scope.beacons = [];
    $scope._detected = false;

    $scope.isActiveBLE = function(){
        return app.locationManager;
    };

    $scope.detected = function() {
        return $scope._detected;
    }

    $scope.startInterval = function() {
        if ( angular.isDefined(app.stop) ) { return; }
        console.log("startInterval");
        
        app.stop = $interval(function() {
            console.log("beacons:" + JSON.stringify($scope.beacons));
        }, 2000);
    };

    $scope.$on('$destroy', function() {
        if (angular.isDefined(app.stop)) {
            $interval.cancel(app.stop);
            app.stop = undefined;
        }
    });

    ons.ready(function(){
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
            $scope._detected = pluginResult.beacons.length ? true : false;
            $scope.beacons = pluginResult.beacons;
        };
    
        app.beaconRegion = new app.locationManager.BeaconRegion(app.identifier, app.uuid);
    
        app.locationManager.setDelegate(delegate);
    
        app.locationManager.startRangingBeaconsInRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
        
        $scope.startInterval();
    });
});
