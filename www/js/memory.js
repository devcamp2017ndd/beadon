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
        console.log("sssssssssss");
        console.log(app.stop);
        if ( angular.isDefined(app.stop) ) { return; }
        
        app.stop = $interval(function() {
            console.log("hogehoge:" + JSON.stringify($scope.beacons));
            if (!$scope._detected) {
                $scope.stopInterval();
            }
        }, 2000);
    };

    $scope.stopInterval = function() {
        if (angular.isDefined(app.stop)) {
          $interval.cancel(app.stop);
          app.stop = undefined;
        }
    };

    $scope.$on('$destroy', function() {
        $scope.stopInterval();
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
            // console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
            // if (Date.now() - _time > 5000 && pluginResult.beacons.length) {
            //     console.log("hogehoge:" + JSON.stringify(pluginResult.beacons));
            //     $scope.beacons = pluginResult.beacons;
            //     // document.getElementById("beacon").innerHTML = JSON.stringify(pluginResult.beacons);
            //     $scope._detected= true;
            //     _time = Date.now();
            // }
            if (pluginResult.beacons.length) {
                $scope._detected = true;
            }
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
