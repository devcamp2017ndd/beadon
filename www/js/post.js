
bstrap.controller('PostController',function($scope){

    $scope.postData = {
        text : "",
        picture : "",
        pictureClass : "picture-card-off",
        invalid : true
    };
   
   $scope.onBlurText = function(){
       console.log("post.js: onBlurText");
        if($scope.postData.text == "" && $scope.postData.picture == ""){
           $scope.postData.invalid = true;
        }else{
            $scope.postData.invalid = false;
        }
   }

   $scope.onClickSnap = function(){
      console.log("post.js: onClickSnap");
      navigator.camera.getPicture (onSuccessSnap, onFail,
                                  {quality: 40, destinationType: Camera.DestinationType.DATA_URL});
   }
     
                  
   $scope.onClickLibrary = function(){
      console.log("post.js: onClickLibrary");
      navigator.camera.getPicture(onSuccess, onFail,
                                  {quality: 40,
                                   destinationType:Camera.DestinationType.FILE_URI,
                                   sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM});
   }

   $scope.onClickLocation = function(){
      console.log("post.js: onClickLocation");
      ons.notification.alert({message: '使い所があれば。'});
   }
                  
    $scope.onClickPostCancel = function(){
       console.log("post.js: onClickCancel");
           
       ons.notification.confirm({
           message: '入力データを初期化します。よろしいですか?',
           callback: function(answer) {
               if(answer){
                   $scope.postData.text="";
                   $scope.postData.pictureClass = "picture-card-off";
                   $scope.postData.picture = "";
                   $scope.postData.invalid = true;
                   navigator.camera.cleanup(onCleanSuccess, onCleanFail);
               }
           }
       });
    }
                  
    $scope.onClickPost = function(){
    　　console.log("post.js: onClickPost");
                  
        // TODO
        // $scope.postData のデータを送るイメージです。
         ons.notification.alert({message: 'POSTしました！'});
    　　　navi.pushPage('pages/memory/home.html', {animation:'fade'});
    }
     
                  
    // 共通関数
    function onSuccess(imageURI){
        $scope.postData.pictureClass = "picture-card-on";
        $scope.postData.picture = imageURI;
        $scope.postData.invalid = false;
    }
    
    function onSuccessSnap(imageData){
        $scope.postData.pictureClass = "picture-card-on";
        $scope.postData.picture = "data:image/jpeg;base64," + imageData;
        $scope.postData.invalid = false;
    }
    
    function onFail(msg){
        ons.notification.alert({message: 'Error : ' + msg});
    }
                  
    function onCleanSuccess() {
        console.log("Camera cleanup success.");
    }
                  
    function onCleanFail(message) {
        console.log("Camera cleanup Fail:" + message);
    }
                  
});
