'use strict';

APP.service('eventsDb',['$http','$q','$rootScope',function eventQueries($http,$q,$rootScope){
	var self = this;
	self.eventsResult = [];
	self.eventTags = [];
	self.eventsDataResult = [];
	self.ME = "eventsDB: ";
	self.eventView = "";
	
	self.monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	self.imageList = ["Tier8Grindage.jpg","HeavyEducation.jpg","MuricaMonday2.jpg","TDTuesday.jpg","WalletWarriorWed.jpg","TopTierThursday.jpg","MediumMayhem.jpg",
	"FridayNightLight.jpg","SniperSaturday.jpg","sundaystarter.jpg","meetgreet01.jpg","Medium-Madness.jpg","heavymetal.jpg","MotherRussiaMonday.jpg","LowTierTuesday.jpg","TOGTuesday.jpg",
	"Heavy-Metal.jpg","destroyer.jpg","T110E5.jpg","patton.jpg","lowe.jpg","Conqueror.jpg","at7.jpg","CasualFriday.jpg","events-monday.jpg","WoT_Fury_Tank.jpg","SealClubbingSaturday.jpg"];

	self.queryAttendees = function(){
		//console.log(self.ME + "event= " + self.eventView);
		self.eventsResult = [];
		var dataObj = new Object();
		dataObj.eventID = self.eventView;
		
		var deferred = $q.defer();

		$http({method: 'POST', url: 'events/php/getEventAttendees.php',data:dataObj}).
		success(function(data, status) {
			//console.log("SUCCESS length = " + data.length + " : " + status);
     		self.eventsResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
			//console.log("ERROR " + data + status);
	      	self.eventsResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};
	
	self.queryTeamAttendees = function(){
		//console.log(self.ME + "event= " + self.eventView);
		self.eventsResult = [];
		var deferred = $q.defer();

		$http({method: 'POST', url: 'events/php/getTeamAttendees.php'}).
		success(function(data, status) {
			//console.log("SUCCESS length = " + data.length + " : " + status);
     		self.eventsResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
			//console.log("ERROR " + data + status);
	      	self.eventsResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};
	
	self.refreshEventData = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/getEventsData.php'}).
		success(function(data, status) {
			//console.log("SUCCESS length = " + data.length + " : " + status);
			self.eventsDataResult = sortByDay(data);
			deferred.resolve(self.eventsDataResult);
		}).
		error(function(data, status, headers, config) {
			//console.log("ERROR " + data + status);
			self.eventsDataResult = data;
			deferred.reject(data);
		});

		return deferred.promise; //return the data
	};

	self.queryEventsData = function(){
		// we only need to get this 1 time... it's not going to change unless on edit page
		if(self.eventsDataResult.length == 0){
			var deferred = $q.defer();
	
			$http({method: 'POST', url: 'events/php/getEventsData.php'}).
			success(function(data, status) {
				console.log("SUCCESS length = " + data.length + " : " + status);
				self.eventsDataResult = data;
				deferred.resolve(data);
			}).
			error(function(data, status, headers, config) {
				//console.log("ERROR " + data + status);
				self.eventsDataResult = data;
				deferred.reject(data);
			});
	
			return deferred.promise; //return the data
		}
	};
	
	self.getEventsData = function(){
		self.queryEventsData().then
		(function(result){
			parseEventData(result);
		},function(error){
			
		});
	};
	
	var sortByDay = function(data){
		var sortedList = [];
		for(var i=0; i < data.length; i++){
			
			var thisItem = data[i].dayOfWeek;
			data[i].dayVal = returnDayVal(thisItem);
		};
		
		i = 0;
		sortedList = _.sortBy(data, function (i) { return [i.dayVal,i.sortVal].join("_");});
		
		return sortedList;
		
	};
	
	var parseEventData = function(data){
		for(var i=0; i < data.length; i++){
			var thisItem = data[i].photo;
			data[i].photo = eventImagesPath + thisItem;
			
			thisItem = data[i].dayOfWeek;
			data[i].dayVal = returnDayVal(thisItem);
		};
		
		i = 0;
		self.eventsDataResult = _.sortBy(data, function (i) { return [i.dayVal,i.sortVal].join("_");});
		
		$rootScope.$broadcast("event-data-ready");
		
	};

	self.returnEventData = function(){
		var rtnObj = new Object();
		if(self.eventsDataResult.length > 0){
			for (var i = 0; i < self.eventsDataResult.length; i++) {
				var id = self.eventsDataResult[i].PRIMARY_ID;
				var view = self.eventView;
				if (self.eventsDataResult[i].PRIMARY_ID == self.eventView) {
					rtnObj = self.eventsDataResult[i];
				};
			};
		}
		return rtnObj;
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
		$http({method: 'POST', url: 'events/php/removeTag.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise; //return the data
	};
	
	self.insertTeamTag = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/insertTeamTag.php',data:dataObj}).
		success(function(data, status, headers, config) {
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.removeTeamTag = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/removeTeamTag.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise; //return the data
	};
	
	self.updateEventDates = function(dataObj){
		//console.log(dataObj.eventID);
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventDates.php',data:dataObj}).
		success(function(data, status, headers, config) {
			//console.log(config.data.eventID + " : " + data.params);
     		deferred.resolve(data);
	    }).
	    error(function(data, status, headers, config) {
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.setEventView = function(primaryID){
		self.eventView = primaryID;
	};
	
	var eventImagesPath = "http://bluewaveproduction.com/wot/events/images/";

	self.weekDayObjects = [
		{label:"Sunday",value:0},
		{label:"Monday",value:1},
		{label:"Tuesday",value:2},
		{label:"Wednesday",value:3},
		{label:"Thursday",value:4},
		{label:"Friday",value:5},
		{label:"Saturday",value:6}];

	self.returnImage = function(_evt){
		var rtnStr = "";
		for (var i = 0; i < eventImages.length; i++) {
			if(eventImages[i].evt == _evt){
				rtnStr=eventImages[i].src;
				break;
			}
		};
		return rtnStr;
	};
	
	var returnDayVal = function(dayStr){
		var rtn = null;
		for(var i=0; i < self.weekDayObjects.length; i++){
			if(dayStr ==  self.weekDayObjects[i].label ){
				rtn = self.weekDayObjects[i].value;
			};
		};
		return rtn;
	};
	
	self.deleteEvent = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/deleteEvent.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventTitle = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventTitle.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventHost = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventHost.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventPhoto = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventPhoto.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventTiers = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventTiers.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventTime = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventTime.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventZone = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventZone.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventDay = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventDay.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventSort = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventSort.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.updateEventActive = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/updateEventActive.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.resetFiveX = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/resetFiveXTeams.php'})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.removeNewMembers = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/removeNewMembers.php',data:dataObj})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};
	
	self.clearAllSignUps = function(){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'events/php/clearEventSignUps.php'})
		.success(function(data, status, headers, config) {
			if (typeof data === 'object') {
     			deferred.resolve(data);
     		}else{
     			deferred.reject(data);
     		}
	    }).error(function(data, status, headers, config) {
			deferred.reject(data);
	    });
	    return deferred.promise;
	};


	self.getEventsData();

	
	return self;
}]);

