var locationManager;
var beaconRegion;

var bstrap = ons.bootstrap('my-app', ['onsen']);
ons.ready(function(){
    console.log('Received Event: deviceready');
    if (ons.platform.isIOS7above || ons.platform.isAndroid) {beaconSetup();}
});

var beaconSetup = function() {
    locationManager = cordova.plugins.locationManager;
    var delegate = new locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {
        console.log('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

        locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    };

    var uuid ='bec77a36-12c8-4871-aef9-31677f810d1e';
    var identifier = 'beacon_of_devcamp2017ndd';
    var major = 1000;
    var minor = 20;

    beaconRegion = new locationManager.BeaconRegion(identifier, uuid);

    locationManager.setDelegate(delegate);

};
