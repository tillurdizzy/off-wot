'use strict';

APP.service('eventsDb',['$http','$q',function eventQueries($http,$q){
	var self = this;
	self.eventsResult = [];
	self.eventTags = [];
	self.ME = "eventsDB: ";
	self.eventView = "";
	
	self.queryAttendees = function(){
		//console.log(self.ME + "event= " + self.eventView);
		self.eventsResult = [];
		var dataObj = new Object();
		dataObj.eventID = self.eventView;
		
		var deferred = $q.defer();

		$http({method: 'POST', url: 'events/php/getAllEvents.php',data:dataObj}).
		success(function(data, status) {
			console.log("SUCCESS length = " + data.length + " : " + status);
     		self.eventsResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
			console.log("ERROR " + data + status);
	      	self.eventsResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.insertTag = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/insertTag.php',data:dataObj}).
		success(function(data, status, headers, config) {
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.removeTag = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/removeTag.php',data:dataObj}).
		success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}

	    }).
	    error(function(data, status, headers, config) {
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.setEventView = function(evt){
		self.eventView = evt;
	};

	
	return self;
}]);

