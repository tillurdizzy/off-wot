'use strict';


 APP.controller('NavCtrl',['$scope','$location','cookieSrvc', function ($scope,$location,cookieSrvc) {

 	var CS = cookieSrvc;
 	$scope.sectiontitle = "Welcome";
 	$scope.gamerCookie = null;
 	
    $scope.isCurrentPath = function (path) {
    	$scope.sectiontitle = path;
    	return $location.path() == path;
    };

   
	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = CS.gamerCookie;
 	};

 	 $scope.$watch($scope.getGamerCookie, function() {
  		$scope.gamerCookie = CS.gamerCookie;
	});

 	 $scope.getGamerCookie();
    
 }]);