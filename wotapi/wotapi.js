'use strict';


APP.controller('WOTAPICtrl', ['$scope','WoTSrvc',function ($scope,WoTSrvc) {
	
	$scope.vehicles = [];
	$scope.selectedVehicle;
	$scope.vehicleDetails = new Object();

	var parseVehicleData = function(){
		var tempArr = new Array();
		var dataObj = WoTSrvc.vehicleResult.data.data;
		for (var key in dataObj) {
		   var obj = dataObj[key];
		  tempArr.push(obj);
		}
		$scope.vehicles = _.sortBy(tempArr, function (i) { return i.name_i18n.toLowerCase(); });
		$scope.selectedVehicle =  $scope.vehicles[0];
	}

	var getVehicles = function(){
		 WoTSrvc.getVehicleList().then(function(result){
 			parseVehicleData();
 		})
	};

	$scope.selectVehicle = function(v){
		var tankID = $scope.selectedVehicle.tank_id;
		WoTSrvc.getVehicleDetails(tankID).then(function(result){
 			$scope.vehicleDetails = result;
 		})
	}

	//getVehicles();
	
 }]);


