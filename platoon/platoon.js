'use strict';

APP.controller('PlatoonCtrl',['$scope','$state','platoonSrvc','mapSrvc','memberSrvc','$location', function ($scope,$state,platoonSrvc,mapSrvc,memberSrvc,$location) {


	$scope.formstate = new Object();
	$scope.formstate.visible = false;
	$scope.formstate.role = 'hidden';
	$scope.showHelp=false;

	$scope.showLayer = "I";

	var ME = "PLATOON CTRL: ";
	var SRVC = platoonSrvc;
	var VARS = mapSrvc;
	var MS = memberSrvc;

	$scope.gamerTag = "";
	$scope.canEdit = false;
	$scope.signedIn = false;
	$scope.editMode = false;

	var mapComments = [];

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
	$scope.strategyComment = "";
	$scope.strategyUpdate = "";
	$scope.illegalChars = /"'></;

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
		SRVC.getStrategy($scope.selectedMap.value,$scope.selectedCommander.value).then(function(result){
			mapComments = result;
			$scope.getCurrentStrategyComment();
		});
	};

	$scope.getCurrentStrategyComment = function(){
		$scope.strategyComment = "";
		for (var i = 0; i < mapComments.length; i++) {
			if (mapComments[i].strategy == $scope.selectedStrategy) {
				$scope.strategyComment = mapComments[i].comment;
			};
		};
	}

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
	}

	$scope.deleteMarker = function(){
		SRVC.removeMarker(VARS.removeID).
		then(function(result){
			//console.log("deleteMarker result: " + result.result + "PARAMS: " +result.params);
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
		SRVC.getStrategy($scope.selectedMap.value,$scope.selectedCommander.value).then(function(result){
			mapComments = result;
			$scope.getCurrentStrategyComment();
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

		$scope.getCurrentStrategyComment();
		
	};

	$scope.clickEditBtn = function(){	
		if($scope.canEdit){
			$state.transitionTo("platoonedit");
		}	
	};

	$scope.submitComment = function(){
		var dataObj = new Object();
		dataObj.map = $scope.selectedMap.value;
		dataObj.author = $scope.selectedCommander.value;
		dataObj.strategy = $scope.selectedStrategy;
		dataObj.comment = stripIllegalChars();
		// Determine whether to PUT or UPDATE
		var action = "put";
		for (var i = 0; i < mapComments.length; i++) {
			if (mapComments[i].strategy == $scope.selectedStrategy) {
				action = "update";
				dataObj.PRIMARY_ID=parseInt(mapComments[i].PRIMARY_ID);
			};
		};
		if(action=="put"){
			SRVC.putStrategy(dataObj).then(function(){
				$scope.strategyComment = $scope.strategyUpdate;
				$scope.strategyUpdate = "";
			});
		}else{
			SRVC.updateStrategy(dataObj).then(function(){
				$scope.strategyComment = $scope.strategyUpdate;
				$scope.strategyUpdate = "";
			});
		}
		
	};

	var stripIllegalChars = function(){
		var str = $scope.strategyUpdate;
		var cleanString = str.replace(/[\|&;%@"'<>\(\)]/g, "");
		 $scope.strategyUpdate = cleanString;
		 return cleanString;
	}

	

	$scope.getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
		$scope.signedIn = MS.signedIn;
		$scope.canEdit = MS.canEdit;
		var p = $location.path();
		if(p == "/platoonedit"){
			$scope.editMode = true;
			$scope.selectedCommander = VARS.returnCommander($scope.gamerTag);
		}
 	};

 	$scope.getMemberStatus();

	$scope.selectMap($scope.selectedMap);

}]);