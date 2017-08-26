bstrap.controller('LoginController',function($scope, AuthService){
    var successCallback = function() {
        navi.pushPage('pages/memory/memory.html', {animation:'lift'});
    };
    var errorCallback = function(msg) {
        $scope.password = "";
        $scope.alert = {msg: msg};
    };
    $scope.onClickLogin = function(){
        console.log("login.js: onClickLogin");
        AuthService.login($scope, $scope.id, $scope.password)
        .then(successCallback, errorCallback);
    };
});

bstrap.config(function($routeProvider, $httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
    $routeProvider.when('/', {template: '<h1>home</h1>', controller: function(){}});
    $routeProvider.when('/login', {templateUrl: 'pages/login.html', controller: 'LoginController'});
    $routeProvider.otherwise({redirectTo: '/'});
});

bstrap.factory('AuthService', function($q, $http){
    var _user = null;
    return {
        isLogged: function(){ return !!_user; },
        getUser: function(){ return _user; },
        login: function($scope, username, password){
            var req = {
                method: 'POST',
                url: app.api_gateway + '/login-json',
                data: {id: username, pass: password}
            };
            var deferred = $q.defer();

            $http(req)
            .then(function (response) {
                console.log("status:" + response.status);
                console.log(response.data);
                if (response.data["auth-key"]) {
                    _user = {
                        authkey: response.data["auth-key"],
                        id: username
                    };
                    deferred.resolve();
                }
                else {
                    deferred.reject("Login failed.");
                }
            })
            .catch(function(response) {
                console.log("status:" + response.status);
                console.error('Error occurred:', response.status, response.data);
                deferred.reject('Error occurred:', response.status, response.data);
            });
            return deferred.promise;
        },
        logout: function(){
            _user = null;
            return $q.all();
        }
    };
});

bstrap.run(function($rootScope, $location, $route, AuthService){
    $rootScope.$on('$routeChangeStart', function(ev, next, current){
        if (next.controller == 'LoginController')
        {
            if (AuthService.isLogged())
            {
                $location.path('/');
                $route.reload();
            }
        }
        else
        {
            if (AuthService.isLogged() == false)
            {
                $location.path('/login');
                $route.reload();
            }
        }
    });
});
