var locationManager;
var beaconRegion;

var bstrap = ons.bootstrap('my-app', ['onsen']);
ons.ready(function(){
    console.log('Received Event: deviceready');
    if (ons.platform.isIOS7above || ons.platform.isAndroid) {beaconSetup();}
});


var onSuccessGPS = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
var onErrorGPS = function (error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

var checkPosition = function() {
    navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
};


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

    // required in iOS 8+
    locationManager.requestWhenInUseAuthorization();
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    locationManager.startMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();

    locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
};
