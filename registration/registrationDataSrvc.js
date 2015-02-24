'use strict';

APP.service('RegistrationDbSrvc',['$http','$q','VarsSrvc',function sqlQueries($http,$q,VarsSrvc){
	var self = this;
	var allMembers = [];
	
	self.VARS = VarsSrvc;
	//these 2 for saving point sets
	self.dataVO = new Object();
	self.duplicateEntryVO = new Object();

	self.querySchedule = function(){
		self.scheduleResult = [];

		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getSchedule.php'}).
		success(function(data, status) {
     		self.scheduleResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.scheduleResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.insertNewSchedule = function(dataObj){
		var deferred = $q.defer();
		var cancelFlag = false;
		// check for duplicates
		for (var i = 0; i < allMembers.length; i++) {
			if(dataObj.gamertag.toLowerCase() == allMembers[i].gamertag.toLowerCase()){
				cancelFlag = true;
				self.duplicateEntryVO = allMembers[i];
				deferred.reject("DUPLICATE");
			}
		}
		if(!cancelFlag){
			$http({method: 'POST', url: 'scripts/phpsql/scheduleInsert.php',data:dataObj})
			.then(function(result) {
	     		deferred.resolve(result);
		    },function(error) {
				deferred.reject(error);
	    	});
		}
		
	    return deferred.promise; //return the data
	};

	self.updateMember = function(dataObj){
		var deferred = $q.defer();
		
		$http({method: 'POST', url: 'scripts/phpsql/memberUpdate.php',data:dataObj})
		.then(function(result) {
     		deferred.resolve(result);
	    },function(error) {
			deferred.reject(error);
    	});

	    return deferred.promise; //return the data
	};



	self.insertNewMember = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/memberInsert.php',data:dataObj}).
		success(function(data, status, headers, config) {
			console.log("insertNewMember success "+data);
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("insertNewMember fault "+data);
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	

	self.returnNewMembers = function(){
		return self.newMemberResult;
	};

	self.getAllMembers = function(){
		self.scheduleResult = [];

		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getallmembers.php'}).
		success(function(data, status) {
     		allMembers = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	allMembers = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	}

	self.getAllMembers();// Is this being used?????

	return self;
}]);

