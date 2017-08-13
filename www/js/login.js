bstrap.controller('LoginController',function($scope){
    $scope.onClickLogin = function(){
        console.log("login.js: onClickLogin");
        navi.pushPage('pages/memory/memory.html', {animation:'lift'});
    }
});