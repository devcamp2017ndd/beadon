bstrap.controller('TimelineController', function($scope, $interval, BeaconTimelineService) {
    var timeoutId;

    $scope.beacon = app.beacon;

    $scope.toots = [];

    var successCallback = function(data) {
        $scope.toots = data;
    };
    var successAppendCallback = function(data) {
        $scope.toots = data.concat($scope.toots);
    };
    var errorCallback = function(msg) {
        $scope.alert = {msg: msg};
    };
    BeaconTimelineService.init(app.beacon)
    .then(successCallback, errorCallback);


    $scope.startInterval = function() {
        if ( angular.isDefined(timeoutId) ) { return; }
        console.log("startInterval");
        
        timeoutId = $interval(function() {
            BeaconTimelineService.append(app.beacon, $scope.toots[0].id)
            .then(successAppendCallback, errorCallback);

        }, 1000);
    };

    $scope.$on('$destroy', function() {
        if (angular.isDefined(timeoutId)) {
            $interval.cancel(timeoutId);
            timeoutId = undefined;
        }
    });

    ons.ready(function(){
        $scope.startInterval();
    });
});

bstrap.factory('BeaconTimelineService', function($q, $http){
    var returnReq = function(beacon, toot_id) {
        var req = {
            method: 'GET',
            url: beacon.beadonURL + '/api/v1/timelines/public?limit=10',
            headers: {
                Authorization: 'Bearer ' + beacon.accessToken
            }
        };
        if (toot_id) {
            req.url = req.url + "&since_id=" + (toot_id);
        }
        return req;
    };
    return {
        init: function(beacon) {
            var req = returnReq(beacon);
            var deferred = $q.defer();
            $http(req)
            .then(function (response) {
                console.log("status:" + response.status);
                deferred.resolve(response.data);                
            })
            .catch(function(response) {
                console.log("status:" + response.status);
                console.error('Error occurred:', response.status, response.data);
                deferred.reject('Error occurred:', response.status, response.data);
            });
            return deferred.promise;
        },
        append: function(beacon, toot_id) {
            var req = returnReq(beacon, toot_id);
            var deferred = $q.defer();
            $http(req)
            .then(function (response) {
                console.log("status:" + response.status);
                deferred.resolve(response.data);                
            })
            .catch(function(response) {
                console.log("status:" + response.status);
                console.error('Error occurred:', response.status, response.data);
                deferred.reject('Error occurred:', response.status, response.data);
            });
            return deferred.promise;
        }
    };
});