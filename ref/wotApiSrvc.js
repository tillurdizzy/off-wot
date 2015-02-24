'use strict';

APP.service('WoTSrvc',['$http','$q',function ($http,$q){
	var self = this;

	self.vehicleResult = new Object();
	var vehicleDetails = new Object();
	
	var TankID = 0;

	self.getVehicleList = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'https://api.worldoftanks.com/wot/encyclopedia/tanks/?application_id=b234fa273d0e51d9acb853c9b212f2f9'})
			.then(function(result) {
				self.vehicleResult = result.data.data;
	     		deferred.resolve(result);
		    },function(error) {
				deferred.reject(error);
				self.vehicleResult = error;
	    	});

	     return deferred.promise; //return the data
	}

	self.getVehicleDetails = function(id){
		TankID = id;
		var deferred = $q.defer();
		$http({method: 'POST', url: 'https://api.worldoftanks.com/wot/encyclopedia/tankinfo/?application_id=b234fa273d0e51d9acb853c9b212f2f9&tank_id='+id})
			.then(function(result) {
	     		var temp = result.data.data;
	     		vehicleDetails = temp[TankID];
	     		deferred.resolve(vehicleDetails);
		    },function(error) {
				deferred.reject(error);
				self.vehicleDetails = error;
	    	});

	     return deferred.promise; //return the data
	}

	
	
	return self;
}]);

