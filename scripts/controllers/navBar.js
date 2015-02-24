'use strict';


 APP.controller('NavCtrl',['$scope','$rootScope','$location','memberSrvc', function ($scope,$rootScope,$location,memberSrvc) {

 	var MS = memberSrvc;
 	$scope.sectiontitle = "Welcome";
 	$scope.gamerTag = "";
 	$scope.signedIn = false;
 	$scope.showNav = true;
 	
    $scope.isCurrentPath = function (path) {
    	$scope.sectiontitle = path;
    	if($location.path() == "/battles"){
    		$scope.showNav = false;
    	}else{
    		$scope.showNav = true;
    	}
    	return $location.path() == path;
    };

   
	$scope.getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
 		$scope.signedIn = MS.signedIn;
 	};

 	$scope.$watch($scope.getMemberStatus, function() {
  		$scope.gamerTag = MS.gamerTag;
  		$scope.signedIn = MS.signedIn;
	});


 	$scope.getMemberStatus();
    
 }]);