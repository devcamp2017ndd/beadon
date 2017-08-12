bstrap.controller('LoginController',function($scope){
    $scope.onClickLogin = function(){
        navi.pushPage('pages/memory/memory.html', {animation:'lift'});
        if (!locationManager) { return; }

        locationManager.requestWhenInUseAuthorization();
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()
    
        locationManager.startMonitoringForRegion(beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
    
        locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();

    }
});