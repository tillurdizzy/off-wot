'use strict';

APP.controller('MapCtrl',['$scope','sqlDb','mapSrvc', function ($scope,sqlDb,mapSrvc) {


	$scope.formstate = new Object();
	$scope.formstate.visible = false;
	$scope.formstate.role = 'hidden';

	$scope.showHeavy = true;
	$scope.showMedium = true;
	$scope.showLight = true;
	$scope.showArty = true;
	$scope.showDestroyer = true;
	$scope.showDanger = true;

	var DB = sqlDb;
	var COM = mapSrvc;

	//These 3 are dataProviders for selection dropdown
	$scope.mapList = COM.mapList;
	$scope.drawTypeList = COM.drawTypeList;
	$scope.spawnLocationList = COM.spawnLocationList;

	// Default (init) dropdown selections
	$scope.selectedMap = COM.mapList[0];
	$scope.selectedType = $scope.drawTypeList[0];
	$scope.selectedSpawn = $scope.spawnLocationList[0];

	// Share defult with Service
	COM.currentMapName = $scope.selectedMap.value;
	COM.mapUrl = $scope.selectedMap.url;
	COM.spawntype = $scope.selectedSpawn.value;
	COM.drawType = $scope.selectedType.value;
	

	$scope.selectMap = function(mapListObj){
		$scope.selectedMap = mapListObj;
		COM.currentMapName = mapListObj.value;
		COM.mapUrl = mapListObj.url;
		//COM.currentMapData = DB.returnMapData($scope.selectedMap.value);
		//var mapMarkerResult
		DB.getMapMarkers($scope.selectedMap.value).then(function(result){
			COM.currentMapData = result;
			$scope.$broadcast('event:newMapImage');
		});
		
	};

	$scope.saveMarker = function(){
		DB.insertData(COM.newMarker).
		then(function(result){
			console.log("saveMarker result: " + result.result + "PARAMS: " +result.params);
			$scope.hideForm();

		},function(result){
			
		});
	}

	$scope.deleteMarker = function(){
		DB.removeMarker(COM.removeID).
		then(function(result){
			console.log("deleteMarker result: " + result.result + "PARAMS: " +result.params);
			$scope.hideForm();
			DB.getMapMarkers($scope.selectedMap.value).then(function(result){
				COM.currentMapData = result;
				$scope.$broadcast('event:refreshMap');
			});
		},function(result){
			
		});
	};

	$scope.cancelDelete = function(){
		$scope.formstate.visible = false;
		$scope.formstate.role = 'hidden';
	};

	$scope.cancelForm = function(){
		$scope.formstate.visible = false;
		$scope.formstate.role = 'hidden';
	};

	// button click to show form
	$scope.showForm = function(){
		$scope.formstate.visible = true;
		$scope.formstate.role = 'placeMarker';
	};

	$scope.hideForm = function(){	
		$scope.formstate.visible = false;
		$scope.formstate.role = 'hidden';
	};

	$scope.rejectForm = function(){	
		$scope.formstate.role = 'placeMarker';
		$scope.$broadcast('event:eraseLastDraw');
	};

	DB.queryDB().then(function(result){
		//$rootScope.currentMapData = DB.returnMapData('abbey');
		$scope.$broadcast('dbquery-success');
		$scope.selectMap($scope.selectedMap);
	});

	$scope.selectDrawType = function(typeObj){
		$scope.selectedType = typeObj;
		COM.drawType = typeObj.value;
	};
	$scope.selectSpawnType = function(typeObj){
		$scope.selectedSpawn = typeObj;
		COM.spawntype = typeObj.value;
	};

	$scope.filterMapLayers = function(){
		var filters = new Object();
		filters.heavy = $scope.showHeavy;
		filters.light = $scope.showLight;
		filters.medium = $scope.showMedium;
		filters.destroyer = $scope.showDestroyer;
		filters.arty = $scope.showArty;
		filters.danger = $scope.showDanger;
		$scope.$broadcast('event:updateLayerFilters',filters);
	}


}]);