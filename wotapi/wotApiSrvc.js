'use strict';

APP.service('WoTSrvc',['$http','$q',function ($http,$q){
	var self = this;

	self.vehicleResult = new Object();
	self.vehicleDetails = new Object();

	self.getVehicleList = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'https://api.worldoftanks.com/wot/encyclopedia/tanks/?application_id=b234fa273d0e51d9acb853c9b212f2f9'})
			.then(function(result) {
	     		deferred.resolve(result);
	     		self.vehicleResult = result.data.data;
		    },function(error) {
				deferred.reject(error);
				self.vehicleResult = error;
	    	});

	     return deferred.promise; //return the data
	}

	self.getVehicleDetails = function(id){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'https://api.worldoftanks.com/wot/encyclopedia/tankinfo/?application_id=b234fa273d0e51d9acb853c9b212f2f9&tank_id='+id})
			.then(function(result) {
	     		deferred.resolve(result);
	     		self.vehicleDetails = result.data.data;
		    },function(error) {
				deferred.reject(error);
				self.vehicleDetails = error;
	    	});

	     return deferred.promise; //return the data
	}


	

	
	return self;
}]);

