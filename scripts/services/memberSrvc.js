'use strict';

//PRIMARY_ID	member	gamertag		pword		residence	age		zone	inputBeg	inputEnd	beg	end							tier_high	tier_low
//110			James	SmokeyFiber163	sadie9954	TX			54		CST		12			17			-2209010400000	-2208992400000	7				3

APP.service('memberSrvc',['$http','$q','cookieSrvc', function  memberQueries($http,$q,cookieSrvc){
	var self = this;
	self.CS = cookieSrvc;
	self.ME = "memberSrvc: ";
	self.gamerCookie = null;
	self.queryResult = [];
	self.isRegistered = false;
	self.signedIn = false;
	self.submittedData = new Object();


	// called from sidebar log in
	self.queryMember = function(gamer,pword){
		self.queryResult = [];
		self.submittedData = new Object();
		self.submittedData.gamertag = gamer.trim();
		self.submittedData.pWord = pword.trim();
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getmember.php',data:self.submittedData}).
		success(function(data, status) {
     		self.queryResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.queryResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	
	//called from new member page
	self.queryNewMembers = function(){
		self.newMemberResult = [];

		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getmembers.php'}).
		success(function(data, status) {
     		self.newMemberResult = data;
     		
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.newMemberResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.returnNewMembers = function(){
		return self.newMemberResult;
	};


	// called from sidebar after log in submission
	self.validateSubmission = function(){
		var gamerResult="";
		var pwordResult="";
		var canEdit="false";
		var validateResult="SUCCESS";
		if(self.queryResult.length == 0){
			//gamertag was wrong or not registered
			 validateResult = "FAIL_gamer";
		}else{
			self.isRegistered = true;
			gamerResult = self.queryResult[0].gamertag;
			pwordResult = self.queryResult[0].pword;
			canEdit = self.queryResult[0].canEdit;
			if(pwordResult == self.submittedData.pWord){
				self.signedIn = true;
				cookieSrvc.setCookie(gamerResult);
				cookieSrvc.setEditStatus(canEdit);
			}else{
				validateResult = "FAIL_password";
			}
		}

		return validateResult;
	};

	self.getGamerCookie = function(){
 		self.gamerCookie = self.CS.gamerCookie;
 		console.log(self.ME + "getGamerCookie " + self.gamerCookie);
 	};

 	self.getGamerCookie();

	return self;
}]);

