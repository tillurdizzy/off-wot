'use strict';

APP.controller('RegistrationCtrl',['$scope','RegistrationDbSrvc','VarsSrvc','$state','memberSrvc',function ($scope,RegistrationDbSrvc,VarsSrvc,$state,memberSrvc) {
	
 	$scope.newMemberData = [];
 	
 	$scope.message = "Registration Complete."
 	$scope.charCheck = /[0-9A-Za-z!@#$\-\_]+$/;
 	$scope.submissionInvalid = false;
 	
	var DB = RegistrationDbSrvc;
	var MS = memberSrvc;
	var ME = "RegistrationCtrl: ";

	$scope.gamerTag = "";
	var memberID = "";
	$scope.signedIn = false;
	$scope.isRegistered = false;
	$scope.doUpdate = false;
	$scope.isNewRadioBtnValue = "true";// Used to be RB on form, now just var that is always true

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
				formDataSchedule.beg = 0;//not using these
				formDataSchedule.end = 0;
				if(formDataSchedule.beg > formDataSchedule.end){
					formDataSchedule.beg -= $scope.oneDay;
				}
				$scope.selectedBegin = null;
				$scope.selectedEnd = null;

				if($scope.doUpdate == true){
					formDataSchedule.PRIMARY_ID = MS.queryResult[0].PRIMARY_ID;
					//formDataSchedule.PRIMARY_ID = 'xxx'
					DB.updateMember(formDataSchedule).then(function(successCallback){
						$scope.doUpdate = false;
						$scope.message = "Update successful.";
					}, function(errorCallback){
						
					});

				}else{
					DB.insertNewSchedule(formDataSchedule).then(function(successCallback){
						$scope.setMemberStatus();
					}, function(errorCallback){
						if(errorCallback=="DUPLICATE"){
							 $scope.signInTag = DB.duplicateEntryVO.gamertag;
							 $scope.signInPword=DB.duplicateEntryVO.pword;
							 $scope.isRegistered = true;
							 $scope.message = "You have already registered.  Sign in at left.";
						};
					});

					if($scope.isNewRadioBtnValue == "true"){
						formDataNewMember = new Object();
						formDataNewMember.member= this.membername!=undefined?this.membername:"";
						formDataNewMember.gamertag=this.xblgamertag;
						formDataNewMember.residence=this.home!=undefined?this.home:"";
						formDataNewMember.age=this.memberage!=undefined?this.memberage:"";
						formDataNewMember.lowtier=$scope.selectedLow.value;
						formDataNewMember.hitier = $scope.selectedHigh.value;
						var localDate = new Date();
						formDataNewMember.membersince = localDate.getTime();

						DB.insertNewMember(formDataNewMember).then(function(successCallback){
							
						},function(errorCallback){
							
						});
					}

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
 			$scope.signInResult = MS.validateSubmission();// this will set cookie
 			if($scope.signInResult == "SUCCESS"){
 				$scope.getMemberStatus();
 			}else{
 				// the $scope.signInResult will trigger DOM messages to user
 			}
 		});
 	};

 	$scope.clickUpdateButton = function(){
 		MS.queryMember($scope.gamerTag,"").then(function(successCallback){
 			$scope.doUpdate = true;
			var memberData = successCallback[0];
			$scope.selectedZone = VarsSrvc.returnZoneObj(memberData.zone);
			$scope.currentZone = memberData.zone;
			$scope.selectedLow = VarsSrvc.returnTierObj(memberData.lowtier);
			$scope.selectedHigh = VarsSrvc.returnTierObj(memberData.hitier);
			$scope.selectedBegin = VarsSrvc.returnTimeObj(memberData.inputBeg);
			$scope.selectedEnd = VarsSrvc.returnTimeObjB(memberData.inputEnd);
			$scope.membername = memberData.member;
			$scope.memberage = memberData.age;
			$scope.home = memberData.residence;
			$scope.xblgamertag = memberData.gamertag;
			$scope.pword = memberData.pword;

		}, function(errorCallback){
			
		});
 	};

 	$scope.submitSignOut = function(){
 		MS.removeCookie();
 		$scope.message = ""
 		$scope.getMemberStatus();
 	};


	$scope.convertTo_ms = function(hour){
		var localMsec;
		var localDate = new Date(0,0,0,hour,0,0);
		localMsec = localDate.getTime();
		return localMsec;
	};

	$scope.setMemberStatus = function(){
		MS.setGamerCookie(formDataSchedule.gamertag);
 		$scope.getMemberStatus();
 	};

	$scope.getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
 		memberID = MS.memberID;
		$scope.signedIn = MS.signedIn;
		$scope.isRegistered = MS.isRegistered;

		if($scope.signedIn == true){
			$scope.message = "You are logged in."
		}
 	};

 	$scope.getMemberStatus();

 }]);