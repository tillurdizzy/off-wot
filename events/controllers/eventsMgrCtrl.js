'use strict';

 APP.controller('EventsUpdateCtrl',['$scope','eventsDb', function ($scope,eventsDb) {
 	var DB = eventsDb;
 	
 	var ME = "eventUPDATECtrl: ";
 	$scope.eventsDataResult;
 	$scope.eventListDP=[];

 	$scope.monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	$scope.selectedMonth = $scope.monthLabels[0];
	$scope.mondayDates = "";
	$scope.tuesdayDates = "";
	$scope.wednesdayDates = "";
	$scope.thursdayDates = "";
	$scope.fridayDates = "";
	$scope.saturdayDates = "";
	$scope.sundayDates = "";
	$scope.datesSubmitted = false;
	
	$scope.weekDayLabels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	$scope.selectedWeekday = "";
 	
	
	$scope.submitDates = function(){
		var OK = true;
		var continueflag = new Array();
		var A = validateDatesInput($scope.mondayDates);
		if(A == false){continueflag.push(false); alert("Check input for Monday.");};
		var B = validateDatesInput($scope.tuesdayDates);
		if(B == false){continueflag.push(false); alert("Check input for Tuesday.");};
		var C = validateDatesInput($scope.wednesdayDates);
		if(C == false){continueflag.push(false); alert("Check input for Wednesday.");};
		var D = validateDatesInput($scope.thursdayDates);
		if(D == false){continueflag.push(false); alert("Check input for Thursday.");};
		var E = validateDatesInput($scope.fridayDates);
		if(E == false){continueflag.push(false); alert("Check input for Friday.");};
		var F = validateDatesInput($scope.saturdayDates);
		if(F == false){continueflag.push(false); alert("Check input for Saturday.");};
		var G = validateDatesInput($scope.sundayDates);
		if(G == false){continueflag.push(false); alert("Check input for Sunday.");};
		
		for(var i = 0; i < continueflag.length; i++){
			if(continueflag[i] == false){
				OK = false;
			}
		}
		
		if(OK){
			DB.queryEventsData()
			.then(function(result){
				$scope.datesSubmitted = true;
				$scope.eventsDataResult = result;
			},function(error){
				$scope.dataError();
			});
		}
	};
	
	var validateDatesInput = function(str){
		var rtn = false;
		var ar = str.split(",");
		if(ar.length == 5){
			rtn = true;
		}
		return rtn;	
	};
	
	$scope.submitUpdate = function(id){
		var thisEvent = $scope.eventsDataResult[id];
		var weekVals = getWeekDays(selectedWeekday);
		var month = getMonthVal();
		var dataObj = new Object();
		dataObj.eventID = thisEvent.PRIMARY_ID;
		dataObj.month = month.toString();
		dataObj.weekA = weekVals[0];
		dataObj.weekB = weekVals[1];
		dataObj.weekC = weekVals[2];
		dataObj.weekD = weekVals[3];
		dataObj.weekE = weekVals[4];
		DB.updateEvent(dataObj)
			.then(function(result){
				
			},function(error){
				$scope.dataError();
			});
	};
	
	var getWeekDays = function(day){
		var rtn;
		switch(day){
			case "Monday":rtn = $scope.mondayDates.split(",");break;
			case "Tuesday":rtn = $scope.tuesdayDates.split(",");break;
			case "Wednesday":rtn = $scope.wednesdayDates.split(",");break;
			case "Thursday":rtn = $scope.thursdayDates.split(",");break;
			case "Friday":rtn = $scope.fridayDates.split(",");break;
			case "Saturday":rtn = $scope.saturdayDates.split(",");break;
			case "Sunday":rtn = $scope.sundayDates.split(",");break;
		}
		return rtn;
	};
	
	var getMonthVal = function(){
		for(var i = 0; i < $scope.monthLabels.length; i++){
			if($scope.selectedMonth == $scope.monthLabels[i]){
				return i + 1;
			}
		};
	};
 	

 	

 	
 	$scope.dataError = function(){
 		$state.transitionTo('error');
 	};

 	


 	
 }]);