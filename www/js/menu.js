bstrap.controller('menu',function($scope){

    $scope.onClickMenuMemory = function(){
        navi.pushPage('pages/memory/memory.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuAccsess = function(){
        navi.pushPage('pages/access/access.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuLog = function(){
        navi.pushPage('pages/log/log.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuInfo = function(){
        navi.pushPage('pages/info/info.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuSetting = function(){
        navi.pushPage('pages/setting/setting.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuLogin = function(){
        navi.pushPage('pages/login.html', {animation:"slide"});
        if (locationManager) {
            locationManager.stopRangingBeaconsInRegion(beaconRegion)
                .fail(function(e) { console.error(e); })
                .done();

            locationManager.stopMonitoringForRegion(beaconRegion)
                .fail(function(e) { console.error(e); })
                .done();
        }
        menu.closeMenu();
    }

});
