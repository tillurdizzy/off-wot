'use strict';

 APP.controller('MembersCtrl',['$scope','memberSrvc',function ($scope,memberSrvc) {
	var DB = memberSrvc;
    $scope.newMemberData = [];

	DB.queryNewMembers().then(function(result){
		$scope.newMemberData = DB.returnNewMembers();
	});
 }]);

