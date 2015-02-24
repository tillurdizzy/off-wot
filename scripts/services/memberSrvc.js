'use strict';

APP.service('memberSrvc',['$http','$q','cookieSrvc', function  memberQueries($http,$q,cookieSrvc){
	var self = this;
	var CS = cookieSrvc;
	self.ME = "memberSrvc: ";
	//If cookies are DISABLED, then gamerTag will still have user tag when they log in, but gamerCookie will still be null
	//If cookies are ENABLED, then gamerTag and gamerCookie will be the same
	self.gamerCookie = null;
	self.gamerTag = "";
	self.memberID = "";
	self.isRegistered = false;
	self.signedIn = false;
	self.canEdit = false;
	var newSession = true;

	self.queryResult = [];
	self.submittedData = new Object();
	self.newMemberResult = [];
	self.allMembers = [];

	// called from sidebar log in
	self.queryMember = function(gamer,pword){
		self.queryResult = [];
		self.submittedData = new Object();
		self.submittedData.gamertag = gamer.trim();
		self.submittedData.pWord = pword.trim();
		// Query ONLY searches for gamerTag - password is validated below
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

	self.getAllMembers = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getallmembers.php'}).
		success(function(data, status) {
     		self.allMembers = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.allMembers = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.getTagFromID = function(id){
		var rtnStr = "";
		for (var i = 0; i < allMembers.length; i++) {
			if(allMembers[i].PRIMARY_ID == id){
				rtnStr = allMembers[i].gamertag;
				break;
			}
		};
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


	// called from sidebar after queryMember() result for either success or failure
	// For failure, determines if it was name or password that was wrong
	self.validateSubmission = function(){
		var gamerResult="";
		var pwordResult="";
		var canEdit="false";
		var validateResult="SUCCESS";
		if(self.queryResult.length == 0){
			//gamertag was not found - wrong or not registered
			 validateResult = "FAIL_gamer";
		}else{
			// gamerTag was found - see if password matches
			self.isRegistered = true;
			gamerResult = self.queryResult[0].gamertag;
			pwordResult = self.queryResult[0].pword;
			var id = self.queryResult[0].PRIMARY_ID;
			var edit = self.queryResult[0].canEdit;
			if(pwordResult == self.submittedData.pWord){
				self.setGamerCookie(gamerResult);
				self.setMemberIDCookie(id);
				recordSession();
			}else{
				validateResult = "FAIL_password";
			}
		}
		return validateResult;
	};

	self.setGamerCookie = function(_gamerTag){
		CS.setCookie(_gamerTag);
		self.gamerCookie = CS.gamerCookie;
		self.isRegistered = true;
		self.signedIn = true;
		self.gamerTag = _gamerTag;
	};

	self.setMemberIDCookie = function(_id){
		CS.setMemberID(_id);
		self.memberID = _id;
	};

	self.getMemberID = function(){
		self.memberID = CS.memberID;
	};

	self.removeCookie = function(){
		CS.removeCookie();
		self.gamerCookie = CS.gamerCookie;
		self.signedIn = false;
		self.gamerTag = "";
	};

	self.getGamerCookie = function(){
 		self.gamerCookie = CS.gamerCookie;
 		self.memberID = CS.memberID;
 		if(self.gamerCookie!=null){
 			self.signedIn = true;
 			self.gamerTag = CS.gamerCookie;
 			self.isRegistered = true;
 			self.canEdit = (CS.canEdit==="true");
 			recordSession();
 		}

 		if(self.memberID==null && self.isRegistered==true){
 			self.queryMember(self.gamerTag,"").then(function(successCallback){
				self.memberID = self.queryResult[0].PRIMARY_ID;
				self.setMemberIDCookie(self.memberID);
			}, function(errorCallback){
				
			});

 		}
 	};

 	var recordSession = function(){
 		if(newSession == true){
 			var dataObj = new Object();
 			dataObj.gamertag = self.gamerTag;
 			newSession = false;
 			var deferred = $q.defer();
			$http({method: 'POST', url: 'scripts/phpsql/getvisits.php',data:dataObj}).
			success(function(data, status) {
				dataObj = new Object();
				dataObj.gamertag = self.gamerTag;
				dataObj.visits = parseInt(data[0].visits) + 1;
	     		$http({method: 'POST', url: 'scripts/phpsql/recordsession.php',data:dataObj})
		    });
 		}
 	}

 	self.getGamerCookie();

	return self;
}]);

