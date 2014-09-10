'use strict';

 APP.controller('MembersCtrl',['$scope','sqlDb',function ($scope,sqlDb) {
	var DB = sqlDb;
    $scope.newMemberData = [
    			{name: "James",gamertag:"SmokyFiber163",base:"Tx, USA",age:"54",tiers:"VI"},
    			{name: "Hawk",gamertag:"Hawkster0616",base:"Az, USA",age:"47",tiers:"VI"},
    			{name: "Craig",gamertag:"koldfront kraig",base:"Mn, USA",age:"54",tiers:"VI"},
    			{name: "Bill",gamertag:"billmct",base:"Canada",age:"50",tiers:"VI"}
				];

	DB.queryNewMembers().then(function(result){
		$scope.newMemberData = DB.returnNewMembers();
	});



 }]);

