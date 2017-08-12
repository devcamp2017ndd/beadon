bstrap.controller('LoginController',function($scope){
    $scope.onClickLogin = function(){
        navi.pushPage('pages/memory/memory.html', {animation:'lift'});
    }
});