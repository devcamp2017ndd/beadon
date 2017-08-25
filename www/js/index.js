var app = {
    locationManager: null,
    beaconRegion: null,
    uuid: 'bec77a36-12c8-4871-aef9-31677f810d1e',
    identifier: 'beacon_of_devcamp2017ndd',
    major: 1000,
    minor: 20,
    demo: true,
    api_gateway: 'https://79moqwl5cl.execute-api.ap-northeast-1.amazonaws.com/DevCamp2017NDD',
    mstdn_url: null
};

var bstrap = ons.bootstrap('my-app', ["ngRoute", "ngResource", 'onsen']);