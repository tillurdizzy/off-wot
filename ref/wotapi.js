'use strict';


APP.controller('WOTAPICtrl', ['$scope','WoTSrvc',function ($scope,WoTSrvc) {
	
	$scope.vehicles = [];
	$scope.selectedVehicle;
	$scope.vehicleDetails = [];

	var parseVehicleData = function(){
		var tempArr = new Array();
		var dataObj = WoTSrvc.vehicleResult;
		for (var key in dataObj) {
		   var obj = dataObj[key];
		  tempArr.push(obj);
		}
		$scope.vehicles = _.sortBy(tempArr, function (i) { return i.name_i18n.toLowerCase(); });
		$scope.selectedVehicle =  $scope.vehicles[0];
	}

	$scope.getVehicles = function(){
		 WoTSrvc.getVehicleList().then(function(result){
 			parseVehicleData();
 		})
	};

	$scope.selectVehicle = function(v){
		var tankID = v.tank_id;
		var tableObj = new Object();
		$scope.vehicleDetails = [];
		WoTSrvc.getVehicleDetails(tankID).then(function(result){

			tableObj.item = "Nation";
			tableObj.detail = result.nation_i18n;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Type";
			tableObj.detail = result.type_i18n;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
			tableObj.item = "Tier";
			tableObj.detail = result.level;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Hit Points";
			tableObj.detail = result.max_health;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Radio Distance";
			tableObj.detail = result.radio_distance;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Speed Limit";
			tableObj.detail = result.speed_limit;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Turret Front";
			tableObj.detail = result.turret_armor_forehead;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Turret Side";
			tableObj.detail = result.turret_armor_board;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Turret Rear";
			tableObj.detail = result.turret_armor_fedd;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Hull Front";
			tableObj.detail = result.vehicle_armor_forehead;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Hull Side";
			tableObj.detail = result.vehicle_armor_board;
 			$scope.vehicleDetails.push(tableObj);

 			tableObj = new Object();
 			tableObj.item = "Hull Rear";
			tableObj.detail = result.vehicle_armor_fedd;
 			$scope.vehicleDetails.push(tableObj);
 		})
	}

	//getVehicles();
	
 }]);


