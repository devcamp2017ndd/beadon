
bstrap.controller('PostController', ['$scope', '$http', function ($scope, $http) {

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
       
      var access_token = "949e1df98a083fe3b9f8b78f9279cbd7805aa17883f80acaa5af7eb396ca679f";
      
      var fd = new FormData();
      window.resolveLocalFileSystemURL(attachment.img, function(fileEntry) {
          fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                var imgBlob = new Blob([ $scope.postData.picture ], { type: "image/jpeg" } );
                fd.append('file', imgBlob);
                console.log(fd);
          };
                         
           reader.readAsArrayBuffer(file);
                                                                                     
         }, function(e){$scope.errorHandler(e)});
      }, function(e){$scope.errorHandler(e)});
                                     
                                     
      var reqp = {
          method : 'POST',
          url : 'https://devcampndd.com/api/v1/media',
          headers: {
              'Authorization': 'Bearer ' + access_token,
              'Content-Type': 'image/jpeg'
          },
          data: { file : fd }
       }
       
       var imgId = "";
       $http(reqp).success(function(data, status, headers, config) {
            
            imgId = data.id;
            console.log("Id" + data.id);
            console.log("type" + data.type);
            console.log("url" + data.url);
       }).error(function(data, status, headers, config) {
             console.log("失敗です。" + data);
             console.log("失敗です。" + status);
             console.log("失敗です。" + headers);
             console.log("失敗です。" + config);
       });

       var req = {
           method : 'POST',
           url : 'https://devcampndd.com/api/v1/statuses',
           headers: {
              'Authorization': 'Bearer ' + access_token
           },
           data: { status: $scope.postData.text,
                   media_ids: [imgId,'','','']
            }
        }
                                     
        $http(req).success(function(data, status, headers, config) {
             console.log("通信成功データ"+　data);
             //ons.notification.alert({message: data.data[0].name});
             }).error(function(data, status, headers, config) {
                console.log("失敗ステータス"+ status);
        });
                                     
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
                  
}]);
