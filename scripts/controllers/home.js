'use strict';


APP.controller('HomeCtrl', ['$scope','cookieSrvc',function ($scope,cookieSrvc) {
	var CS = cookieSrvc;

    $scope.gamerCookie = null;

	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = CS.gamerCookie;
 	};

 	$scope.getGamerCookie();

 }]);


APP.controller('ContributeCtrl', function ($scope) {
    
});


