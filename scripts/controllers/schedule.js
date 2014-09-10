'use strict';
google.load("visualization", "1", {packages: ["timeline"]});

APP.controller('ScheduleCtrl',['$scope','sqlDb',"$state",function ($scope,sqlDb,$state) {
	$scope.selectedZoneDescription = 'Greenwich Mean Time, UTC -0 hours';
 	$scope.currentTimelineData = [];
 	$scope.currentTableData = [];
 	$scope.newMemberComplete = false;
 	$scope.newMemberData = [];
 	$scope.displayType = "Chart";
	var DB = sqlDb;
	var formDataSchedule = new Object();
	var formDataNewMember = new Object();
	
	$scope.formActive = false;
	$scope.editActive = false;
	$scope.searchActive = false;
  	$scope.dataTable = new google.visualization.DataTable();
  	$scope.oneDay = 3600000*24;

	$scope.dataTable.addColumn({ type: 'string', id: 'Member' });
	$scope.dataTable.addColumn({ type: 'string', id: 'Tiers' });
	$scope.dataTable.addColumn({ type: 'date', id: 'Start' });
	$scope.dataTable.addColumn({ type: 'date', id: 'End' });


    $scope.zoneList = [
    {label:'Greenwich',value:'UTC',description:'Greenwich Mean Time, UTC -0 hours'},
    {label:'Europe Central (+1)',value:'ECT',description:'European Central, UTC +1 hours'},
    {label:'Europe Eastern (+2)',value:'EET',description:'Eastern European, UTC +2 hours'},
    {label:'US Atlantic (-4)',value:'AST',description:'Atlantic, UTC -4 hours'},
    {label:'US Eastern (-5)',value:'EST',description:'Eastern, UTC -5 hours'},
    {label:'US Central (-6)',value:'CST',description:'Central, UTC -6 hours'},
    {label:'US Mountain (-7)',value:'MST',description:'Mountain, UTC -7 hours'},
	{label:'US Pacific (-8)',value:'PST',description:'Pacific, UTC -8 hours'},
	{label:'Alaska (-9)',value:'AKST',description:'Alaska, UTC -9 hours'},
	{label:'Hawaii (-10)',value:'HST',description:'Hawaii, UTC -10 hours'},
	{label:'Midway (-11)',value:'MIT',description:'Midway, UTC -11 hours'},
	{label:'New Zealand (+12)',value:'NST',description:'New Zealand, UTC +12 hours'},
	{label:'Solomon (+11)',value:'SST',description:'Solomon Islands, UTC +11 hours'},
	{label:'Australia (+10)',value:'ACT',description:'Australia, UTC +10 hours'},
	{label:'Japan (+9)',value:'JST',description:'Japan, UTC +9 hours'},
	{label:'China (+8)',value:'CTT',description:'China, UTC +8 hours'},
	{label:'Vietnam (+7)',value:'VST',description:'Vietnam, UTC +7 hours'},
	{label:'India (+6)',value:'IST',description:'India, UTC +6 hours'},
	{label:'Pakistan (+5)',value:'PLT',description:'Pakistan, UTC +5 hours'},
	{label:'Middle East (+4)',value:'MET',description:'Middle East, UTC +4 hours'},
	{label:'Africa (+3)',value:'EAT',description:'African, UTC +3 hours'},
	{label:'Argentina (-3)',value:'AGT',description:'African, UTC -3 hours'}];

	$scope.timeList = [
			{clock:'12 AM',hour:0},
			{clock:' 1 AM',hour:1},
			{clock:' 2 AM',hour:2},
			{clock:' 3 AM',hour:3},
			{clock:' 4 AM',hour:4},
			{clock:' 5 AM',hour:5},
			{clock:' 6 AM',hour:6},
			{clock:' 7 AM',hour:7},
			{clock:' 8 AM',hour:8},
			{clock:' 9 AM',hour:9},
			{clock:'10 AM',hour:10},
			{clock:'11 AM',hour:11},
			{clock:'Noon',hour:12},
			{clock:' 1 PM',hour:13},
			{clock:' 2 PM',hour:14},
			{clock:' 3 PM',hour:15},
			{clock:' 4 PM',hour:16},
			{clock:' 5 PM',hour:17},
			{clock:' 6 PM',hour:18},
			{clock:' 7 PM',hour:19},
			{clock:' 8 PM',hour:20},
			{clock:' 9 PM',hour:21},
			{clock:'10 PM',hour:22},
			{clock:'11PM',hour:23},
			{clock:'Midnight',hour:24}
		];
	
	

	$scope.zoneOffset = [
		{zone:'UTC',offset:0},
		{zone:'ECT',offset:3600000*1},
		{zone:'EET',offset:3600000*2},
		{zone:'AST',offset:3600000*-4},
		{zone:'EST',offset:3600000*-5},
		{zone:'CST',offset:3600000*-6},
		{zone:'MST',offset:3600000*-7},
		{zone:'PST',offset:3600000*-8},
		{zone:'AKST',offset:3600000*-9},
		{zone:'HST',offset:3600000*-10},
		{zone:'MIT',offset:3600000*-11},
		{zone:'NST',offset:3600000*12},
		{zone:'SST',offset:3600000*11},
		{zone:'ACT',offset:3600000*10},
		{zone:'JST',offset:3600000*9},
		{zone:'CTT',offset:3600000*8},
		{zone:'VST',offset:3600000*7},
		{zone:'IST',offset:3600000*6},
		{zone:'PLT',offset:3600000*5},
		{zone:'MET',offset:3600000*4},
		{zone:'EAT',offset:3600000*3},
		{zone:'AGT',offset:3600000*-3}
	];

	$scope.tierList = [
		{tier:'I',value:1},
		{tier:'II',value:2},
		{tier:'III',value:3},
		{tier:'IV',value:4},
		{tier:'V',value:5},
		{tier:'VI',value:6},
		{tier:'VII',value:7},
		{tier:'VIII',value:8},
		{tier:'IX',value:9},
		{tier:'X',value:10}
	];



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
		if ($scope.displayType == "Chart") {
			$scope.currentTimelineData = DB.returnTimelineData($scope.selectedZone.value);
			$scope.updateChart();
		}else{
			$scope.currentTableData =  DB.returnTableData($scope.selectedZone.value);
		}		
	};

	$scope.updateChart = function(){
		$scope.dataTable.removeRows(0,$scope.dataTable.getNumberOfRows());
		for (var i = 0; i < $scope.currentTimelineData.length; i++) {
			var barLabelTiers = "Tiers " + $scope.currentTimelineData[i].tier_low + "-" + $scope.currentTimelineData[i].tier_high;
			$scope.dataTable.addRow([$scope.currentTimelineData[i].member, barLabelTiers, $scope.currentTimelineData[i].beg, $scope.currentTimelineData[i].end]);
		}
	};

	
	DB.querySchedule().then(function(result){
		$scope.currentTimelineData = DB.returnTimelineData('UTC');
		$scope.updateChart();
		$scope.currentTableData =  DB.returnTableData('UTC');
	});

	DB.queryNewMembers().then(function(result){
		$scope.newMemberData = DB.returnNewMembers();
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

	$scope.selectDisplayType = function(){
		if ($scope.displayType == "Chart") {
			$scope.currentTimelineData = DB.returnTimelineData($scope.selectedZone.value);
			$scope.updateChart();
		}else{
			$scope.currentTableData =  DB.returnTableData($scope.selectedZone.value);
		}		
	};

	$scope.submitScheduleForm = function(){
		if($scope.selectedBegin != null && $scope.selectedEnd != null){
			$scope.editActive = false;
			$scope.formActive = false;
			formDataSchedule = new Object();
			formDataSchedule.member = $scope.xblgamertag;
			formDataSchedule.zone = $scope.currentZone;
			formDataSchedule.tier_low = $scope.selectedLow.value;
			formDataSchedule.tier_high = $scope.selectedHigh.value;
			formDataSchedule.beg = $scope.convertTo_UTC(parseInt($scope.selectedBegin.hour));
			formDataSchedule.end = $scope.convertTo_UTC(parseInt($scope.selectedEnd.hour));
			formDataSchedule.inputBeg = $scope.selectedBegin.hour;
			formDataSchedule.inputEnd = $scope.selectedEnd.hour;
			$scope.selectedBegin = null;
			$scope.selectedEnd = null;
			DB.insertNewFart(formDataSchedule);
			$scope.xblgamertag = "";
		}
	};

	$scope.submitNewMemberForm = function(){
		if($scope.selectedBegin != null && $scope.selectedEnd != null){
			formDataSchedule = new Object();
			formDataSchedule.member = $scope.xblgamertag;
			formDataSchedule.zone = $scope.currentZone;
			formDataSchedule.tier_low = $scope.selectedLow.value;
			formDataSchedule.tier_high = $scope.selectedHigh.value;
			formDataSchedule.inputBeg = $scope.selectedBegin.hour;
			formDataSchedule.inputEnd = $scope.selectedEnd.hour;
			formDataSchedule.beg = $scope.convertTo_ms(parseInt($scope.selectedBegin.hour));
			formDataSchedule.end = $scope.convertTo_ms(parseInt($scope.selectedEnd.hour));
			if(formDataSchedule.beg > formDataSchedule.end){
				formDataSchedule.beg -= $scope.oneDay;
			}
			$scope.selectedBegin = null;
			$scope.selectedEnd = null;
			DB.insertNewSchedule(formDataSchedule);

			formDataNewMember = new Object();
			formDataNewMember.name=$scope.membername;
			formDataNewMember.gamertag=$scope.xblgamertag;
			formDataNewMember.base=$scope.memberbase;
			formDataNewMember.age=$scope.memberage;
			formDataNewMember.lowtier=$scope.selectedLow.value;
			formDataNewMember.hitier = $scope.selectedHigh.value;
			var localDate = new Date();
			formDataNewMember.membersince = localDate.getTime();
			DB.insertNewMember(formDataNewMember).then(function(){
				$scope.membername = "";
				$scope.xblgamertag = "";
				$scope.memberbase = "";
				$scope.newMemberComplete = true;
			});
		}
	};


	$scope.hideForm = function(){
		$scope.searchActive = false;
		$scope.formActive = false;
		$scope.editActive = false;
	}

	$scope.submitSearchForm = function(){
		$scope.searchActive = false;
		$scope.formActive = false;
		
		var startTime = $scope.convertTo_ms(parseInt($scope.selectedBegin.hour));
		$scope.selectedBegin = null;
		$scope.selectedEnd = null;
		$scope.currentTimelineData = DB.searchFarts(startTime,$scope.currentZone,$scope.selectedTier.value);
		$scope.updateChart();
	};

	$scope.convertTo_ms = function(hour){
		var localMsec;
		var localDate = new Date(0,0,0,hour,0,0);
		localMsec = localDate.getTime();
		return localMsec;
	}

 }]);