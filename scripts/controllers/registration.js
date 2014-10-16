'use strict';

APP.controller('RegistrationCtrl',['$scope','RegistrationDbSrvc','VarsSrvc','$state','cookieSrvc','memberSrvc',function ($scope,RegistrationDbSrvc,VarsSrvc,$state,cookieSrvc,memberSrvc) {
	
 	$scope.newMemberComplete = false;
 	$scope.newMemberData = [];
 	$scope.gamerCookie = null;
 	$scope.message = "Registration Complete."
 	$scope.charCheck = /[0-9A-Za-z!@#$\-\_]+$/;
 	$scope.submissionInvalid = false;
 	
	var DB = RegistrationDbSrvc;
	var CS = cookieSrvc;
	var MS = memberSrvc;
	var ME = "RegistrationCtrl: ";
	var formDataSchedule = new Object();
	var formDataNewMember = new Object();
	
	$scope.formActive = false;
	$scope.zoneList = VarsSrvc.zoneList;

	$scope.timeList = VarsSrvc.timeList;
	$scope.timeListB = VarsSrvc.timeListB;
	
	$scope.zoneOffset = VarsSrvc.zoneOffset;

	$scope.tierList = VarsSrvc.tierList;

	$scope.selectedZone = $scope.zoneList[0];
	$scope.currentZone = "UTC"
	$scope.selectedLow = $scope.tierList[0];
	$scope.selectedHigh = $scope.tierList[1];
	$scope.selectedBegin = $scope.timeList[0];
	$scope.selectedEnd =$scope.timeListB[0];

	$scope.selectZone = function(zoneListObj){
		$scope.selectedZone = zoneListObj;
		$scope.currentZone = zoneListObj.value;		
	};

	$scope.selectBegin = function(timeListObj){
		$scope.selectedBegin = timeListObj;
	};

	$scope.selectEnd = function(timeListObj){
		$scope.selectedEnd = timeListObj;
	};

	$scope.selectLow = function(tierListObj){
		$scope.selectedLow = tierListObj;
	};

	$scope.selectHigh = function(tierListObj){
		$scope.selectedHigh = tierListObj;
	};

	
	$scope.submitNewMemberForm = function(){
		if(this.addMemberForm.$valid){
			$scope.submissionInvalid = false;
			if($scope.selectedBegin != null && $scope.selectedEnd != null){
				formDataSchedule = new Object();
				formDataSchedule.member = this.membername!=undefined?this.membername:"";
				formDataSchedule.residence=this.home!=undefined?this.home:"";
				formDataSchedule.age=this.memberage!=undefined?this.memberage:"";
				formDataSchedule.gamertag = this.xblgamertag;
				formDataSchedule.pword=this.pword;
				formDataSchedule.zone = $scope.currentZone;
				formDataSchedule.tier_low = $scope.selectedLow.value;
				formDataSchedule.tier_high = $scope.selectedHigh.value;
				formDataSchedule.inputBeg = $scope.selectedBegin.hour;
				formDataSchedule.inputEnd = $scope.selectedEnd.hour;
				formDataSchedule.beg = $scope.convertTo_ms(parseInt($scope.selectedBegin.hour));
				formDataSchedule.end = $scope.convertTo_ms(parseInt($scope.selectedEnd.hour));
				if(formDataSchedule.beg > formDataSchedule.end){
					formDataSchedule.beg -= $scope.oneDay;
				}
				$scope.selectedBegin = null;
				$scope.selectedEnd = null;

				DB.insertNewSchedule(formDataSchedule).then(function(){
					CS.setCookie(formDataSchedule.gamertag);
				});

				if(this.isNewRadioBtnValue == "true"){
					formDataNewMember = new Object();
					formDataNewMember.member= this.membername!=undefined?this.membername:"";
					formDataNewMember.gamertag=this.xblgamertag;
					formDataNewMember.residence=this.home!=undefined?this.home:"";
					formDataNewMember.age=this.memberage!=undefined?this.memberage:"";
					formDataNewMember.lowtier=$scope.selectedLow.value;
					formDataNewMember.hitier = $scope.selectedHigh.value;
					var localDate = new Date();
					formDataNewMember.membersince = localDate.getTime();

					DB.insertNewMember(formDataNewMember).then(function(){
						$scope.newMemberComplete = true;
					});
				}else{
					$scope.newMemberComplete = true;
				}
			}
		}else{
			$scope.submissionInvalid = true;// triggers form errors to show 
		}
	};

	$scope.submitSignIn = function(){
 		var tag = $scope.signInTag;
 		var pword = $scope.signInPword;
 		MS.queryMember(tag,pword).then(function(result){
 			$scope.signInResult = MS.validateSubmission();
 			if($scope.signInResult == "SUCCESS"){
 				$scope.getGamerCookie();
 			}
 		});
 	};


	$scope.isRegistered = function(){
		if($scope.gamerCookie!=null){
			$scope.newMemberComplete = true;
		};
	};

	$scope.convertTo_ms = function(hour){
		var localMsec;
		var localDate = new Date(0,0,0,hour,0,0);
		localMsec = localDate.getTime();
		return localMsec;
	};

	$scope.getGamerCookie = function(){
 		$scope.gamerCookie = CS.gamerCookie;
 		console.log($scope.ME + "getGamerCookie " + $scope.gamerCookie);
 	};

 	$scope.getGamerCookie();

	$scope.isRegistered();

 }]);