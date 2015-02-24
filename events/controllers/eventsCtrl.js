'use strict';
 APP.controller('EventsCtrl',['$scope','$state','eventsDb','cookieSrvc','memberSrvc', function ($scope,$state,eventsDb,cookieSrvc,memberSrvc) {
 	var DB = eventsDb;
 	var MS = memberSrvc;
 	var CS = cookieSrvc;
	$scope.eventsDataResult = [];
 	$scope.selectedEvent = [];
	$scope.titleDisplay = "";
 	
 	$scope.signedIn = MS.signedIn;
 	$scope.signInResult = "SUCCESS";
 	$scope.ME = "eventsCtrl: ";
	$scope.hover = false;
	$scope.submitted = false;
	
	$scope.modalShown = false;
  	$scope.toggleModal = function() {
    	$scope.modalShown = !$scope.modalShown;
  	};

 	$scope.showEventPage = function(primaryID){
 		DB.setEventView(primaryID);
		if(primaryID == "29"){
			$state.transitionTo('teamBattles');
		}else{
			$state.transitionTo('eventCalendar');
		}
 		
 	};

 	$scope.submitSignIn = function(isValid){
		$scope.submitted = true;
		if(isValid){
			var tag = this.signInTag;
			var pword = this.signInPword;
			MS.queryMember(tag,pword).then(function(result){
				$scope.signInResult = MS.validateSubmission();
				if($scope.signInResult == "SUCCESS"){
					$scope.signedIn = true;
					$scope.modalShown = false;
				};
			});
		};
 	};
	
	var initPage = function(){
		$scope.eventsDataResult = [];
		var rawData = DB.eventsDataResult;
		// Remove the inactive 
		for(var i=0; i < rawData.length; i++){
			if(rawData[i].active == "True" ){
				$scope.eventsDataResult.push(rawData[i]);
			};
		};
		
		if($scope.eventsDataResult.length > 0){
			var monthInt = $scope.eventsDataResult[0].month;
			var monthStr = DB.monthLabels[parseInt(monthInt)];
			var yearInt = new Date().getFullYear();
			$scope.titleDisplay = "Events for " + monthStr + " " + yearInt.toString();
		}
	};
	
	
	$scope.$on('event-data-ready', function() {
     	initPage();
    });
	
	initPage();
    
 }]);