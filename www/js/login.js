bstrap.controller('LoginController',function($scope){
        
        ons.ready(function() {
            ons.createDialog('pages/dialog/testDia.html').then(function(dialog) {
                dialog.show();
            });
        });
        
        $scope.onClickLogin = function(){
          navi.pushPage('pages/memorys/memorys.html', {animation:'lift'});
        }
        
}); 