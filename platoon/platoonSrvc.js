'use strict';

APP.service('platoonSrvc',['$http','$q',function sqlQueries($http,$q){
	var self = this;
	self.mapResult = [];
	self.mapMarkers = [];
	
	self.dataVO = new Object();
	self.pointsArray = [];

	

	self.insertData = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'platoon/platoonInsert.php',data:dataObj}).
		success(function(data, status, headers, config) {
			console.log("sqldb.js "+data);
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("sqldb.js "+data);
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	// next 3 functions work together to insert an array of objects into database individually \\\\\\

	self.savePaths = function(dataObj,points){
		self.dataVO = dataObj;
		self.pointsArray = points;
		self.initNextItem();
	}

	self.initNextItem = function(){
		var lastItem = self.pointsArray.length-1;
		if(lastItem > 0){
			var pathObj = self.pointsArray[lastItem];
			self.pointsArray.pop();
			self.insertPath(self.dataVO,pathObj);
		}
	}

	self.insertPath = function(dataObj,pointsArray){
		var deferred = $q.defer();
		dataObj.xpos = pointsArray.xpos;
		dataObj.ypos = pointsArray.ypos;
		dataObj.xpos2 = pointsArray.xpos2;
		dataObj.ypos2 = pointsArray.ypos2;
		console.log("xpos " + dataObj.xpos + ',' + dataObj.xpos2)
		$http({method: 'POST', url: 'platoon/platoonInsert.php',data:dataObj})
		.success(function(data, status, headers, config) {
	     	deferred.resolve(data);
	     	self.initNextItem();
		   })
		.error(function(data, status, headers, config) {
			deferred.reject(data);
			self.initNextItem();
		});
	  
	   // return deferred.promise; //return the data
	};

	////////////////////////   \\\\\\\\\\\\\\\\\\\\

	self.removeMarker = function(removeid){
		var dataObj = new Object();
		dataObj.id = removeid.toString();
		var deferred = $q.defer();
		$http({method: 'POST', url: 'platoon/deletePlatoonMarker.php',data:dataObj}).
		success(function(data, status, headers, config) {
			console.log("sqldb.js "+data);
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("sqldb.js "+data);
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	
	

	self.getMapMarkers = function(mapname,author){
		self.mapMarkers = [];
		var dataObj = new Object();
		dataObj.map = mapname;
		dataObj.author = author;
		var deferred = $q.defer();
		$http({method: 'POST', url: 'platoon/platoonGet.php',data:dataObj}).
		success(function(data, status) {
     		self.mapMarkers = data;
     		//console.log("Success " + data);
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.mapMarkers = data;
	      	//console.log("Error " + data);
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	

	return self;
}]);

