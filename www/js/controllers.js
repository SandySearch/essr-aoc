// controller.js
//

var version = "1.0.0";
var sponsorUrl = "https://www.google.com";

angular.module('app.controllers', ['ionic', 'ngCordova'])

    .controller('homeCtrl', [
    //'$scope', '$stateParams','$state','$firebaseObject' ,'$firebaseRef','$firebaseArray','$ionicLoading','$sce',
    '$scope', '$stateParams','$state','$firebaseObject' ,'$firebaseRef','$firebaseArray','$ionicLoading',
    //function ($scope, $stateParams,$state,$firebaseObject,$firebaseRef,$firebaseArray,$ionicLoading,$sce) {
    function ($scope, $stateParams,$state,$firebaseObject,$firebaseRef,$firebaseArray,$ionicLoading) {

	$scope.version = version;
	
        /*alert("adition started");
        this.list = $firebaseArray($firebaseRef.object);
        debugger;
        var obj = this.list;

        obj.$loaded().then(function() {
            console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

            var arr = [
                {$scope.securedd = $sce.trustAsHtml($scope.note.dd)

                    startDate: new Date(),
                    title: "abc",
                    desc: "desc"
                },$scope.securedd = $sce.trustAsHtml($scope.note.dd)

                {
                    startDate: new Date(),
                    title: "abc",
                    desc: "desc"
                },
                {
                    startDate: new Date(),
                    title: "abc",
                    desc: "desc"
                }
            ];

            obj.$add({ title: "abcd" }).then(function(){
                alert("obj saved!");
            },function(error){
                alert("some error");
            });

            angular.forEach(obj, function(value, key) {
                console.log(key, value);
            });
        });*/
        //$scope.secureUrl = $sce.trustAsHtml(sponsorUrl);

        $scope.startSearch = function(){
            $state.go('servicelist');
        }

	$scope.gotoUrl = function(){
            // send clicked link event response back
            //cordova.InAppBrowser.open($scope.secureUrl, '_system', 'location=yes');
            cordova.InAppBrowser.open(sponsorUrl, '_system', 'location=yes');
            return false
           // $state.go('home', $scope.data);
        }
    }])

  // login for verified users
    .controller('loginCtrl', [
    '$scope', '$stateParams','$state',
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$state) {

        $scope.stringOne="";

        $scope.login = function(){ // always works$scope.securedd = $sce.trustAsHtml($scope.note.dd)
!

            localStorage.setItem('loggedin', true);
            $state.go('home');
        }
	
	//$scope.signup = function() { // really signup request


    }])


  // saves all matches to FireBase RTDB$scope.securedd = $sce.trustAsHtml($scope.note.dd)

    .controller('reportCtrl', [
    '$scope', '$stateParams','$state','$firebaseObject' ,'$firebaseRef','$firebaseArray','$ionicLoading', 
    function ($scope, $stateParams,$state,$firebaseObject,$firebaseRef,$firebaseArray,$ionicLoading) {

    $scope.data = {
	    name: '',
	    address: '',
	    phone: '',
	    notes: '',
	    reporter: '',
	    enteredDate: '',
	    verified: false
    };
    $scope.items = [];
    $scope.itemsUnique = [];
    //$scope.itemsAll = [];


    //var obj = this.list;
    var obj = $scope.data;

    if (window.device != null) {
         console.log('device UUID=' + window.device.uuid)
         $scope.deviceUUID = window.device.uuid
          // alert("device UUID="+window.device.uuid);
    } else {
      $scope.deviceUUID = 'fakedout-web-no-uuid'
    }


    $scope.submitEvent = function(){
        var eDate = new Date();

            alert("Success2: " + JSON.stringify(obj));

            //alert(obj); 
            //alert(obj.length); 
            //alert(obj[0].name);

            for(var i =0; i < obj.length; i++){
                    
		var temp = {};
                temp.id = obj[i].id;
                temp.name = obj[i].name;
                temp.address = obj[i].address;
                temp.phone = obj[i].phone;
                temp.eDate = obj[i].enteredDate;
                temp.verified = obj[i].verified;
                temp.notes = obj[i].notes;
                temp.reporter = obj[i].reporter;
		temp.uuid = $scope.deviceUUID;

                $rootScope.itemsAll.push(temp);

                $scope.items.push(temp);
            }

            //$scope.itemsUnique = removeDuplicates($scope.items, "id");
            //saveAllDatatoFire();

	    //saveDatatoFire();

	    /***
            setTimeout(function(){
                if(isEmpty($scope.itemsUnique)){
                    alert("No Event Found");
                }
            }, 500);
	    ***/

        $state.go('home');
    }

        $scope.backtoHome = function(){
            $state.go('home');
        }


	// save itemseUnique array to FireBase
        function saveDatatoFire(){

            showloader();
            //alert("adition started");
            //this.list = $firebaseArray($firebaseRef.object);
            //var obj = $firebaseArray($firebaseRef.object);
	    var ref = firebase.database().ref('events')
            var obj = $firebaseArray(ref)

            debugger;
            //var obj = this.list;
            //var obj = $scope.data;

            //obj.$loaded().then(function() {
                console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

                for(var i = 0; i < $scope.itemsUnique.length; i++){

                    if(!$scope.itemsUnique[i].id){
                        $scope.itemsUnique[i].id ='';
                    }

                    if(!$scope.itemsUnique[i].name){
                        $scope.itemsUnique[i].name ='';
                    }

                    if(!$scope.itemsUnique[i].eDate){
                        $scope.itemsUnique[i].eDate = '';
                    }

                    if(!$scope.itemsUnique[i].address){
                        $scope.itemsUnique[i].address='';
                    }

                    if(!$scope.itemsUnique[i].phone){
                        $scope.itemsUnique[i].phone = '';
                    }

                    if(!$scope.itemsUnique[i].notes){
                        $scope.itemsUnique[i].notes = '';
                    }

                    if(!$scope.itemsUnique[i].verified){
                        $scope.itemsUnique[i].verified = '';
                    }

                    if(!$scope.itemsUnique[i].reporter){
                        $scope.itemsUnique[i].reporter = '';
                    }

                    if(!$scope.itemsUnique[i].uuid){
                        $scope.itemsUnique[i].uuid = '';
                    }

                    /*alert("ID" +$scope.itemsUnique[i].id +
                          "All day" + $scope.itemsUnique[i].allday+
                          "E date"  +$scope.itemsUnique[i].eDate+
                          "S date"  +$scope.itemsUnique[i].sDate+
                          "message"  +$scope.itemsUnique[i].message+
                          "title"  +$scope.itemsUnique[i].title+
                          "location"  +$scope.itemsUnique[i].location);*/

                    obj.$add($scope.itemsUnique[i]).then(function(ref){
			    var id = ref.key // v3
			    // update mid
      var record = metrics.$getRecord(id)
      record.id = id

                        hideloader();
                        alert("obj saved!");
                    },function(error){
                        hideloader();
                        alert(error.message);
                        //alert("some error");
                    });
                }

                angular.forEach(obj, function(value, key) {
                    console.log(key, value);
                });
            //});
          $state.go('home');
        }


	// save itemsAll array to FireBase
        function saveAllDatatoFire(){

            showloader();
            //alert("adition started");
            this.list = $firebaseArray($firebaseRef.object);
            debugger;
            var obj = this.list;

            obj.$loaded().then(function() {
                console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

                for(var i = 0; i < $scope.itemsAll.length; i++){

                    if(!$scope.itemsAll[i].id){
                        $scope.itemsAll[i].id ='';
                    }

                    //if(!$scope.itemsAll[i].type){
                    //    $scope.itemsAll[i].type ='';
                    //}

                    if(!$scope.itemsAll[i].eDate){
                        $scope.itemsAll[i].eDate = '';
                    }

                    if(!$scope.itemsAll[i].name){
                        $scope.itemsAll[i].name='';
                    }

                    if(!$scope.itemsAll[i].address){
                        $scope.itemsAll[i].address = '';
                    }

                    if(!$scope.itemsAll[i].phone){
                        $scope.itemsAll[i].phone = '';
                    }

                    if(!$scope.itemsAll[i].notes){
                        $scope.itemsAll[i].notes = '';
                    }

                    /*alert("ID" +$scope.itemsAll[i].id +
                          "All day" + $scope.itemsAll[i].allday+
                          "E date"  +$scope.itemsAll[i].eDate+
                          "S date"  +$scope.itemsAll[i].sDate+
                          "message"  +$scope.itemsAll[i].message+
                          "title"  +$scope.itemsAll[i].title+
                          "location"  +$scope.itemsAll[i].location);*/

                    obj.$add($scope.itemsAll[i]).then(function(){
                        hideloader();
                        //alert("obj saved!");
                    },function(error){
                        hideloader();
                        alert(error.message);
                        //alert("some error");
                    });
                }

                angular.forEach(obj, function(value, key) {
                    console.log(key, value);
                });
            });

           $state.go('home');
        }

        function isEmpty(str) {
            return (!str || 0 === str.length);
        }


	// remove duplicate ids from items array (if entry matches multiple strings)
        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject  = {};

            for(var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }

            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }



        function showloader(){
            $ionicLoading.show({
                template: 'Saving...'
            }).then(function(){
                console.log("The loading indicator is now displayed");
            });
        }
 
        function hideloader(){
                 $ionicLoading.hide().then(function(){
                    console.log("The loading indicator is now hidden");
                });
         }
 

    }])

  // write a new service availability to db
    .controller('reportCtrl2', [
    '$scope', '$stateParams','$state','$ionicLoading', 
    function ($scope, $stateParams,$state,$ionicLoading) {

    $scope.submitEvent = function(){
        var success = function(message){ 
            //alert("Success: " + JSON.stringify(message));

            //alert(message.length);    
            //alert(message[0].title);

            for(var i =0; i < message.length; i++){
                    
		var temp = {};
                temp.id = message[i].id;
                temp.name = message[i].name;
                temp.address = message[i].address;
                temp.eDate = message[i].enteredDate;
                temp.phone = message[i].phone;
                temp.notes = message[i].notes;
                //temp.type = message[i].type;
            }

            setTimeout(function(){
                if(isEmpty($scope.itemsUnique)){
                    //alert("No Event Found");
                }
            }, 500);

        };
        var error = function(message) { 
            alert("Error: " + message); 
        };

        var eDate = new Date();
	
//	if (window.cordova && window.cordova.plugins) {
	// window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
        //window.plugins.calendar.createEvent($scope.eventTitle,"",$scope.eventMessage,sDate3,eDate,success,error);
//	}
        $state.go('home');

    }
        $scope.backtoHome = function(){
            $state.go('home');
        }


        function isEmpty(str) {
            return (!str || 0 === str.length);
        }

    }])


  // show service list
    .controller('servicelistCtrl', [
    '$scope', '$rootScope', '$stateParams','$state','$ionicLoading', 
    function ($scope, $rootScope, $stateParams,$state,$ionicLoading) {

	$scope.eventTitle="";
        $scope.eventMessage="";
        $scope.eventDate="";
        $scope.eventTime="";

    $scope.list_esny = function(){
		$rootScope.title = 'Emergency shelters near you';
            $state.go('list');
     }

    $scope.list_efu = function(){
		$rootScope.title = 'Emergency Food and Water near you';
            $state.go('list');
     }

    $scope.list_gs = function(){
		$rootScope.title = 'Open Gas Stations with fuel';
            $state.go('list');
     }

    $scope.list_cs = function(){
		$rootScope.title = 'Charging Stations';
            $state.go('list');
     }

    $scope.list_ofs = function(){
		$rootScope.title = 'Open Food Stores';
            $state.go('list');
     }

    $scope.list_watm = function(){
		$rootScope.title = 'Working ATMs';
            $state.go('list');
     }

        $scope.getList = function(){
            if ($stateParams.type != null) {
		    var type = $stateParams.type;
	    } else {
		    var type = 'other';
	    }

	    alert("type =",type);

            //$state.go('displayPage');
            $state.go('list');
        }

	$scope.gotoUrl = function(){
            // send clicked link event response back
            //cordova.InAppBrowser.open($scope.secureUrl, '_system', 'location=yes');
            cordova.InAppBrowser.open(sponsorUrl, '_system', 'location=yes');
            return false
           // $state.go('home', $scope.data);
        }
    }])


  // show list
    .controller('listCtrl', [
    '$scope', '$rootScope','$stateParams','$state','$ionicLoading', 
    function ($scope, $rootScope, $stateParams,$state,$ionicLoading) {

	if ($rootScope.type != null) {
	    $scope.type = $rootScope.type;
	}

        $scope.gotoUrl = function(){
            cordova.InAppBrowser.open(sponsorUrl, '_system', 'location=yes');
            return false
	}

        $scope.backtoHome = function(){
            $state.go('home');
        }

    }])

