var app = {
    locationManager: null,
    beaconRegion: null,
    uuid: 'bec77a36-12c8-4871-aef9-31677f810d1e',
    identifier: 'beacon_of_devcamp2017ndd',
    major: 1000,
    minor: 20
};

var bstrap = ons.bootstrap('my-app', ['onsen']);

// var beaconSetup = function(_scope) {
//     try {
//         app.locationManager = cordova.plugins.locationManager;
//     } catch(e) {
//         console.error(e);
//         return false;
//     }

//     var delegate = new app.locationManager.Delegate();

//     var _time = Date.now();
//     delegate.didRangeBeaconsInRegion = function (pluginResult) {
//         // console.log('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
//         console.log("hogehoge:" + JSON.stringify(pluginResult.beacons));
//         if (Date.now() - _time > 5000) {
//             document.getElementById("beacon").innerHTML = JSON.stringify(pluginResult.beacons);
//             _time = Date.now();
//         }
//     };

//     app.beaconRegion = new app.locationManager.BeaconRegion(app.identifier, app.uuid);

//     app.locationManager.setDelegate(delegate);

//     app.locationManager.startRangingBeaconsInRegion(app.beaconRegion)
//         .fail(function(e) { console.error(e); })
//         .done();

//     return true;
// };
