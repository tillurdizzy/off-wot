'use strict';
//google.load("visualization", "1", {packages: ["timeline"]});

APP.controller('ScheduleCtrl',['$scope','scheduleDbSrvc','VarsSrvc','$state','cookieSrvc',function ($scope,scheduleDbSrvc,VarsSrvc,$state,cookieSrvc) {
	$scope.selectedZoneDescription = 'Greenwich Mean Time, UTC -0 hours';
 	//$scope.currentTimelineData = [];
 	$scope.currentTableData = [];
 	$scope.newMemberData = [];
 	$scope.gamerCookie = cookieSrvc.gamerCookie;
 	$scope.searchResultsDisplay = false;
 	$scope.searchTimeDisplay = "";
 	 $scope.isLoading = false;
 	
 	$scope.displayType = "ALL";// either ALL or EVENTS
	var DB = scheduleDbSrvc;
	var formDataSchedule = new Object();
	//var formDataNewMember = new Object();
	
	$scope.formActive = false;
	$scope.editActive = false;
	$scope.searchActive = false;
  	//$scope.dataTable = new google.visualization.DataTable();
  	$scope.oneDay = 3600000*24;

	/*$scope.dataTable.addColumn({ type: 'string', id: 'Member' });
	$scope.dataTable.addColumn({ type: 'string', id: 'Tiers' });
	$scope.dataTable.addColumn({ type: 'date', id: 'Start' });
	$scope.dataTable.addColumn({ type: 'date', id: 'End' });*/


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
		}		
	};

	function getAPage() {
        var data = [];
        for (var j = 0; j < 20; j++) {
            data.push(createRandomItem());
        }
        return data;
    }

    var lastStart = 0;
    var maxNodes = 40;

	$scope.callServer = function getData(tableState) {

            //here you could create a query string from tableState
            //fake ajax call
            $scope.isLoading = true;

            $timeout(function () {

                //if we reset (like after a search or an order)
                if (tableState.pagination.start === 0) {
                    $scope.rowCollection = getAPage();
                } else {
                    //we load more
                    $scope.rowCollection = $scope.rowCollection.concat(getAPage());

                    //remove first nodes if needed
                    if (lastStart < tableState.pagination.start && $scope.rowCollection.length > maxNodes) {
                        //remove the first nodes
                        $scope.rowCollection.splice(0, 20);
                    }
                }

                lastStart = tableState.pagination.start;

                $scope.isLoading = false;
            }, 1000);

        };

    $scope.rowCollection = getAPage();

	$scope.resetTable = function(){
		$scope.searchResultsDisplay = false;
		$scope.displayType = "ALL";
		$scope.currentTableData =  DB.returnTableData($scope.selectedZone.value);
	}

	
	DB.querySchedule().then(function(result){
		DB.queryEvents().then(function(result){
			$scope.currentTableData =  DB.returnTableData('UTC');
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