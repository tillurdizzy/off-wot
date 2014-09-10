'use strict';

APP.service('sqlDb',['$http','$q',function sqlQueries($http,$q){
	var self = this;
	self.mapResult = [];
	self.mapMarkers = [];
	self.newMemberResult = [];
	self.utcAdjusted = [];
	self.scheduleResult = [];
	self.tableProvider = [];
	self.timeLineProvider = [];

	 self.zoneOffset = [
		{zone:'UTC',offset:0},
		{zone:'ECT',offset:1},
		{zone:'EET',offset:2},
		{zone:'AST',offset:-4},
		{zone:'EST',offset:-5},
		{zone:'CST',offset:-6},
		{zone:'MST',offset:-7},
		{zone:'PST',offset:-8},
		{zone:'AKST',offset:-9},
		{zone:'HST',offset:-10},
		{zone:'MIT',offset:-11},
		{zone:'NST',offset:12},
		{zone:'SST',offset:11},
		{zone:'ACT',offset:10},
		{zone:'JST',offset:9},
		{zone:'CTT',offset:8},
		{zone:'VST',offset:7},
		{zone:'IST',offset:6},
		{zone:'PLT',offset:5},
		{zone:'MET',offset:4},
		{zone:'EAT',offset:3},
		{zone:'AGT',offset:-3}];

	self.offsetConversions = [
	{offset:-44,clock:"4AM",hour:4,day:0},
	{offset:-43,clock:"5AM",hour:5,day:0},
	{offset:-42,clock:"6AM",hour:6,day:0},
	{offset:-41,clock:"7AM",hour:7,day:0},
	{offset:-40,clock:"8AM",hour:8,day:0},
	{offset:-39,clock:"9AM",hour:9,day:0},
	{offset:-38,clock:"10AM",hour:10,day:0},
	{offset:-37,clock:"11AM",hour:11,day:0},
	{offset:-36,clock:"Noon",hour:12,day:0},
	{offset:-35,clock:"1PM",hour:13,day:0},
	{offset:-34,clock:"2PM",hour:14,day:0},
	{offset:-33,clock:"3PM",hour:15,day:0},
	{offset:-32,clock:"4PM",hour:16,day:0},
	{offset:-31,clock:"5PM",hour:17,day:0},
	{offset:-30,clock:"6PM",hour:18,day:0},
	{offset:-29,clock:"7PM",hour:19,day:0},
	{offset:-28,clock:"8PM",hour:20,day:0},
	{offset:-27,clock:"9PM",hour:21,day:0},
	{offset:-26,clock:"10PM",hour:22,day:0},
	{offset:-25,clock:"11PM",hour:23,day:0},
	{offset:-24,clock:"Midnight",hour:0,day:0},
	{offset:-23,clock:"1AM",hour:1,day:1},
	{offset:-22,clock:"2AM",hour:2,day:1},
	{offset:-21,clock:"3AM",hour:3,day:1},
	{offset:-20,clock:"4AM",hour:4,day:1},
	{offset:-19,clock:"5AM",hour:5,day:1},
	{offset:-18,clock:"6AM",hour:6,day:1},
	{offset:-17,clock:"7AM",hour:7,day:1},
	{offset:-16,clock:"8AM",hour:8,day:1},
	{offset:-15,clock:"9AM",hour:9,day:1},
	{offset:-14,clock:"10AM",hour:10,day:1},
	{offset:-13,clock:"11AM",hour:11,day:1},
		{offset:-12,clock:"Noon",hour:12,day:1},
		{offset:-11,clock:"1PM",hour:13,day:1},
		{offset:-10,clock:"2PM",hour:14,day:1},
		{offset:-9,clock:"3PM",hour:15,day:1},
		{offset:-8,clock:"4PM",hour:16,day:1},
		{offset:-7,clock:"5PM",hour:17,day:1},
		{offset:-6,clock:"6PM",hour:18,day:1},
		{offset:-5,clock:"7PM",hour:19,day:1},
		{offset:-4,clock:"8PM",hour:20,day:1},
		{offset:-3,clock:"9PM",hour:21,day:1},
		{offset:-2,clock:"10PM",hour:22,day:1},
		{offset:-1,clock:"11PM",hour:23,day:1},
		{offset:0,clock:"Midnight",hour:24,day:1},
		{offset:1,clock:"1AM",hour:1,day:2},
		{offset:2,clock:"2AM",hour:2,day:2},
		{offset:3,clock:"3AM",hour:3,day:2},
		{offset:4,clock:"4AM",hour:4,day:2},
		{offset:5,clock:"5AM",hour:5,day:2},
		{offset:6,clock:"6AM",hour:6,day:2},
		{offset:7,clock:"7AM",hour:7,day:2},
		{offset:8,clock:"8AM",hour:8,day:2},
		{offset:9,clock:"9AM",hour:9,day:2},
		{offset:10,clock:"10AM",hour:10,day:2},
		{offset:11,clock:"11AM",hour:11,day:2},
		{offset:12,clock:"Noon",hour:12,day:2},
		{offset:13,clock:"1PM",hour:13,day:2},
		{offset:14,clock:"2PM",hour:14,day:2},
		{offset:15,clock:"3PM",hour:15,day:2},
		{offset:16,clock:"4PM",hour:16,day:2},
		{offset:17,clock:"5PM",hour:17,day:2},
		{offset:18,clock:"6PM",hour:18,day:2},
		{offset:19,clock:"7PM",hour:19,day:2},
		{offset:20,clock:"8PM",hour:20,day:2},
		{offset:21,clock:"9PM",hour:21,day:2},
		{offset:22,clock:"10PM",hour:22,day:2},
		{offset:23,clock:"11PM",hour:23,day:2},
		{offset:24,clock:"Midnight",hour:24,day:2},
		{offset:25,clock:"1AM",hour:1,day:3},
		{offset:26,clock:"2AM",hour:2,day:3},
		{offset:27,clock:"3AM",hour:3,day:3},
		{offset:28,clock:"4AM",hour:4,day:3},
		{offset:29,clock:"5AM",hour:5,day:3},
		{offset:30,clock:"6AM",hour:6,day:3},
		{offset:31,clock:"7AM",hour:7,day:3},
		{offset:32,clock:"8AM",hour:8,day:3},
		{offset:33,clock:"9AM",hour:9,day:3},
		{offset:34,clock:"10AM",hour:10,day:3},
		{offset:35,clock:"11AM",hour:11,day:3},
		{offset:36,clock:"Noon",hour:12,day:3},
		{offset:38,clock:"1PM",hour:13,day:3},
		{offset:39,clock:"2PM",hour:14,day:3},
		{offset:40,clock:"3PM",hour:15,day:3},
		{offset:41,clock:"4PM",hour:16,day:3},
		{offset:42,clock:"5PM",hour:17,day:3},
		{offset:43,clock:"6PM",hour:18,day:3},
		{offset:44,clock:"7PM",hour:19,day:3},
		];


	self.oneDay = 3600000*24;
	self.utc12AM = -2209053600000;
	self.utcnoon = -2209010400000;
	self.utcMidnight = -2208967200000;

	self.tierList = [
		{tier:'I',value:1},
		{tier:'II',value:2},
		{tier:'III',value:3},
		{tier:'IV',value:4},
		{tier:'V',value:5},
		{tier:'VI',value:6},
		{tier:'VII',value:7},
		{tier:'VIII',value:8},
		{tier:'IX',value:9},
		{tier:'X',value:10}
	];

	
	self.queryDB = function(){
		self.mapResult = [];
		
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/wotGetAll.php'}).
		success(function(data, status) {
     		self.mapResult = data;
     		
     		deferred.resolve(data);
	    }).
		error(function(data, status, headers, config) {
	      	self.mapResult = data;
			deferred.reject(data);
	    });

	    return deferred.promise; //return the data
	};

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

	self.insertData = function(dataObj){
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/wotInsert.php',data:dataObj}).
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

	self.removeMarker = function(removeid){
		var dataObj = new Object();
		dataObj.id = removeid.toString();
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/deleteMarker.php',data:dataObj}).
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

	self.returnMapData = function(MAP){
		var rtn = new Array();
		for (var i = 0; i < self.mapResult.length; i++) {
     		if(self.mapResult[i].map == MAP ){
     			rtn.push(self.mapResult[i]);
     		}
     	};
		return rtn;
	};

	self.getMapMarkers = function(mapname){
		self.mapMarkers = [];
		var dataObj = new Object();
		dataObj.map = mapname;
		var deferred = $q.defer();
		$http({method: 'POST', url: 'scripts/phpsql/wotGetMapMarkers.php',data:dataObj}).
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

	self.returnNewMembers = function(){
		return self.newMemberResult;
	};

	self.returnTableData = function(ZONE){
		self.tableProvider = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);// integer from -12 to +12
		//console.log("***************** NEW LOOKUP *********************");
		for (var i = 0; i < self.scheduleResult.length; i++) {
			var gamer = self.scheduleResult[i].member;
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
			tblObj.member =gamer;
			tblObj.tier_low = self.scheduleResult[i].tier_low;
			tblObj.tier_high = self.scheduleResult[i].tier_high;
     		tblObj.beg = begMember;
     		tblObj.end = endMember;
     		tblObj.zone = memberZone;
     		self.tableProvider.push(tblObj);
     	}
		return self.tableProvider;
	};

	self.returnTimelineData = function(ZONE){
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
			var gamer = self.scheduleResult[i].member;
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

			
			rtnObj.member = self.scheduleResult[i].member;
			rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
			rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     		rtnObj.beg = beginBarOne;
     		rtnObj.end = endBarOne;
     		rtnObj.zone = memberZone;
     		self.timeLineProvider.push(rtnObj);

			if(splitBar == true){
     			rtnObj = new Object();
				rtnObj.member = self.scheduleResult[i].member;
				rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
				rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     			rtnObj.beg = beginBarTwo;
     			rtnObj.end = endBarTwo;
     			rtnObj.zone = memberZone;
     			self.timeLineProvider.push(rtnObj);
			}
     	};
     
     	for (var x = 0; x < self.timeLineProvider.length; x++) {
     		console.log(x + self.timeLineProvider[x].member);
     	};
		return self.timeLineProvider;
	};

	// used for table data
	self.returnClock = function(offset){
		var rtnStr;
		for (var i = 0; i < self.offsetConversions.length; i++) {
			if( self.offsetConversions[i].offset == offset){
				rtnStr = self.offsetConversions[i].clock;
				break;
			}
		};
		return rtnStr;
	};
	// used for chart data
	self.returnHour = function(offset){
		var rtnObj = new Object();
		for (var i = 0; i < self.offsetConversions.length; i++) {
			if( self.offsetConversions[i].offset == offset){
				rtnObj.hour = self.offsetConversions[i].hour;
				rtnObj.day = self.offsetConversions[i].day;
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
		for (var i = 0; i < self.zoneOffset.length; i++) {
			if(self.zoneOffset[i].zone == tzone){
				rtn = self.zoneOffset[i].offset;
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
		for (var i = 0; i < self.tierList.length; i++) {
			if(self.tierList[i].value == num){
				rtn = self.tierList[i].tier;
				break
			}
		};
		return rtn;
	}

	self.searchFarts = function(startTime,ZONE,TIER){
		var workArray = new Array();
		var rtnObj = new Object();
		var utcOffset = 0;
		for (var i = 0; i < self.zoneOffset.length; i++) {
			if(self.zoneOffset[i].zone == ZONE){
				utcOffset = self.zoneOffset[i].offset;
				break;
			}
		};
		console.log("START FIND:" + startTime);
		for (var i = 0; i < self.scheduleResult.length; i++) {
			//console.log(i + " beg:" + self.scheduleResult[i].beg + " end:" + self.scheduleResult[i].end);
			if(self.scheduleResult[i].beg <= startTime && self.scheduleResult[i].end >= startTime){
				if(self.tierMatch(TIER,self.scheduleResult[i].tier_low,self.scheduleResult[i].tier_high) == true){
					rtnObj = new Object();
					var utcBegNum = parseInt(self.scheduleResult[i].beg);
					var utcEndNum = parseInt(self.scheduleResult[i].end);
					var utcBegDate = new Date(70,0,0,utcBegNum,0,0);
					var utcEndDate = new Date(70,0,0,utcEndNum,0,0);
					var utcBegMsec = utcBegDate.getTime();
					var utcEndMsec = utcEndDate.getTime();
					var convertedBegMsec = utcBegMsec + utcOffset;
					var convertedEndMsec = utcEndMsec + utcOffset;
					rtnObj.member = self.scheduleResult[i].member;
	     			rtnObj.beg = new Date(convertedBegMsec);
	     			rtnObj.end = new Date(convertedEndMsec);
	     			rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
					rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
	     			workArray.push(rtnObj);
				}
			}
		}

		return workArray;
	};

	self.tierMatch = function(tier,low,high){
		var rtnBoolen = false;
		if(tier >= low && tier <= high){
			rtnBoolen = true
		}
		return rtnBoolen;
	}


	return self;
}]);

