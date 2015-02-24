'use strict';
//google.load("visualization", "1", {packages: ["timeline"]});

APP.controller('ScheduleCtrl',['$scope','scheduleDbSrvc','VarsSrvc','$state','cookieSrvc',function ($scope,scheduleDbSrvc,VarsSrvc,$state,cookieSrvc) {
	$scope.selectedZoneDescription = 'Greenwich Mean Time, UTC -0 hours';
 	//$scope.currentTimelineData = [];
 	$scope.currentTableData = [];
 	var tablePages = [];
 	$scope.currentTablePage = [];// only what shows in table - 12 rows at a time
 	$scope.prevBtnDisabled = true;
 	$scope.nextBtnDisabled = true;
 	var numPages = 0;
 	var currentPage = 0;


 	$scope.newMemberData = [];
 	$scope.gamerCookie = cookieSrvc.gamerCookie;
 	$scope.searchResultsDisplay = false;
 	$scope.searchTimeDisplay = "";
 	$scope.regMemberCount = 0;
 	
 	//$scope.itemsByPage=15;
 	
 	$scope.displayType = "ALL";// either ALL or EVENTS
	var DB = scheduleDbSrvc;
	var formDataSchedule = new Object();
	//var formDataNewMember = new Object();
	
	$scope.formActive = false;
	$scope.editActive = false;
	$scope.searchActive = false;
  	//$scope.dataTable = new google.visualization.DataTable();
  	$scope.oneDay = 3600000*24;


    $scope.zoneList = VarsSrvc.zoneList;

	$scope.timeList = VarsSrvc.timeList;
	
	$scope.zoneOffset = VarsSrvc.zoneOffset;

	$scope.tierList = VarsSrvc.tierList;

	$scope.selectedZone = $scope.zoneList[0];
	$scope.currentZone = "UTC"
	$scope.selectedLow = $scope.tierList[0];
	$scope.selectedHigh = $scope.tierList[1];
	$scope.selectedBegin = $scope.timeList[0];
	$scope.selectedEnd =$scope.timeList[0];

	$scope.selectZone = function(zoneListObj){
		$scope.selectedZone = zoneListObj;
		$scope.currentZone = zoneListObj.value;
		$scope.selectedZoneDescription = zoneListObj.description;
		if ($scope.displayType == "EVENTS") {
			$scope.currentTableData =  DB.returnEventsTableData($scope.selectedZone.value);
		}else{
			$scope.currentTableData =  DB.returnTableData($scope.selectedZone.value);
		};
		splitToPages();
	};

	$scope.resetTable = function(){
		$scope.searchResultsDisplay = false;
		$scope.displayType = "ALL";
		$scope.currentTableData =  DB.returnTableData($scope.selectedZone.value);
		splitToPages();
	};

	$scope.showNextPage = function(){
		currentPage = currentPage+1;
		$scope.currentTablePage = tablePages[currentPage];
		setButtonsEnabled();
	}
	$scope.showPreviousPage = function(){
		currentPage = currentPage-1;
		$scope.currentTablePage = tablePages[currentPage];
		setButtonsEnabled();
	}

	var setButtonsEnabled = function(){
		if(tablePages.length == 1){
			$scope.nextBtnDisabled = true;
			$scope.prevBtnDisabled = true;
		}else if(currentPage == tablePages.length-1){
			$scope.nextBtnDisabled = true;
			$scope.prevBtnDisabled = false;
		}
		else if(currentPage == 0){
			$scope.nextBtnDisabled = false;
			$scope.prevBtnDisabled = true;
		}
		else if(currentPage > 0 && currentPage<tablePages.length-1){
			$scope.nextBtnDisabled = false;
			$scope.prevBtnDisabled = false;
		};
		
	};

	
	DB.querySchedule().then(function(result){
		DB.queryEvents().then(function(result){
			$scope.currentTableData =  DB.returnTableData('UTC');
			$scope.regMemberCount = DB.returnMemberCount();
			splitToPages();
		})
	});


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

	// used in Find
	$scope.selectTier = function(tierListObj){
		$scope.selectedTier = tierListObj;
	};

	$scope.showNewForm = function(){
		$scope.editActive = true;
		$scope.formActive = true;
	};

	$scope.showSearchForm = function(){
		$scope.searchActive = true;
		$scope.formActive = true;
	};



	$scope.hideForm = function(){
		$scope.searchActive = false;
		$scope.formActive = false;
		$scope.editActive = false;
	}

	$scope.showEventsOnly = function(){
		$scope.currentTableData =  DB.returnEventsTableData($scope.selectedZone.value);
		$scope.displayType = "EVENTS";
		$scope.searchResultsDisplay = true;
		splitToPages();
	}

	$scope.submitSearchForm = function(){
		$scope.searchActive = false;
		$scope.formActive = false;
		
		var startTime = $scope.selectedBegin.hour;
		$scope.selectedBegin = null;
		$scope.selectedEnd = null;
		$scope.currentTableData = DB.searchFarts(startTime,$scope.currentZone);
		$scope.searchTimeDisplay = VarsSrvc.returnClockHour(startTime) + " " + $scope.currentZone;
		$scope.searchResultsDisplay = true;
		splitToPages();
	};

	var splitToPages = function(){
		var pageLength = 12;
		$scope.previousBtnEnabled = false;
 		$scope.nextBtnEnabled = false;
		currentPage = 0;
		tablePages = [];
		numPages = Math.ceil($scope.currentTableData.length/pageLength);
		var maxNum = $scope.currentTableData.length;
		var begSlice = 0;
		var endSlice = pageLength;
		for (var i = 0; i < numPages; i++) {
			var thisPage=[];
			thisPage = $scope.currentTableData.slice(begSlice,endSlice);
			tablePages.push(thisPage);
			begSlice+=pageLength;
			endSlice+=pageLength;
			if(i == numPages-1){
				endSlice = maxNum-1;
			};
		};
		$scope.currentTablePage = tablePages[0];
		setButtonsEnabled();
	};

	$scope.convertTo_ms = function(hour){
		var localMsec;
		var localDate = new Date(0,0,0,hour,0,0);
		localMsec = localDate.getTime();
		return localMsec;
	}

	$scope.isRegistered = function(){
		if($scope.gamerCookie!=null){
			$scope.newMemberComplete = true;
		}
	};

	$scope.isRegistered();

 }]);