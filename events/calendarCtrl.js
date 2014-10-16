'use strict';

//PRIMARY_ID	eventID	eventWeek	gamerTag
//	2			friday01	A		Gamer245

 APP.controller('CalendarCtrl',['$scope','$state','eventsDb','$location','cookieSrvc', function ($scope,$state,eventsDb,$location,cookieSrvc,memberSrvc) {
 	$scope.DB = eventsDb;
 	$scope.formActive = null;
 	$scope.myEvent = '';	// set in getAttendees 
 	$scope.CS = cookieSrvc;
 	$scope.ME = "calendarCtrl: ";
 	$scope.gamerCookie = null;
 	$scope.Attendees = [];
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
 	

 	$scope.eventtitle = "Friday Night Lights";
 	$scope.eventhost = "Snuffle";
 	$scope.eventtime = "10PM-Midnight";
 	$scope.eventtiers = "Tiers VI-VIII";
 	

 	$scope.getAttendees = function(){
 		//var hash = window.location.hash;
 		$scope.myEvent = $scope.DB.eventView;
 		if($scope.myEvent == ""){
 			$state.transitionTo('events');
 		}else{
 			$scope.DB.queryAttendees($scope.myEvent)
			.then(function(result){
				$scope.Attendees = result;
				$scope.parseAttendees();
			},function(error){
				$scope.dataError();
			});
 		}
 	};

 	$scope.parseAttendees = function(){
 		$scope.AttendeesA = [];
 		$scope.AttendeesB = [];
 		$scope.AttendeesC = [];
 		$scope.AttendeesD = [];
 		$scope.AttendeesE = [];
 		
 		for (var i = 0; i < $scope.Attendees.length; i++) {
 			switch($scope.Attendees[i].eventWeek){
 				case "A":$scope.AttendeesA.push($scope.Attendees[i]);break;
 				case "B":$scope.AttendeesB.push($scope.Attendees[i]);break;
 				case "C":$scope.AttendeesC.push($scope.Attendees[i]);break;
 				case "D":$scope.AttendeesD.push($scope.Attendees[i]);break;
 				case "E":$scope.AttendeesE.push($scope.Attendees[i]);break;
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

 		$scope.eventClosedA = false;
 		$scope.eventClosedB = false;
 		$scope.eventClosedC = false;
 		$scope.eventClosedD = false;
 		$scope.eventClosedE = false;

 		if($scope.AttendeesA.length == 2){
 			$scope.eventClosedA = true;
 		}
 		if($scope.AttendeesB.length == 2){
 			$scope.eventClosedB = true;
 		}
 		if($scope.AttendeesC.length == 2){
 			$scope.eventClosedC = true;
 		}
 		if($scope.AttendeesD.length == 2){
 			$scope.eventClosedD = true;
 		}
 		if($scope.AttendeesE.length == 2){
 			$scope.eventClosedE = true;
 		}
 		
 	};

 	$scope.dataError = function(){
 		$scope.AttendeesA = [];
 		$scope.AttendeesB = [];
 		$scope.AttendeesC = [];
 		$scope.AttendeesD = [];
 		$scope.AttendeesE = [];
 		var errorItem1 = new Object();
 		errorItem1.gamerTag = "Data Error";
 		var errorItem2 = new Object();
 		errorItem2.gamerTag = "Refresh Browser";
 		$scope.AttendeesA.push(errorItem1);
 		$scope.AttendeesA.push(errorItem2);
 		$scope.AttendeesB.push(errorItem1);
 		$scope.AttendeesB.push(errorItem2);
 		$scope.AttendeesC.push(errorItem1);
 		$scope.AttendeesC.push(errorItem2);
 		$scope.AttendeesD.push(errorItem1);
 		$scope.AttendeesD.push(errorItem2);
 		$scope.AttendeesE.push(errorItem1);
 		$scope.AttendeesE.push(errorItem2);
 		$scope.getAttendees();
 	};

 	$scope.addAttendee = function(_eventWeek){
 		if($scope.gamerCookie == null){
 			// needs to sign in
 		}else{
 			var dataObj = new Object();
 			dataObj.eventID = $scope.myEvent;
 			dataObj.eventWeek = _eventWeek;
 			dataObj.gamerTag = $scope.gamerCookie;
 			$scope.DB.insertTag(dataObj).then(function(result){
 				$scope.getAttendees();
 			})
 		}
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
 			$scope.DB.removeTag(dataObj)
 			.then(function(result){
 				$scope.getAttendees();
			},function(error){
				$scope.getAttendees();
			});
 		}

 	};

 	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = $scope.CS.gamerCookie;
 		console.log($scope.ME + "getGamerCookie " + $scope.gamerCookie);
 		if($scope.gamerCookie == null){
 			$state.transitionTo('events');
 		}
 	};


 	$scope.$on('$viewContentLoaded', function() {
       $scope.getAttendees();
       $scope.getGamerCookie();
    });

    $scope.backToMenu = function(){
    	$state.transitionTo('events');
    };
 	
 	
 	
 }]);