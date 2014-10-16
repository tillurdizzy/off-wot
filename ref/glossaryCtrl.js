'use strict';

 APP.controller('GlossaryCtrl',['$scope','GlossarySrvc',function ($scope,GlossarySrvc) {

 	$scope.pageTitle = "Terms A thru C";

 	$scope.groups = GlossarySrvc.AC;

 	$scope.changeGroup = function(grp){
 		switch(grp){
 			case "AC":$scope.groups=GlossarySrvc.AC;
 			$scope.pageTitle = "Terms A thru C";
 			break;
 			case "DF":$scope.groups=GlossarySrvc.DF;
 			$scope.pageTitle = "Terms D thru F";
 			break;
 			case "GI":$scope.groups=GlossarySrvc.GI;
 			$scope.pageTitle = "Terms G thru I";
 			break;
 			case "JL":$scope.groups=GlossarySrvc.JL;
 			$scope.pageTitle = "Terms J thru L";
 			break;
 			case "MO":$scope.groups=GlossarySrvc.MO;
 			$scope.pageTitle = "Terms M thru O";
 			break;
 			case "PR":$scope.groups=GlossarySrvc.PR;
 			$scope.pageTitle = "Terms P thru R";
 			break;
 			case "SU":$scope.groups=GlossarySrvc.SU;
 			$scope.pageTitle = "Terms S thru U";
 			break;
 			case "VZ":$scope.groups=GlossarySrvc.VZ;
 			$scope.pageTitle = "Terms V thru Z";
 			break;

 		}
 	}
	
 }]);

