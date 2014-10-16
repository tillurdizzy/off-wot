'use strict';
 APP.controller('EventsCtrl',['$scope','$state','eventsDb','cookieSrvc','memberSrvc', function ($scope,$state,eventsDb,cookieSrvc,memberSrvc) {
 	$scope.DB = eventsDb;
 	$scope.MS = memberSrvc;
 	$scope.CS = cookieSrvc;
 	$scope.allEvents = [];
 	$scope.selectedEvent = [];
 	$scope.gamerCookie = null;
 	$scope.signInResult = "SUCCESS";
 	$scope.ME = "eventsCtrl: ";

 	$scope.showEventPage = function(evt){
 		$scope.DB.setEventView(evt);
 		$state.transitionTo(evt);
 	};

 	$scope.submitSignIn = function(){
 		var tag = $scope.signInTag;
 		var pword = $scope.signInPword;
 		$scope.MS.queryMember(tag,pword).then(function(result){
 			$scope.signInResult = $scope.MS.validateSubmission();
 			if($scope.signInResult == "SUCCESS"){
 				$scope.getGamerCookie();
 			}
 		});
 	}

 	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = $scope.CS.gamerCookie;
 		//console.log($scope.ME + "getGamerCookie " + $scope.gamerCookie);
 	};

 	$scope.getGamerCookie();
    
 }]);