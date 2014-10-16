'use strict';

APP.controller('PlatoonCtrl',['$scope','$state','platoonSrvc','mapSrvc','cookieSrvc','memberSrvc', function ($scope,$state,platoonSrvc,mapSrvc,cookieSrvc,memberSrvc) {


	$scope.formstate = new Object();
	$scope.formstate.visible = false;
	$scope.formstate.role = 'hidden';
	$scope.showHelp=false;

	$scope.showLayer = "I";

	var ME = "PLATOON CTRL: ";
	var SRVC = platoonSrvc;
	var VARS = mapSrvc;
	var CS = cookieSrvc;
	var MS = memberSrvc;

	$scope.gamerCookie = null;
	$scope.canEdit = null;
	$scope.showLogIn = false;

	//These 3 are dataProviders for selection dropdown
	$scope.mapList = VARS.mapList;
	$scope.tankList = VARS.tankList;
	$scope.strategyNumberList = VARS.platoonStrategyNum;
	$scope.commanderList = VARS.commanderList;

	// Default (init) dropdown selections
	$scope.selectedMap = VARS.mapList[0];
	$scope.selectedTank = $scope.tankList[0];
	$scope.selectedStrategy = "I";
	$scope.selectedCommander = $scope.commanderList[0];

	// Share default with Service
	VARS.currentMapName = $scope.selectedMap.value;
	VARS.mapUrl = $scope.selectedMap.url;
	VARS.spawnType = "I";
	VARS.drawType = $scope.selectedTank.value;
	VARS.commander = $scope.selectedCommander.value;
	

	$scope.selectMap = function(mapListObj){
		$scope.selectedMap = mapListObj;
		VARS.currentMapName = mapListObj.value;
		VARS.mapUrl = mapListObj.url;
		SRVC.getMapMarkers($scope.selectedMap.value,$scope.selectedCommander.value).then(function(result){
			VARS.currentMapData = result;
			$scope.$broadcast('event:newMapImage');
		});
		
	};

	$scope.saveMarker = function(){
		SRVC.insertData(VARS.newMarker).
		then(function(result){
			console.log("saveMarker result: " + result.result + "PARAMS: " +result.params);
			$scope.hideForm();

		},function(result){
			
		});
	}

	$scope.savePath = function(){
		var numInserts = VARS.newPathObjects.length;
		SRVC.savePaths(VARS.newMarker,VARS.newPathObjects);
		$scope.hideForm();
		/*.then(function(result){
			numInserts-=1;
			console.log("savePath result: " + result.result + " # " +numInserts);
			if(numInserts == 0){
				$scope.hideForm();
			}
			

		},function(result){
			
		});*/
	}

	$scope.deleteMarker = function(){
		SRVC.removeMarker(VARS.removeID).
		then(function(result){
			console.log("deleteMarker result: " + result.result + "PARAMS: " +result.params);
			$scope.hideForm();
			SRVC.getMapMarkers($scope.selectedMap.value,$scope.selectedCommander.value).then(function(result){
				VARS.currentMapData = result;
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


	$scope.selectTankType = function(typeObj){
		$scope.selectedTank = typeObj;
		VARS.drawType = typeObj.value;
	};
	$scope.selectStrategyType = function(typeObj){
		$scope.selectedStrategy = typeObj;
		VARS.spawnType = typeObj.value;
	};

	$scope.selectCommander = function(typeObj){
		$scope.selectedCommander = typeObj;
		VARS.commander = typeObj.value;
		SRVC.getMapMarkers($scope.selectedMap.value,$scope.selectedCommander.value).then(function(result){
			VARS.currentMapData = result;
			$scope.$broadcast('event:refreshMap');
		});
	};
	$scope.toggleHelp = function(){
		$scope.showHelp = !$scope.showHelp;
	};

	$scope.filterMapLayers = function(){
		var filters = new Object();
		filters.I = false;
		filters.II = false;
		filters.III = false;
		filters.IV = false;
		$scope.selectedStrategy = $scope.showLayer;
		VARS.spawnType =$scope.showLayer;
		switch($scope.showLayer){
			case "I":filters.I = true;break;
			case "II":filters.II = true;break;
			case "III":filters.III = true;break;
			case "IV":filters.IV = true;break;
		}
		$scope.$broadcast('event:updateLayerFilters',filters);
	}

	$scope.clickEditBtn = function(){	
		if($scope.gamerCookie != null  && $scope.canEdit == "true"){
			$state.transitionTo("platoonedit");
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
 					$state.transitionTo("platoonedit");
 				}	
 			}
 		});
 	}

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