/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        beaconSetup();
        //controllerSetup();
        // var gps_button = document.getElementById("gps_button");
        // gps_button.addEventListener("click", checkPosition);
    }
};


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

var logToDom = function (message) {
    // var elem = document.getElementById('logMsg');
    // elem.innerText = message;
    // var e = document.createElement('label');
    // e.innerText = message;

    // var br = document.createElement('br');
    // var br2 = document.createElement('br');
    // elem.appendChild(e);
    // elem.appendChild(br);
    // elem.appendChild(br2);
    
    // window.scrollTo(0, window.document.height);

    console.log(message);
};

var beaconSetup = function() {
    var delegate = new cordova.plugins.locationManager.Delegate();
        
    delegate.didDetermineStateForRegion = function (pluginResult) {
        logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

        cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    };

    var uuid ='bec77a36-12c8-4871-aef9-31677f810d1e';
    var identifier = 'beacon_of_devcamp2017ndd';
    var major = 1000;
    var minor = 20;
    // var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();

    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
};
