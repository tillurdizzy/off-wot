'use strict';

APP.controller('MapCtrl',['$scope','$state','mapsDb','mapSrvc','memberSrvc', function ($scope,$state,mapsDb,mapSrvc,memberSrvc) {

	$scope.formstate = new Object();
	$scope.formstate.visible = false;
	$scope.formstate.role = 'hidden';

	/*$scope.showHeavy = true;
	$scope.showMedium = true;
	$scope.showLight = true;
	$scope.showArty = true;
	$scope.showDestroyer = true;
	$scope.showDanger = true;*/

	var ME = "MAPS CTRL: ";
	var DB = mapsDb;
	var COM = mapSrvc;
	var MS = memberSrvc;

	$scope.gamerTag = "";
	$scope.signedIn = false;

	//These 3 are dataProviders for selection dropdown
	$scope.mapList = COM.mapList;
	$scope.drawTypeList = COM.drawTypeList;
	$scope.spawnLocationList = COM.spawnLocationList;
	//$scope.authorList = COM.authorList;

	// Default (init) dropdown selections
	$scope.selectedMap = COM.mapList[0];
	$scope.selectedType = $scope.drawTypeList[0];
	$scope.selectedSpawn = $scope.spawnLocationList[0];
	

	// Share default with Service
	COM.currentMapName = $scope.selectedMap.value;
	COM.mapUrl = $scope.selectedMap.url;
	COM.spawnType = $scope.selectedSpawn.value;
	COM.drawType = $scope.selectedType.value;
	
	
	$scope.selectMap = function(mapListObj){
		$scope.selectedMap = mapListObj;
		COM.currentMapName = mapListObj.value;
		COM.mapUrl = mapListObj.url;
		DB.getMapMarkers($scope.selectedMap.value,$scope.gamerTag).then(function(result){
			COM.currentMapData = result;
			$scope.$broadcast('event:newMapImage');
		});
		
	};

	$scope.saveMarker = function(){
		DB.insertData(COM.newMarker).
		then(function(result){
			//console.log("saveMarker result: " + result.result + " PARAMS: " +result.params);
			$scope.hideForm();
		},function(error){
			
		});
	};

	$scope.savePath = function(){
		var numInserts = COM.newPathObjects.length;
		DB.savePaths(COM.newMarker,COM.newPathObjects);
		$scope.hideForm();
		/*.then(function(result){
			numInserts-=1;
			console.log("savePath result: " + result.result + " # " +numInserts);
			if(numInserts == 0){
				$scope.hideForm();
			}
			

		},function(result){
			
		});*/
	};

	$scope.deleteMarker = function(){
		DB.removeMarker(COM.removeID).
		then(function(result){
			//console.log("deleteMarker result: " + result.result + " PARAMS: " +result.params);
			$scope.hideForm();
			DB.getMapMarkers($scope.selectedMap.value,$scope.gamerTag).then(function(result){
				COM.currentMapData = result;
				$scope.$broadcast('event:refreshMap');
			});
		},function(error){
			
		});
	};

	$scope.cancelDelete = function(){
		$scope.formstate.visible = false;
		$scope.formstate.role = 'hidden';
	};

	$scope.cancelPath = function(){
		$scope.formstate.visible = false;
		$scope.formstate.role = 'hidden';
		COM.newPathObjects = [];
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

	
	
	$scope.selectDrawType = function(typeObj){
		$scope.selectedType = typeObj;
		COM.drawType = typeObj.value;
		if(typeObj.value == "path"){
			$scope.formstate.role = 'createPath';
			COM.newPathObjects = [];
		}
	};

	$scope.selectSpawnType = function(typeObj){
		$scope.selectedSpawn = typeObj;
		COM.spawnType = typeObj.value;
	};

	/*$scope.filterMapLayers = function(){
		var filters = new Object();
		filters.heavy = $scope.showHeavy;
		filters.light = $scope.showLight;
		filters.medium = $scope.showMedium;
		filters.destroyer = $scope.showDestroyer;
		filters.arty = $scope.showArty;
		filters.danger = $scope.showDanger;
		$scope.$broadcast('event:updateLayerFilters',filters);
	};*/

	$scope.getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
		$scope.signedIn = MS.signedIn;
		if($scope.signedIn){
			COM.author = $scope.gamerTag;
		}
 	};

 	$scope.getMemberStatus();

	$scope.selectMap($scope.selectedMap);



}]);