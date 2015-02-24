'use strict';

 APP.controller('EventsEditCtrl',['$scope','eventsDb','VarsSrvc', function ($scope,eventsDb,VarsSrvc) {
 	var DB = eventsDb;
 	
 	var ME = "eventEDITCtrl: ";
	var eventImagesPath = "http://bluewaveproduction.com/wot/events/images/";
 	$scope.eventsDataResult;
 	$scope.selectedEvent = new Object();
	$scope.selectedEventTableDP = new Array();
	
	$scope.submitted = false;
	
	$scope.weekDayLabels = VarsSrvc.weekDayObjects;
	$scope.zoneList = VarsSrvc.zoneList;
	$scope.timeList = VarsSrvc.timeList;
	$scope.timeListB = VarsSrvc.timeListB;
	$scope.zoneOffset = VarsSrvc.zoneOffset;
	$scope.tierList = VarsSrvc.tierList;
	$scope.imageList = DB.imageList;
	$scope.sortValObjects = VarsSrvc.sortValObjects;
	
	$scope.deleteWarning = false;
	
	
	//Form models
	$scope.isActive;
	$scope.editedTitle;
	$scope.editedHost;
	$scope.editedTiers;
	$scope.editedTime;
	$scope.selectedPhoto;
	$scope.selectedZone;
	$scope.currentZone;
	$scope.selectedLow;
	$scope.selectedHigh;
	$scope.selectedBegin;
	$scope.selectedEnd;
	$scope.selectedDay;
	$scope.selectedSort;
	$scope.currentDay;
	$scope.instOne;
	$scope.instTwo;
	$scope.instThree;
	$scope.instFour;
	$scope.instFive;
	$scope.selectedPhotoFullPath;
	
	var resetFormModels = function(){
		$scope.isActive = "";
		$scope.editItem = "";
		$scope.editedTitle = "";
		$scope.editedHost = "";
		$scope.editedTiers = "";
		$scope.editedTime = "";
		$scope.selectedPhoto = $scope.imageList[0];
		$scope.selectedPhotoFullPath = eventImagesPath + $scope.selectedPhoto;
		$scope.selectedZone = $scope.zoneList[0];
		$scope.currentZone = "UTC"
		$scope.selectedLow = $scope.tierList[0];
		$scope.selectedHigh = $scope.tierList[1];
		$scope.selectedBegin = $scope.timeList[0];
		$scope.selectedEnd =$scope.timeListB[0];
		$scope.selectedDay =$scope.weekDayLabels[0];
		$scope.currentDay = "Sunday";
		$scope.selectedSort = $scope.sortValObjects[0];
		$scope.instOne = 0;
		$scope.instTwo = 0;
		$scope.instThree = 0;
		$scope.instFour = 0;
		$scope.instFive = 0;
		$scope.deleteWarning = false;
	}
	
	$scope.getEvents = function(){
		$scope.editItem = "";
		DB.refreshEventData().then
		(function(result){
			$scope.eventsDataResult = result;
			$scope.selectedEvent = $scope.eventsDataResult[0];
			$scope.parseSelectedEvent($scope.selectedEvent);
		},function(error){
			$scope.dataError();
		});
	};
	
	$scope.parseSelectedEvent = function(evtObj){
		resetFormModels();
		$scope.selectedEventTableDP = new Array();
		
		var tableObj = new Object();
 		tableObj.item = "Active";
		$scope.isActive = evtObj.active;
		tableObj.detail = evtObj.active;
 		$scope.selectedEventTableDP.push(tableObj);
		
		
		var tableObj = new Object();
 		tableObj.item = "Title";
		tableObj.detail = evtObj.title;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Host";
		tableObj.detail = evtObj.host;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Tiers";
		tableObj.detail = evtObj.tiers;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Time";
		tableObj.detail = evtObj.timeDisplay;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Zone";
		tableObj.detail = evtObj.zone;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Photo";
		tableObj.detail = evtObj.photo;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Day";
		tableObj.detail = evtObj.dayOfWeek;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Sort";
		tableObj.detail = evtObj.sortVal;
 		$scope.selectedEventTableDP.push(tableObj);
		
		tableObj = new Object();
 		tableObj.item = "Dates";
		tableObj.detail = evtObj.weekA + "," + evtObj.weekB + "," + evtObj.weekC + "," + evtObj.weekD + "," + evtObj.weekE;
 		$scope.selectedEventTableDP.push(tableObj);
		
		$scope.editItem = "";
	};
	
	$scope.editThisItem = function(index){
		$scope.submitted = false;
		switch(index){
			case 0:
				$scope.editItem="active";break;
			case 1:
				$scope.editItem="title";break;
			case 2:
				$scope.editItem="host";break;
			case 3:
				$scope.editItem="tiers";break;
			case 4:
				$scope.editItem="time";break;
			case 5:
				$scope.editItem="zone";break;
			case 6:
				$scope.editItem="photo";break;
			case 7:
				$scope.editItem="day";break;
			case 8:
				$scope.editItem="sort";break;
			case 9:
				$scope.editItem="dates";break;
		}
	};
	
	$scope.toggleActive = function(bol){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
		dataObj.itemEdit = bol;
		DB.updateEventActive(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	$scope.selectPhoto = function(imgStr){
		$scope.selectedPhotoFullPath = eventImagesPath + imgStr;
	};
	
	$scope.selectZone = function(zoneListObj){
		$scope.selectedZone = zoneListObj;
		$scope.currentZone = zoneListObj.value;		
	};
	
	$scope.selectDay = function(weekListObj){
		$scope.selectedDay = weekListObj;
		$scope.currentDay = weekListObj.label;	
	};
	
	$scope.selectSort = function(sortListObj){
		$scope.selectedSort = sortListObj;
	};


	$scope.selectBegin = function(timeListObj){
		$scope.selectedBegin = timeListObj;
	};

	$scope.selectEnd = function(timeListObj){
		$scope.selectedEnd = timeListObj;
	};

	$scope.selectLow = function(tierListObj){
		$scope.selectedLow = tierListObj;
	};

	$scope.selectHigh = function(tierListObj){
		$scope.selectedHigh = tierListObj;
	};
	
	$scope.submitEditForm = function(isValid){
		$scope.submitted = true;
		if(isValid){
			switch($scope.editItem){
				case "title":submitEventTitle();break;
				case "host":submitEventHost();break;
				case "tiers":submitEventTiers();break;
				case "time":submitEventTime();break;
				case "zone":submitEventZone();break;
				case "day":submitEventDay();break;
				case "sort":submitEventSort();break;
				case "dates":submitEventDates();break;
				case "photo":submitEventPhoto();break;
			}
		};
 	};
	
	var submitEventTiers = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.editedTiers;
		dataObj.tier_low = $scope.selectedLow.value;
		dataObj.tier_high = $scope.selectedHigh.value;
 		DB.updateEventTiers(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
				
		},function(error){
			$scope.dataError();
		});
	};
	
	var submitEventTime = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.editedTime;
		dataObj.inputBeg = $scope.selectedBegin.hour;
		dataObj.inputEnd = $scope.selectedEnd.hour;
 		DB.updateEventTime(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			$scope.dataError();
		});
	};
	
	
	var submitEventTitle = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.editedTitle;
 		DB.updateEventTitle(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			$scope.dataError();
		});
	};
	
	var submitEventHost = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.editedHost;
 		DB.updateEventHost(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			$scope.dataError();
		});
	};
	
	var submitEventZone = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.currentZone;
 		DB.updateEventZone(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	var submitEventPhoto = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.selectedPhoto;
 		DB.updateEventPhoto(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	var submitEventDay = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.currentDay;
 		DB.updateEventDay(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	var submitEventSort = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.itemEdit = $scope.selectedSort.value;
 		DB.updateEventSort(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	var submitEventDates = function(){
		var dataObj = new Object();
		dataObj.eventID = $scope.selectedEvent.PRIMARY_ID;
 		dataObj.weekA = $scope.instOne;
		dataObj.weekB = $scope.instTwo;
		dataObj.weekC = $scope.instThree;
		dataObj.weekD = $scope.instFour;
		dataObj.weekE = $scope.instFive;
		dataObj.month = $scope.selectedEvent.month;
 		DB.updateEventDates(dataObj).then
		(function(result){
			if(result.result==true){
				$scope.editItem="success";
			}else{
				alert(result.msg);
			};
		},function(error){
			alert(error);
		});
	};
	
	
 	$scope.dataError = function(){
 		alert("Error");
 	};

 	


 	
 }]);