bstrap.controller('MenuController',function($scope){

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

    $scope.onClickMenuLogout = function(){
        navi.resetToPage('pages/login.html', {animation:"slide"});
        menu.closeMenu();
        if (app.locationManager) { return; }
        app.locationManager.stopRangingBeaconsInRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();

        app.locationManager.stopMonitoringForRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
    }

});
