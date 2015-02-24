'use strict';

APP.service('BattlesDb',['$http','$q',function battleQueries($http,$q){
	var self = this;
	self.battlesResult = [];
	self.gamertag;
	self.ME = "BattlesDb: ";
	
	
	self.queryMemberBattles = function(dataObj){
		//dataObj only needs memberID
		self.battlesResult = [];
		//self.resetLists();
		var deferred = $q.defer();

		$http({method: 'POST', url: 'battles/battleGet.php',data:dataObj}).
		success(function(data, status) {
			//console.log("SUCCESS length = " + data.length + " : " + status);
     		self.battlesResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
			console.log("ERROR " + data + status);
	      	self.battlesResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	// Will either update or create new entry if first time submitting
	self.submitBattle = function(dataObj){
		var deferred = $q.defer();
		if(self.battlesResult.length == 0){
			// Members' first time - insert rather than update
			$http({method: 'POST', url: 'battles/battleInsert.php',data:dataObj}).
			success(function(data, status, headers, config) {
	     		deferred.resolve(data);
		    }).
		    error(function(data, status, headers, config) {
				deferred.reject(data);
		    });
		}else{
			$http({method: 'POST', url: 'battles/battlesUpdate.php',data:dataObj}).
			success(function(data, status, headers, config) {
	     		deferred.resolve(data);
		    }).
		    error(function(data, status, headers, config) {
				deferred.reject(data);
		    });
		}
		//self.battlesResult = dataObj;
	    return deferred.promise; //return the data
	};



	return self;
}]);

