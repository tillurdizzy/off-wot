'use strict';

//PRIMARY_ID	eventID	eventWeek	gamerTag
//	2			friday01	A		Gamer245

 APP.controller('CalendarCtrl',['$scope','$state','eventsDb','$location','cookieSrvc', function ($scope,$state,eventsDb,$location,cookieSrvc) {
 	var DB = eventsDb;
 	$scope.formActive = null;
 	$scope.myEvent = '';	// set in getAttendees 
 	var CS = cookieSrvc;
 	var ME = "calendarCtrl: ";
 	$scope.gamerCookie = null;

 	$scope.eventImage="";

 	var Attendees = [];

 	$scope.AttendeesA = [];
 	$scope.AttendeesB = [];
 	$scope.AttendeesC = [];
 	$scope.AttendeesD = [];
 	$scope.AttendeesE = [];
 	
 	$scope.isRegistered_A = false;
 	$scope.isRegistered_B = false;
 	$scope.isRegistered_C = false;
 	$scope.isRegistered_D = false;
 	$scope.isRegistered_E = false;

 	$scope.eventClosedA = false;
 	$scope.eventClosedB = false;
 	$scope.eventClosedC = false;
 	$scope.eventClosedD = false;
 	$scope.eventClosedE = false;

 	$scope.eventExpiredA = false;
 	$scope.eventExpiredB = false;
 	$scope.eventExpiredC = false;
 	$scope.eventExpiredD = false;
 	$scope.eventExpiredE = false;

 	$scope.monthDisplay = "";

 	var monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 	
 	$scope.eventData=new Object();
 	$scope.eventData.weekA= "";
	$scope.eventData.weekB= "";
	$scope.eventData.weekC= "";
	$scope.eventData.weekD= "";
	$scope.eventData.weekE= "";
 	

 	$scope.getAttendees = function(){
 		if($scope.myEvent == ""){
 			$state.transitionTo('events');
 		}else{
 			DB.queryAttendees()
			.then(function(result){
				Attendees = result;
				$scope.parseAttendees();
			},function(error){
				$scope.dataError();
			});
 		}
 	};

 	var getEventData = function(){

 		// THIS IS HOW WE KNOW WHAT EVENT/PAGE WE ARE ON!!
 		// eventsDB already has it, so we don't need to send as param
 		$scope.myEvent = DB.eventView;

 		if($scope.myEvent == ""){
 			// Prevents a direct link accessing this page - must start at events page to set the eventView
 			$state.transitionTo('events');
 		}else{
 			

	 		var d = new Date();
	 		var m = d.getMonth();
	 		
	 		$scope.eventData=new Object();
	 		$scope.eventData = DB.returnEventData();// this is not a promise.. just parses based on which event wiew we are on
			$scope.eventImage = $scope.eventData.photo;
	 		$scope.monthDisplay = monthLabels[parseInt($scope.eventData.month)];
	 		

	 		if($scope.eventData.PRIMARY_ID == $scope.myEvent){
	 			var todayNum = d.getTime();
	 			var eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekA));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpiredA = true;
	 				$scope.eventClosedA = true;
	 			}
	 			eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekB));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpiredB = true;
	 				$scope.eventClosedB = true;
	 			}
	 			eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekC));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpiredC= true;
	 				$scope.eventClosedC = true;
	 			}
	 			eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekD));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpiredD = true;
	 				$scope.eventClosedD = true;
	 			}
	 			eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekE));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpiredE = true;
	 				$scope.eventClosedE = true;
	 			}
	 		}else{
	 			$state.transitionTo('error');
	 		}
	 	}
 	};

 	$scope.returnDayTime = function(month,day){
 		var d = new Date();
 		d.setFullYear(2015,month,day);
 		
 		return d.getTime();
 	}

 	$scope.parseAttendees = function(){
 		$scope.AttendeesA = [];
 		$scope.AttendeesB = [];
 		$scope.AttendeesC = [];
 		$scope.AttendeesD = [];
 		$scope.AttendeesE = [];
		
		$scope.eventClosedA = false;
 		$scope.eventClosedB = false;
 		$scope.eventClosedC = false;
 		$scope.eventClosedD = false;
 		$scope.eventClosedE = false;

 		
 		for (var i = 0; i < Attendees.length; i++) {
 			switch(Attendees[i].eventWeek){
 				case "A":$scope.AttendeesA.push(Attendees[i]);break;
 				case "B":$scope.AttendeesB.push(Attendees[i]);break;
 				case "C":$scope.AttendeesC.push(Attendees[i]);break;
 				case "D":$scope.AttendeesD.push(Attendees[i]);break;
 				case "E":$scope.AttendeesE.push(Attendees[i]);break;
 			}
 		};

 		$scope.isRegistered_A = false;
 		$scope.isRegistered_B = false;
 		$scope.isRegistered_C = false;
 		$scope.isRegistered_D = false;
 		$scope.isRegistered_E = false;

 		var i;

 		for (i = 0; i < $scope.AttendeesA.length; i++) {
 			if($scope.AttendeesA[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered_A = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesB.length; i++) {
 			if($scope.AttendeesB[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered_B = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesC.length; i++) {
 			if($scope.AttendeesC[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered_C = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesD.length; i++) {
 			if($scope.AttendeesD[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered_D = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesE.length; i++) {
 			if($scope.AttendeesE[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered_E = true;
 			}
 		};


 		if($scope.AttendeesA.length == 4){
 			$scope.eventClosedA = true;
 		}
 		if($scope.AttendeesB.length == 4){
 			$scope.eventClosedB = true;
 		}
 		if($scope.AttendeesC.length == 4){
 			$scope.eventClosedC = true;
 		}
 		if($scope.AttendeesD.length == 4){
 			$scope.eventClosedD = true;
 		}
 		if($scope.AttendeesE.length == 4){
 			$scope.eventClosedE = true;
 		}
 		
 	};

 	$scope.dataError = function(){
 		$scope.AttendeesA = [];
 		$scope.AttendeesB = [];
 		$scope.AttendeesC = [];
 		$scope.AttendeesD = [];
 		$scope.AttendeesE = [];
 		$state.transitionTo('error');
 	};

 	$scope.addAttendee = function(_eventWeek){
 		if($scope.gamerCookie == null){
 			// needs to sign in
 		}else{
 			var dataObj = new Object();
 			dataObj.eventID = $scope.myEvent;
 			dataObj.eventWeek = _eventWeek;
 			dataObj.gamerTag = $scope.gamerCookie;
 			dataObj.startTime = 0;
 			DB.insertTag(dataObj).then(function(result){
 				$scope.getAttendees();
 			})
 		}
 	};

 	$scope.addAttendeeA = function(){
 		$scope.addAttendee("A");
 	};
 	$scope.addAttendeeB = function(){
 		$scope.addAttendee("B");
 	};
 	$scope.addAttendeeC = function(){
 		$scope.addAttendee("C");
 	};
 	$scope.addAttendeeD = function(){
 		$scope.addAttendee("D");
 	};
 	$scope.addAttendeeE = function(){
 		$scope.addAttendee("E");
 	};

 	$scope.cancelAttendeeA = function(){
 		$scope.cancelEvent("A");
 	};
 	$scope.cancelAttendeeB = function(){
 		$scope.cancelEvent("B");
 	};
 	$scope.cancelAttendeeC = function(){
 		$scope.cancelEvent("C");
 	};
 	$scope.cancelAttendeeD = function(){
 		$scope.cancelEvent("D");
 	};
 	$scope.cancelAttendeeE = function(){
 		$scope.cancelEvent("E");
 	};
 	

 	$scope.cancelEvent = function(_eventWeek){
 		var i;
 		var dataObj = new Object();
 		if($scope.gamerCookie == null){
 			// needs to sign in
 		}else{
 			switch(_eventWeek){
 				case "A":
 					for (i = 0; i < $scope.AttendeesA.length; i++) {
 						if($scope.AttendeesA[i].gamerTag == $scope.gamerCookie){
 							dataObj = $scope.AttendeesA[i];
 						}
 					};
 					break;
 				case "B":
 					for (i = 0; i < $scope.AttendeesB.length; i++) {
 						if($scope.AttendeesB[i].gamerTag == $scope.gamerCookie){
 							dataObj = $scope.AttendeesB[i];
 						}
 					};
 					break;
 				case "C":
 					for (i = 0; i < $scope.AttendeesC.length; i++) {
 						if($scope.AttendeesC[i].gamerTag == $scope.gamerCookie){
 							dataObj = $scope.AttendeesC[i];
 						}
 					};
 					break;
 				case "D":
 					for (i = 0; i < $scope.AttendeesD.length; i++) {
 						if($scope.AttendeesD[i].gamerTag == $scope.gamerCookie){
 							dataObj = $scope.AttendeesD[i];
 						}
 					};
 					break;
 				case "E":
 					for (i = 0; i < $scope.AttendeesE.length; i++) {
 						if($scope.AttendeesE[i].gamerTag == $scope.gamerCookie){
 							dataObj = $scope.AttendeesE[i];
 						}
 					};
 					break;
 			}
 			DB.removeTag(dataObj)
 			.then(function(result){
 				$scope.getAttendees();
			},function(error){
				$scope.getAttendees();
			});
 		}

 	};

 	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = CS.gamerCookie;
 		console.log($scope.ME + "getGamerCookie " + $scope.gamerCookie);
 		if($scope.gamerCookie == null){
 			$state.transitionTo('events');
 		}
 	};


 	$scope.$on('$viewContentLoaded', function() {
 		getEventData();
       $scope.getAttendees();
       $scope.getGamerCookie();
    });

    $scope.backToMenu = function(){
    	$state.transitionTo('events');
    };
 	
 	
 	
 }]);