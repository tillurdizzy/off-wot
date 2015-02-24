'use strict';

//PRIMARY_ID	eventID	eventWeek	gamerTag
//	2			friday01	A		Gamer245

 APP.controller('TeamsCtrl',['$scope','$state','eventsDb','$location','cookieSrvc', function ($scope,$state,eventsDb,$location,cookieSrvc) {
 	var DB = eventsDb;
 	$scope.formActive = null;
 	$scope.myEvent = '';	// set in getAttendees 
 	var CS = cookieSrvc;
 	var ME = "teamsCtrl: ";
 	$scope.gamerCookie = null;

 	$scope.eventImage="";
	$scope.teamNamesList = ["Dynamites","Hurricanes","Panthers","","",""];

 	var Attendees = [];

 	$scope.AttendeesA = [];
 	$scope.AttendeesB = [];
 	$scope.AttendeesC = [];
 	$scope.AttendeesD = [];
 	$scope.AttendeesE = [];
	$scope.AttendeesF = [];
 	
 	$scope.isRegistered = false;
 	
 	$scope.eventClosedA = false;
 	$scope.eventClosedB = false;
 	$scope.eventClosedC = false;
 	$scope.eventClosedD = false;
 	$scope.eventClosedE = false;
	$scope.eventClosedF = false;

 	$scope.eventExpired = false;

 	$scope.monthDisplay = "";

 	var monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 	
 	$scope.eventData=new Object();
 	$scope.eventData.teamA= "";
	$scope.eventData.teamB= "";
	$scope.eventData.teamC= "";
	$scope.eventData.teamD= "";
	$scope.eventData.teamE= "";
	$scope.eventData.teamF= "";
 	

 	$scope.getAttendees = function(){
 		if($scope.myEvent == ""){
 			$state.transitionTo('events');
 		}else{
 			DB.queryTeamAttendees()
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
	 		
	 		/*if($scope.eventData.PRIMARY_ID == $scope.myEvent){
	 			var todayNum = d.getTime();
	 			var eventDayNum = $scope.returnDayTime($scope.eventData.month,parseInt($scope.eventData.weekA));
	 			if(todayNum > eventDayNum){
	 				$scope.eventExpired = true;
	 			}
	 			
	 		}else{
	 			$state.transitionTo('error');
	 		}*/
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
		$scope.AttendeesF = [];
		
		$scope.eventClosedA = false;
 		$scope.eventClosedB = false;
 		$scope.eventClosedC = false;
 		$scope.eventClosedD = false;
 		$scope.eventClosedE = false;
		$scope.eventClosedF = false;
 		
 		for (var i = 0; i < Attendees.length; i++) {
 			switch(Attendees[i].teamLetter){
 				case "A":$scope.AttendeesA.push(Attendees[i]);break;
 				case "B":$scope.AttendeesB.push(Attendees[i]);break;
 				case "C":$scope.AttendeesC.push(Attendees[i]);break;
 				case "D":$scope.AttendeesD.push(Attendees[i]);break;
 				case "E":$scope.AttendeesE.push(Attendees[i]);break;
				case "F":$scope.AttendeesF.push(Attendees[i]);break;
 			}
 		};

 		$scope.isRegistered = false;
 		

 		var i;

 		for (i = 0; i < $scope.AttendeesA.length; i++) {
 			if($scope.AttendeesA[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedB = true;
				$scope.eventClosedC = true;
				$scope.eventClosedD = true;
				$scope.eventClosedE = true;
				$scope.eventClosedF = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesB.length; i++) {
 			if($scope.AttendeesB[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedA = true;
				$scope.eventClosedC = true;
				$scope.eventClosedD = true;
				$scope.eventClosedE = true;
				$scope.eventClosedF = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesC.length; i++) {
 			if($scope.AttendeesC[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedA = true;
				$scope.eventClosedB = true;
				$scope.eventClosedD = true;
				$scope.eventClosedE = true;
				$scope.eventClosedF = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesD.length; i++) {
 			if($scope.AttendeesD[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedA = true;
				$scope.eventClosedB = true;
				$scope.eventClosedC = true;
				$scope.eventClosedE = true;
				$scope.eventClosedF = true;
 			}
 		};
 		for (i = 0; i < $scope.AttendeesE.length; i++) {
 			if($scope.AttendeesE[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedA = true;
				$scope.eventClosedB = true;
				$scope.eventClosedC = true;
				$scope.eventClosedD = true;
				$scope.eventClosedF = true;
 			}
 		};
		for (i = 0; i < $scope.AttendeesF.length; i++) {
 			if($scope.AttendeesF[i].gamerTag == $scope.gamerCookie){
 				$scope.isRegistered = true;
				$scope.eventClosedA = true;
				$scope.eventClosedB = true;
				$scope.eventClosedC = true;
				$scope.eventClosedD = true;
				$scope.eventClosedE = true;
 			}
 		};


 		if($scope.AttendeesA.length == 5){
 			$scope.eventClosedA = true;
 		}
 		if($scope.AttendeesB.length == 5){
 			$scope.eventClosedB = true;
 		}
 		if($scope.AttendeesC.length == 5){
 			$scope.eventClosedC = true;
 		}
 		if($scope.AttendeesD.length == 5){
 			$scope.eventClosedD = true;
 		}
 		if($scope.AttendeesE.length == 5){
 			$scope.eventClosedE = true;
 		}
		if($scope.AttendeesF.length == 5){
 			$scope.eventClosedF = true;
 		}
 		
 	};

 	$scope.dataError = function(){
 		$scope.AttendeesA = [];
 		$scope.AttendeesB = [];
 		$scope.AttendeesC = [];
 		$scope.AttendeesD = [];
 		$scope.AttendeesE = [];
		$scope.AttendeesF = [];
 		$state.transitionTo('error');
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
	$scope.addAttendeeF = function(){
 		$scope.addAttendee("F");
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
	$scope.cancelAttendeeF = function(){
 		$scope.cancelEvent("F");
 	};
 	

 	$scope.addAttendee = function(_teamLetter){
 		if($scope.gamerCookie == null){
 			// needs to sign in
 		}else{
 			var dataObj = new Object();
 			dataObj.teamLetter = _teamLetter;
 			dataObj.gamerTag = $scope.gamerCookie;
 			DB.insertTeamTag(dataObj).then(function(result){
 				$scope.getAttendees();
 			})
 		}
 	};

 	

 	$scope.cancelEvent = function(_teamLetter){
 		var i;
 		var dataObj = new Object();
 		if($scope.gamerCookie == null){
 			// needs to sign in
 		}else{
 			
			for (i = 0; i < Attendees.length; i++) {
				if(Attendees[i].gamerTag == $scope.gamerCookie){
					dataObj = Attendees[i];
				}
			};

 			DB.removeTeamTag(dataObj)
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