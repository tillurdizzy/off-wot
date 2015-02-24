'use strict';

 APP.controller('ReferenceCtrl',['$scope','$state',function ($scope,$state) {

 	$scope.goTo = function(link){
 		$state.transitionTo(link);
 	};
	
	
	$scope.linkView;
	
 }]);

