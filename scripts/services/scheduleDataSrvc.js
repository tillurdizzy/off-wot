'use strict';

APP.service('scheduleDbSrvc',['$http','$q','VarsSrvc',function sqlQueries($http,$q,VarsSrvc){
	var self = this;
	
	self.newMemberResult = [];
	self.utcAdjusted = [];
	self.scheduleResult = [];
	self.eventsResult = [];
	self.tableProvider = [];
	self.timeLineProvider = [];
	self.VARS = VarsSrvc;
	
	self.oneDay = 3600000*24;
	self.utc12AM = -2209053600000;
	self.utcnoon = -2209010400000;
	self.utcMidnight = -2208967200000;

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

	self.queryEvents = function(){
		self.eventsResult = [];

		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/getEvents.php'}).
		success(function(data, status) {
     		self.eventsResult = data;
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.eventsResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

	self.returnTableData = function(ZONE){
		self.tableProvider = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);// integer from -12 to +12
		//console.log("***************** NEW LOOKUP *********************");
		var i = 0;
		for (i = 0; i < self.scheduleResult.length; i++) {
			var gamer = self.scheduleResult[i].gamertag;
			var memberZone = self.scheduleResult[i].zone;
			var memberOffset = self.returnOffset(memberZone);
			var begHour = parseInt(self.scheduleResult[i].inputBeg);// integer from 0 to 24
			var endHour = parseInt(self.scheduleResult[i].inputEnd);

			var zoneDifference = selectedZoneOffset - memberOffset;
			//console.log("Difference between " + ZONE + " and " + memberZone + " = " + zoneDifference);
			var begMember = self.returnClock(begHour+zoneDifference);// Member's input time converted to selected zone ('4PM' etc.)
			var endMember = self.returnClock(endHour+zoneDifference);

			//self.logHour(begMember,endMember,gamer + " "+ memberZone);

			var tblObj = new Object();
			tblObj.member = gamer;
			tblObj.tier_low = self.scheduleResult[i].tier_low;
			tblObj.tier_high = self.scheduleResult[i].tier_high;
     		tblObj.beg = begMember;
     		tblObj.end = endMember;
     		tblObj.zone = memberZone;
     		self.tableProvider.push(tblObj);
     	}

     	for (i = 0; i < self.eventsResult.length; i++) {
			gamer = self.eventsResult[i].title;
			memberZone = self.eventsResult[i].zone;
			memberOffset = self.returnOffset(memberZone);
			begHour = parseInt(self.eventsResult[i].inputBeg);// integer from 0 to 24
			endHour = parseInt(self.eventsResult[i].inputEnd);

			zoneDifference = selectedZoneOffset - memberOffset;
			begMember = self.returnClock(begHour+zoneDifference);// Member's input time converted to selected zone ('4PM' etc.)
			endMember = self.returnClock(endHour+zoneDifference);

			tblObj = new Object();
			tblObj.member = gamer;
			tblObj.tier_low = self.eventsResult[i].tier_low;
			tblObj.tier_high = self.eventsResult[i].tier_high;
     		tblObj.beg = begMember;
     		tblObj.end = endMember;
     		tblObj.zone = memberZone;
     		self.tableProvider.push(tblObj);
     	}
		return self.tableProvider;
	};

	self.returnEventsTableData = function(ZONE){
		self.tableProvider = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);// integer from -12 to +12
		//console.log("***************** NEW LOOKUP *********************");
		for (var i = 0; i < self.eventsResult.length; i++) {
			var gamer = self.eventsResult[i].title;
			var memberZone = self.eventsResult[i].zone;
			var memberOffset = self.returnOffset(memberZone);
			var begHour = parseInt(self.eventsResult[i].inputBeg);// integer from 0 to 24
			var endHour = parseInt(self.eventsResult[i].inputEnd);

			var zoneDifference = selectedZoneOffset - memberOffset;
			//console.log("Difference between " + ZONE + " and " + memberZone + " = " + zoneDifference);
			var begMember = self.returnClock(begHour+zoneDifference);// Member's input time converted to selected zone ('4PM' etc.)
			var endMember = self.returnClock(endHour+zoneDifference);

			//self.logHour(begMember,endMember,gamer + " "+ memberZone);

			var tblObj = new Object();
			tblObj.member =gamer;
			tblObj.tier_low = self.eventsResult[i].tier_low;
			tblObj.tier_high = self.eventsResult[i].tier_high;
     		tblObj.beg = begMember;
     		tblObj.end = endMember;
     		tblObj.zone = memberZone;
     		self.tableProvider.push(tblObj);
     	}
		return self.tableProvider;
	};

	self.searchFarts = function(startTime,ZONE){
		self.tableProvider = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);// integer from -12 to +12
		//console.log("***************** NEW LOOKUP *********************");
		for (var i = 0; i < self.scheduleResult.length; i++) {
			var gamer = self.scheduleResult[i].gamertag;
			var memberZone = self.scheduleResult[i].zone;
			var memberOffset = self.returnOffset(memberZone);
			var begHour = parseInt(self.scheduleResult[i].inputBeg);// integer from 0 to 24
			var endHour = parseInt(self.scheduleResult[i].inputEnd);

			var zoneDifference = selectedZoneOffset - memberOffset;
			//console.log("Difference between " + ZONE + " and " + memberZone + " = " + zoneDifference);

			var begHourAdjusted = begHour+zoneDifference;
			var endHourAdjusted = endHour+zoneDifference;
			
			if(startTime >= begHourAdjusted && startTime<endHourAdjusted){
				var tblObj = new Object();
				var begMember = self.returnClock(begHourAdjusted);// Member's input time converted to selected zone ('4PM' etc.)
				var endMember = self.returnClock(endHourAdjusted);

				
				tblObj.member =gamer;
				tblObj.tier_low = self.scheduleResult[i].tier_low;
				tblObj.tier_high = self.scheduleResult[i].tier_high;
	     		tblObj.beg = begMember;
	     		tblObj.end = endMember;
	     		tblObj.zone = memberZone;
	     		self.tableProvider.push(tblObj);
			}
			
     	}
		return self.tableProvider;
	};

	/*self.returnTimelineData = function(ZONE){
		console.log("***************** NEW LOOKUP *********************");
		self.timeLineProvider = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);// integer from -12 to +12
		var AM = self.utc12AM;
		var PM = self.utcMidnight;
		var rtnObj = new Object();

		rtnObj.member = ZONE + " 24 Hrs.";
		rtnObj.tier_low = "";
		rtnObj.tier_high =  "NA";
     	rtnObj.beg = new Date(0,0,0,0,0,0);
     	rtnObj.end = new Date(0,0,1,0,0,0);
     	self.timeLineProvider.push(rtnObj);


		for (var i = 0; i < self.scheduleResult.length; i++) {
			rtnObj = new Object();
			var gamer = self.scheduleResult[i].gamertag;
			var memberZone = self.scheduleResult[i].zone;
			var memberOffset = self.returnOffset(memberZone);
			var begHour = parseInt(self.scheduleResult[i].inputBeg);// integer from 0 to 24
			var endHour = parseInt(self.scheduleResult[i].inputEnd);

			var zoneDifference = selectedZoneOffset - memberOffset;
			//console.log("Difference between " + ZONE + " and " + memberZone + " = " + zoneDifference);
			var begMember = self.returnHour(begHour+zoneDifference);// Member's input time converted to selected zone (int)
			var endMember = self.returnHour(endHour+zoneDifference);
			console.log(gamer + "****************************")
			console.log("Day:" + begMember.day + " Hour:" + begMember.hour);
			console.log("Day:" + endMember.day + " Hour:" + endMember.hour);

			var splitBar = false;
			var beginBarOne = new Date(0,0,0,begMember.hour,0,0);
			var endBarOne = new Date(0,0,0,begMember.hour + 12,0,0);
			var beginBarTwo;
			var endBarTwo;

			if(begMember.day == endMember.day){
				if(endMember.hour > begMember.hour){
					console.log("Case 1A");
					beginBarOne = new Date(0,0,0,begMember.hour,0,0);
					endBarOne = new Date(0,0,0,endMember.hour,0,0);
				}else if(endMember.hour < begMember.hour){
					console.log("Case 1B");
					splitBar = true;
					beginBarOne = new Date(0,0,0,0,0,0);
					endBarOne = new Date(0,0,0,endMember.hour,0,0);
					beginBarTwo = new Date(0,0,0,begMember.hour,0,0);
					endBarTwo = new Date(0,0,1,0,0,0);
				}
			}

			if(begMember.day < endMember.day){
				if(endMember.hour > begMember.hour){
					console.log("Case 2A");
					
				}else if(endMember.hour < begMember.hour){
					console.log("Case 2B");
					splitBar = true;
					beginBarOne = new Date(0,0,0,begMember.hour,0,0);
					endBarOne = new Date(0,0,1,0,0,0);
					beginBarTwo = new Date(0,0,0,0,0,0);
					endBarTwo = new Date(0,0,0,endMember.hour,0,0);
				}
			}

			if(begMember.day > endMember.day){
				if(endMember.hour > begMember.hour){
					console.log("Case 3A");
					beginBarOne = new Date(0,0,0,begMember.hour,0,0);
					endBarOne = new Date(0,0,0,endMember.hour,0,0);
				}else if(endMember.hour < begMember.hour){
					console.log("Case 3B");
					var validateHr = endMember.hour+=12;
					if(validateHr > 24){
						splitBar = true;
						begMember.hour+=12;
					}else{
						begMember.hour-=12;
					}
				}
			}

			
			rtnObj.member = self.scheduleResult[i].gamertag;
			rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
			rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     		rtnObj.beg = beginBarOne;
     		rtnObj.end = endBarOne;
     		rtnObj.zone = memberZone;
     		self.timeLineProvider.push(rtnObj);

			if(splitBar == true){
     			rtnObj = new Object();
				rtnObj.member = self.scheduleResult[i].gamertag;
				rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
				rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     			rtnObj.beg = beginBarTwo;
     			rtnObj.end = endBarTwo;
     			rtnObj.zone = memberZone;
     			self.timeLineProvider.push(rtnObj);
			}
     	};
     
     	for (var x = 0; x < self.timeLineProvider.length; x++) {
     		console.log(x + self.timeLineProvider[x].gamertag);
     	};
		return self.timeLineProvider;
	};*/

	// used for table data
	self.returnClock = function(offset){
		var rtnStr;
		for (var i = 0; i < self.VARS.offsetConversions.length; i++) {
			if( self.VARS.offsetConversions[i].offset == offset){
				rtnStr = self.VARS.offsetConversions[i].clock;
				break;
			}
		};
		return rtnStr;
	};
	// used for chart data
	self.returnHour = function(offset){
		var rtnObj = new Object();
		for (var i = 0; i < self.VARS.offsetConversions.length; i++) {
			if( self.VARS.offsetConversions[i].offset == offset){
				rtnObj.hour = self.VARS.offsetConversions[i].hour;
				rtnObj.day = self.VARS.offsetConversions[i].day;
				break;
			}
		};
		return rtnObj;
	};

	self.formatDate = function (dateJSON) {
	    var d = new Date(dateJSON);
	    var hh = d.getHours();
	   
	    var dd = "AM";
	    var h = hh;
	    if (h >= 12) {
	        h = hh-12;
	        dd = "PM";
	    }
	    if (h == 0) {
	        h = 12;
	    }

	   
	    var replacement = h + dd;
	 
	    return replacement;
	}

	self.returnOffset = function(tzone){
		var rtn = 0;
		for (var i = 0; i < self.VARS.zoneOffset.length; i++) {
			if(self.VARS.zoneOffset[i].zone == tzone){
				rtn = self.VARS.zoneOffset[i].offset;
				break;	
			}
		};
		return rtn;
	};

	self.logHour = function(beg,end,comment){
		console.log("Beg = " +  beg + " End = " + end + " : " + comment);
	}


	self.integerToTier = function(num){
		var rtn = 1;
		for (var i = 0; i < self.VARS.tierList.length; i++) {
			if(self.VARS.tierList[i].value == num){
				rtn = self.VARS.tierList[i].tier;
				break
			}
		};
		return rtn;
	}



	self.convertToUTC = function(hour,zone){

	}

	self.tierMatch = function(tier,low,high){
		var rtnBoolen = false;
		if(tier >= low && tier <= high){
			rtnBoolen = true
		}
		return rtnBoolen;
	}


	return self;
}]);

