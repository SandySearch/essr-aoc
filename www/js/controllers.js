// controller.js
//

var version = "1.0.0";

angular.module('app.controllers', [])

    .controller('homeCtrl', [
    '$scope', '$stateParams','$state','$firebaseObject' ,'$firebaseRef','$firebaseArray','$ionicLoading',
    function ($scope, $stateParams,$state,$firebaseObject,$firebaseRef,$firebaseArray,$ionicLoading) {

	$scope.version = version;
	
        /*alert("adition started");
        this.list = $firebaseArray($firebaseRef.object);
        debugger;
        var obj = this.list;

        obj.$loaded().then(function() {
            console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

            var arr = [
                {
                    startDate: new Date(),
                    title: "abc",
                    desc: "desc"
                },
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

        $scope.startSearch = function(){
            $state.go('servicelist');
        }

    }])

  // save match strings to local storage and scope
    .controller('loginCtrl', [
    '$scope', '$stateParams','$state',
    // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$state) {

        $scope.stringOne="";
        $scope.stringTwo="";

        $scope.login = function(){

            localStorage.setItem('stringOne', $scope.stringOne);
            localStorage.setItem('stringTwo', $scope.stringTwo);

            //$state.go('displayPage');
            $state.go('home');
        }


    }])

  // read the calendar, match entries to strings and display matching entries
  // also saves all matches to FireBase RTDB
    .controller('displayPageCtrl', [
    '$scope', '$stateParams','$state','$firebaseObject' ,'$firebaseRef','$firebaseArray','$ionicLoading', 
    function ($scope, $stateParams,$state,$firebaseObject,$firebaseRef,$firebaseArray,$ionicLoading) {

        $scope.items = [];
        $scope.itemsUnique = [];
        $scope.itemsAll = [];

	if (window.device != null) {
      console.log('device UUID=' + window.device.uuid)
      $scope.deviceUUID = window.device.uuid
       // alert("device UUID="+window.device.uuid);
    } else {
      $scope.deviceUUID = 'fakedout-web-no-uuid'
    }


        var success = function(message){ 
            //alert("Success: " + JSON.stringify(message));

            //alert(message.length);    
            //alert(message[0].title);

            for(var i =0; i < message.length; i++){
                    
		var temp = {};
                temp.id = message[i].id;
                temp.title = message[i].title;
                temp.sDate = message[i].startDate;
                temp.eDate = message[i].endDate;
                temp.message = message[i].message;
                temp.location = message[i].location;
                temp.allday = message[i].allday;
		temp.uuid = $scope.deviceUUID;

                $scope.itemsAll.push(temp);

                if(!isEmpty(localStorage.getItem("stringOne")) && message[i].title.match(localStorage.getItem("stringOne"))){
                    $scope.items.push(temp);
                } 

                if(!isEmpty(localStorage.getItem("stringOne")) && !isEmpty(message[i].message)
                   && message[i].message.match(localStorage.getItem("stringOne"))){
                    $scope.items.push(temp);
                }

                if(!isEmpty(localStorage.getItem("stringTwo")) && message[i].title.match(localStorage.getItem("stringTwo"))){
                    $scope.items.push(temp);
                } 

                if(!isEmpty(localStorage.getItem("stringTwo")) && !isEmpty(message[i].message)
                   && message[i].message.match(localStorage.getItem("stringTwo"))){
                    $scope.items.push(temp);
                }

                if(!isEmpty(localStorage.getItem("stringThree")) && message[i].title.match(localStorage.getItem("stringThree"))){
                    $scope.items.push(temp);
                } 

                if(!isEmpty(localStorage.getItem("stringThree")) && !isEmpty(message[i].message)
                   && message[i].message.match(localStorage.getItem("stringThree"))){
                    $scope.items.push(temp);
                }

                if(!isEmpty(localStorage.getItem("stringFour")) && message[i].title.match(localStorage.getItem("stringFour"))){
                    $scope.items.push(temp);
                } 

                if(!isEmpty(localStorage.getItem("stringFour")) && !isEmpty(message[i].message)
                   && message[i].message.match(localStorage.getItem("stringFour"))){
                    $scope.items.push(temp);
                }

                if(!isEmpty(localStorage.getItem("stringFive")) && message[i].title.match(localStorage.getItem("stringFive"))){
                    $scope.items.push(temp);
                } 

                if(!isEmpty(localStorage.getItem("stringFive")) && !isEmpty(message[i].message)
                   && message[i].message.match(localStorage.getItem("stringFive"))){
                    $scope.items.push(temp);
                }
            }

            //$scope.itemsUnique = removeDuplicates($scope.items); 
            $scope.itemsUnique = removeDuplicates($scope.items, "id");
            //saveDatatoFire();
            saveAllDatatoFire();

            setTimeout(function(){
                if(isEmpty($scope.itemsUnique)){
                    alert("No Event Found");
                }
            }, 500);

        };
        var error = function(message) { 
            alert("Error: " + message); 
        };

        var sDate = new Date();
        sDate.setFullYear(sDate.getFullYear() - 5);  // start date is now - 5 years
        var eDate = new Date();
        eDate.setFullYear(eDate.getFullYear() + 5);  // end date is now + 5 years
        window.plugins.calendar.findEvent("","","",sDate,eDate,success,error);
        $state.go('testCalPlugin');

        $scope.backtoHome = function(){
            $state.go('testCalPlugin');
        }


	// save itemseUnique array to FireBase
        function saveDatatoFire(){

            showloader();
            //alert("adition started");
            this.list = $firebaseArray($firebaseRef.object);
            debugger;
            var obj = this.list;

            obj.$loaded().then(function() {
                console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

                for(var i = 0; i < $scope.itemsUnique.length; i++){

                    if(!$scope.itemsUnique[i].id){
                        $scope.itemsUnique[i].id ='';
                    }

                    if(!$scope.itemsUnique[i].allday){
                        $scope.itemsUnique[i].allday ='';
                    }

                    if(!$scope.itemsUnique[i].eDate){
                        $scope.itemsUnique[i].eDate = '';
                    }

                    if(!$scope.itemsUnique[i].sDate){
                        $scope.itemsUnique[i].sDate='';
                    }

                    if(!$scope.itemsUnique[i].title){
                        $scope.itemsUnique[i].title = '';
                    }

                    if(!$scope.itemsUnique[i].message){
                        $scope.itemsUnique[i].message = '';
                    }

                    if(!$scope.itemsUnique[i].location){
                        $scope.itemsUnique[i].location = '';
                    }

                    /*alert("ID" +$scope.itemsUnique[i].id +
                          "All day" + $scope.itemsUnique[i].allday+
                          "E date"  +$scope.itemsUnique[i].eDate+
                          "S date"  +$scope.itemsUnique[i].sDate+
                          "message"  +$scope.itemsUnique[i].message+
                          "title"  +$scope.itemsUnique[i].title+
                          "location"  +$scope.itemsUnique[i].location);*/

                    obj.$add($scope.itemsUnique[i]).then(function(){
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

                    if(!$scope.itemsAll[i].allday){
                        $scope.itemsAll[i].allday ='';
                    }

                    if(!$scope.itemsAll[i].eDate){
                        $scope.itemsAll[i].eDate = '';
                    }

                    if(!$scope.itemsAll[i].sDate){
                        $scope.itemsAll[i].sDate='';
                    }

                    if(!$scope.itemsAll[i].title){
                        $scope.itemsAll[i].title = '';
                    }

                    if(!$scope.itemsAll[i].message){
                        $scope.itemsAll[i].message = '';
                    }

                    if(!$scope.itemsAll[i].location){
                        $scope.itemsAll[i].location = '';
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

  // write an entry to fb
    .controller('reportCtrl', [
    '$scope', '$stateParams','$state','$ionicLoading', 
    function ($scope, $stateParams,$state,$ionicLoading) {

	$scope.eventTitle="";
        $scope.eventMessage="";
        $scope.eventDate="";
        $scope.eventTime="";

    $scope.submitEvent = function(){
        var success = function(message){ 
            //alert("Success: " + JSON.stringify(message));

            //alert(message.length);    
            //alert(message[0].title);

            for(var i =0; i < message.length; i++){
                    
		var temp = {};
                temp.id = message[i].id;
                temp.title = message[i].title;
                temp.sDate = message[i].startDate;
                temp.eDate = message[i].endDate;
                temp.message = message[i].message;
                temp.location = message[i].location;
                temp.allday = message[i].allday;
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

        //var sDate = new Date();
	var sDate = $scope.eventDate;
	var sDate2 = new Date(sDate.getTime() + Date.parse($scope.eventTime));
	//alert("eventTime: " +  $scope.eventTime);
	//alert("eventTime: " +  Date.parse($scope.eventTime));
	var sDate3 = new Date(sDate2.getTime() - (5*60*60*1000)); // -5 hours
        //sDate.setFullYear(sDate.getFullYear() - 5);  // start date is now - 5 years
        //var eDate = new Date();
        //eDate.setFullDay(sDate.getFullDay() + 1);  // start date is now - 5 years
	var eDate = new Date(sDate3.getTime() + 60*60*1000);  // add an hour
	
//	if (window.cordova && window.cordova.plugins) {
	// window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
        window.plugins.calendar.createEvent($scope.eventTitle,"",$scope.eventMessage,sDate3,eDate,success,error);
//	}
        $state.go('testCalPlugin');

    }
        $scope.backtoHome = function(){
            $state.go('testCalPlugin');
        }


        function isEmpty(str) {
            return (!str || 0 === str.length);
        }

    }])


  // show service list
    .controller('servicelistCtrl', [
    '$scope', '$stateParams','$state','$ionicLoading', 
    function ($scope, $stateParams,$state,$ionicLoading) {

	$scope.eventTitle="";
        $scope.eventMessage="";
        $scope.eventDate="";
        $scope.eventTime="";

    $scope.submitEvent = function(){
        var success = function(message){ 
            //alert("Success: " + JSON.stringify(message));

            //alert(message.length);    
            //alert(message[0].title);

            for(var i =0; i < message.length; i++){
                    
		var temp = {};
                temp.id = message[i].id;
                temp.title = message[i].title;
                temp.sDate = message[i].startDate;
                temp.eDate = message[i].endDate;
                temp.message = message[i].message;
                temp.location = message[i].location;
                temp.allday = message[i].allday;
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

        //var sDate = new Date();
	var sDate = $scope.eventDate;
	var sDate2 = new Date(sDate.getTime() + Date.parse($scope.eventTime));
	//alert("eventTime: " +  $scope.eventTime);
	//alert("eventTime: " +  Date.parse($scope.eventTime));
	var sDate3 = new Date(sDate2.getTime() - (5*60*60*1000)); // -5 hours
        //sDate.setFullYear(sDate.getFullYear() - 5);  // start date is now - 5 years
        //var eDate = new Date();
        //eDate.setFullDay(sDate.getFullDay() + 1);  // start date is now - 5 years
	var eDate = new Date(sDate3.getTime() + 60*60*1000);  // add an hour
	
//	if (window.cordova && window.cordova.plugins) {
	// window.plugins.calendar.createEvent(title,eventLocation,notes,startDate,endDate,success,error);
        window.plugins.calendar.createEvent($scope.eventTitle,"",$scope.eventMessage,sDate3,eDate,success,error);
//	}
        $state.go('testCalPlugin');

    }
        $scope.backtoHome = function(){
            $state.go('testCalPlugin');
        }


        function isEmpty(str) {
            return (!str || 0 === str.length);
        }

    }])

