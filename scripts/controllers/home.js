'use strict';


APP.controller('HomeCtrl', ['$scope','memberSrvc','$state',function ($scope,memberSrvc,$state) {
	//This will also invoke cookieSrvc
	var MS = memberSrvc;

	$scope.goTracker = function(){
		$state.transitionTo("battles");
	}

 }]);


APP.controller('ContributeCtrl', function ($scope) {
    
});


