'use strict';

APP.service('RegistrationDbSrvc',['$http','$q','VarsSrvc',function sqlQueries($http,$q,VarsSrvc){
	var self = this;
	
	
	self.VARS = VarsSrvc;
	//these 2 for saving point sets
	self.dataVO = new Object();

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
		$http({method: 'POST', url: 'scripts/phpsql/scheduleInsert.php',data:dataObj}).
		success(function(data, status, headers, config) {
			console.log("insertNewSchedule success "+data);
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("insertNewSchedule fault "+data);
			deferred.reject(data);
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

	

	return self;
}]);

