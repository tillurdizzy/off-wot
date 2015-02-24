'use strict';

 APP.controller('EventsUpdateCtrl',['$scope','eventsDb', function ($scope,eventsDb) {
 	var DB = eventsDb;
 	
 	var ME = "eventUPDATECtrl: ";
 	var evtdata;
 	$scope.eventListDP=[];
	$scope.weekDayLabels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
 	$scope.monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	
	var thisMonthObj = Date.today();
	var thisMonthInt = thisMonthObj.getMonth();
	$scope.thisMonthStr = $scope.monthLabels[thisMonthInt];
	
	var nextMonthObj = Date.today().addMonths(1);
	var nextMonthInt = nextMonthObj.getMonth();
	$scope.nextMonthStr = $scope.monthLabels[nextMonthInt];
	
	var lastMonthObj = Date.today().addMonths(-1);
	var lastMonthInt = lastMonthObj.getMonth();
	$scope.lastMonthStr = $scope.monthLabels[lastMonthInt];
	
	$scope.sundays = [];
	$scope.mondays = [];
	$scope.tuesdays = [];
	$scope.wednesdays = [];
	$scope.thursdays = [];
	$scope.fridays = [];
	$scope.saturdays = [];
	var lastDayReturned = 0;// Used to track nth days to determine last occurance
	var eventUpdateCount = 0;
	$scope.eventUpdateErrors = [];
	$scope.updateComplete = false;
	$scope.requestQue = [];
	$scope.fiveXResetComplete = false;
	$scope.newMemResetComplete = false;
	
	var updateMonthInt = 0;
	var sundaysVO = new Object();
	var mondaysVO = new Object();
	var tuesdaysVO = new Object();
	var wednesdaysVO = new Object();
	var thursdaysVO = new Object();
	var fridaysVO = new Object();
	var saturdaysVO = new Object();
	
	$scope.setUpdateMonth = function(m){
		switch(m){
			case -1:showCalendar(lastMonthObj.clone());updateMonthInt=lastMonthInt;break;
			case 0:showCalendar(thisMonthObj.clone());updateMonthInt=thisMonthInt;break;
			case 1:showCalendar(nextMonthObj.clone());updateMonthInt=nextMonthInt;break;
		};
	};
	
	var showCalendar = function(dateObj){
		$scope.sundays = [];
		$scope.mondays = [];
		$scope.tuesdays = [];
		$scope.wednesdays = [];
		$scope.thursdays = [];
		$scope.fridays = [];
		$scope.saturdays = [];
		$scope.lastDayReturned
		
		var yearInt = dateObj.getFullYear();
		var monthInt = dateObj.getMonth();
		
		// Sundays
		lastDayReturned = 0;
		for(var i=1; i < 6; i++){
			$scope.sundays.push(returnDayOfMonth(dateObj.clone(),0,i));
		};
		
		// Mondays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.mondays.push(returnDayOfMonth(dateObj.clone(),1,i));
		};
		
		// Tuesdays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.tuesdays.push(returnDayOfMonth(dateObj.clone(),2,i));
		};
		
		// Wednesdays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.wednesdays.push(returnDayOfMonth(dateObj.clone(),3,i));
		};
		
		// Thursdays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.thursdays.push(returnDayOfMonth(dateObj.clone(),4,i));
		};
		
		// Fridays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.fridays.push(returnDayOfMonth(dateObj.clone(),5,i));
		};
		
		// Saturdays
		lastDayReturned = 0;
		for(i=1; i < 6; i++){
			$scope.saturdays.push(returnDayOfMonth(dateObj.clone(),6,i));
		};
	};
	
	
	
	var returnDayOfMonth = function(obj,day,n){
		var myDate = obj.clone();
		var dateOccurance = myDate.moveToNthOccurrence(day,n);
		var dayOfMonth = dateOccurance.getDate();
		if(dayOfMonth<lastDayReturned){
			dayOfMonth = 0;
		};
		lastDayReturned = dayOfMonth;
		return dayOfMonth; 
	};
	
	
	
	$scope.submitUpdate = function(){
		$scope.eventUpdateErrors = [];
		$scope.requestQue = [];
		createVOs();
		evtdata = DB.eventsDataResult;
		eventUpdateCount = 0;
		var dataObj;
		for(var i=0; i < evtdata.length; i++){
			if(evtdata[i].dayOfWeek=="Sunday"){
				dataObj = cloneObject(sundaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Monday"){
				dataObj = cloneObject(mondaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Tuesday"){
				dataObj = cloneObject(tuesdaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Wednesday"){
				dataObj = cloneObject(wednesdaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Thursday"){
				dataObj = cloneObject(thursdaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Friday"){
				dataObj = cloneObject(fridaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}else if(evtdata[i].dayOfWeek=="Saturday"){
				dataObj = cloneObject(saturdaysVO);
				dataObj.eventID = parseInt(evtdata[i].PRIMARY_ID);
				updateRequest(dataObj);
			}
		};
	};
	
	var cloneObject = function(copyFrom){
		var copyTo = new Object();
		copyTo.weekA = copyFrom.weekA;
		copyTo.weekB = copyFrom.weekB;
		copyTo.weekC = copyFrom.weekC;
		copyTo.weekD = copyFrom.weekD;
		copyTo.weekE = copyFrom.weekE;
		copyTo.month = copyFrom.month;
		return copyTo;
	};
	
	var createVOs = function(){
		sundaysVO = new Object();
		mondaysVO = new Object();
		tuesdaysVO = new Object();
		wednesdaysVO = new Object();
		thursdaysVO = new Object();
		fridaysVO = new Object();
		saturdaysVO = new Object();
		
		sundaysVO.weekA = $scope.sundays[0];
		sundaysVO.weekB = $scope.sundays[1];
		sundaysVO.weekC = $scope.sundays[2];
		sundaysVO.weekD = $scope.sundays[3];
		sundaysVO.weekE = $scope.sundays[4];
		sundaysVO.month = updateMonthInt;
		
		mondaysVO.weekA = $scope.mondays[0];
		mondaysVO.weekB = $scope.mondays[1];
		mondaysVO.weekC = $scope.mondays[2];
		mondaysVO.weekD = $scope.mondays[3];
		mondaysVO.weekE = $scope.mondays[4];
		mondaysVO.month = updateMonthInt;
		
		tuesdaysVO.weekA = $scope.tuesdays[0];
		tuesdaysVO.weekB = $scope.tuesdays[1];
		tuesdaysVO.weekC = $scope.tuesdays[2];
		tuesdaysVO.weekD = $scope.tuesdays[3];
		tuesdaysVO.weekE = $scope.tuesdays[4];
		tuesdaysVO.month = updateMonthInt;
		
		wednesdaysVO.weekA = $scope.wednesdays[0];
		wednesdaysVO.weekB = $scope.wednesdays[1];
		wednesdaysVO.weekC = $scope.wednesdays[2];
		wednesdaysVO.weekD = $scope.wednesdays[3];
		wednesdaysVO.weekE = $scope.wednesdays[4];
		wednesdaysVO.month = updateMonthInt;
		
		thursdaysVO.weekA = $scope.thursdays[0];
		thursdaysVO.weekB = $scope.thursdays[1];
		thursdaysVO.weekC = $scope.thursdays[2];
		thursdaysVO.weekD = $scope.thursdays[3];
		thursdaysVO.weekE = $scope.thursdays[4];
		thursdaysVO.month = updateMonthInt;
		
		fridaysVO.weekA = $scope.fridays[0];
		fridaysVO.weekB = $scope.fridays[1];
		fridaysVO.weekC = $scope.fridays[2];
		fridaysVO.weekD = $scope.fridays[3];
		fridaysVO.weekE = $scope.fridays[4];
		fridaysVO.month = updateMonthInt;
		
		saturdaysVO.weekA = $scope.saturdays[0];
		saturdaysVO.weekB = $scope.saturdays[1];
		saturdaysVO.weekC = $scope.saturdays[2];
		saturdaysVO.weekD = $scope.saturdays[3];
		saturdaysVO.weekE = $scope.saturdays[4];
		saturdaysVO.month = updateMonthInt;
	}
	
	var updateRequest = function(dataObj){
		DB.updateEventDates(dataObj)
			.then(function(result){
				eventUpdateCount+=1;
				console.log('eventUpdateCount ' + eventUpdateCount);
			},function(error){
				$scope.eventUpdateErrors.push(error);
			});
			
		if(eventUpdateCount == evtdata.length){
			$scope.updateComplete = true;
		}
	};
	
	$scope.clearTeams = function(){
 		DB.resetFiveX()
			.then(function(result){
				$scope.fiveXResetComplete = true;
			},function(error){
				$scope.eventUpdateErrors.push(error);
			});
 	};
	
	$scope.removeNewMembers = function(){
		var myDate = Date.today().add({days:-30});
		var myDateMilli = myDate.getTime();
		var dataObj = new Object();
		dataObj.removeDate = myDateMilli;
 		DB.removeNewMembers(dataObj)
			.then(function(result){
				$scope.newMemResetComplete = true;
			},function(error){
				$scope.eventUpdateErrors.push(error);
			});
 	};
	
	
 	
 	$scope.dataError = function(){
 		$state.transitionTo('error');
 	};

 	

 	
 }]);