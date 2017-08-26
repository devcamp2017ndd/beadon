bstrap.controller('MenuController',function($scope, AuthService){

    $scope.onClickMenuMemory = function(){
        navi.bringPageTop('pages/memory/memory.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuAccsess = function(){
        navi.bringPageTop('pages/access/access.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuLog = function(){
        navi.bringPageTop('pages/log/log.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuInfo = function(){
        navi.bringPageTop('pages/info/info.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuSetting = function(){
        navi.bringPageTop('pages/setting/setting.html', {animation:"fade"});
        menu.closeMenu();
    }

    $scope.onClickMenuLogout = function(){
        AuthService.logout();
        navi.resetToPage('pages/login.html', {animation:"slide"});
        menu.closeMenu();
        if (!app.locationManager) { return; }
        app.locationManager.stopRangingBeaconsInRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();

        app.locationManager.stopMonitoringForRegion(app.beaconRegion)
            .fail(function(e) { console.error(e); })
            .done();
    }

});
