'use strict';

APP.controller('MapCtrl',['$scope','$state','mapsDb','mapSrvc','cookieSrvc','memberSrvc', function ($scope,$state,mapsDb,mapSrvc,cookieSrvc,memberSrvc) {

	$scope.formstate = new Object();
	$scope.formstate.visible = false;
	$scope.formstate.role = 'hidden';

	$scope.showHeavy = true;
	$scope.showMedium = true;
	$scope.showLight = true;
	$scope.showArty = true;
	$scope.showDestroyer = true;
	$scope.showDanger = true;
	$scope.selectedAuthor = "typical";

	var ME = "MAPS CTRL: ";
	var DB = mapsDb;
	var COM = mapSrvc;
	var CS = cookieSrvc;
	var MS = memberSrvc;

	$scope.gamerCookie = null;
	$scope.canEdit = null;
	$scope.showLogIn = false;

	//These 3 are dataProviders for selection dropdown
	$scope.mapList = COM.mapList;
	$scope.drawTypeList = COM.drawTypeList;
	$scope.spawnLocationList = COM.spawnLocationList;
	$scope.authorList = COM.authorList;

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
		DB.getMapMarkers($scope.selectedMap.value,$scope.selectedAuthor).then(function(result){
			COM.currentMapData = result;
			$scope.$broadcast('event:newMapImage');
		});
		
	};

	$scope.saveMarker = function(){
		DB.insertData(COM.newMarker).
		then(function(result){
			console.log("saveMarker result: " + result.result + " PARAMS: " +result.params);
			$scope.hideForm();

		},function(result){
			
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
			console.log("deleteMarker result: " + result.result + " PARAMS: " +result.params);
			$scope.hideForm();
			DB.getMapMarkers($scope.selectedMap.value,$scope.selectedAuthor).then(function(result){
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

	$scope.clickEditBtn = function(){	
		if($scope.gamerCookie != null  && $scope.canEdit == "true"){
			$state.transitionTo("mapedit");
		}else{
			$scope.showLogIn = true;
		}
	};

	$scope.submitSignIn = function(){
 		var tag = $scope.signInTag;
 		var pword = $scope.signInPword;
 		MS.queryMember(tag,pword).then(function(result){
 			$scope.signInResult = MS.validateSubmission();
 			if($scope.signInResult == "SUCCESS"){
 				$scope.getGamerCookie();
 				$scope.showLogIn = false;
 				if($scope.canEdit == "true"){
 					$state.transitionTo("mapedit");
 				}	
 			}
 		});
 	}

	
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

	$scope.filterMapLayers = function(){
		var filters = new Object();
		filters.heavy = $scope.showHeavy;
		filters.light = $scope.showLight;
		filters.medium = $scope.showMedium;
		filters.destroyer = $scope.showDestroyer;
		filters.arty = $scope.showArty;
		filters.danger = $scope.showDanger;
		$scope.$broadcast('event:updateLayerFilters',filters);
	};

	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = CS.gamerCookie;
 		$scope.canEdit = CS.canEdit;
 		if($scope.canEdit == "true"){
 			$scope.selectedAuthor = $scope.gamerCookie;
 		}
 		
 		console.log(ME + "getGamerCookie " + $scope.gamerCookie + " Edit=" + $scope.canEdit);
 	};

 	$scope.getGamerCookie();

	$scope.selectMap($scope.selectedMap);



}]);