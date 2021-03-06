bstrap.controller('LoginController',function($scope, $location, AuthService){
    $scope.onClickLogin = function(){
        console.log("login.js: onClickLogin");
        AuthService.login($scope, $scope.id, $scope.password);
    };

    $scope.checkInput = function() {
        return ($scope.id && $scope.password);
    }
});

bstrap.config(function($routeProvider){
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
            var transform = function(data){
                var res = [];
                Object.keys(data).forEach(function(key){
                    res.push([key,data[key]].join("="));
                })
                return res.join("&");
            };
            var req = {
                method: 'POST',
                url: 'https://79moqwl5cl.execute-api.ap-northeast-1.amazonaws.com/DevCamp2017NDD/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
                },
                transformRequest: transform,
                data: {id: username, pass: password}
            };
            var deferred = $q.defer();

            $http(req)
            .then(function (response) {
                console.log("status:" + response.status);
                console.log(response.data);
                if (response.data["auth-key"]) {
                    _user = response.data["auth-key"];
                    $scope.navi.pushPage('pages/memory/memory.html', {animation:'lift'});
                }
                else {
                    $scope.password = "";
                    $scope.alert = {msg: "Login failed."};
                }
            })
            .catch(function(response) {
                console.log("status:" + response.status);
                console.error('Error occurred:', response.status, response.data);
            })
            .finally(function(){
                deffered.resolve();
            });
            console.log("hhhh");
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
