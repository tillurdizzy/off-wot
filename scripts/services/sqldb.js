'use strict';

APP.service('sqlDb',['$http','$q',function sqlQueries($http,$q){
	var self = this;
	self.mapResult = [];
	self.newMemberResult = [];
	self.utcAdjusted = [];
	self.scheduleResult = [];
	self.tableResult = [];
	self.zoneOffset = [
		{zone:'UTC',offset:0},
		{zone:'ECT',offset:3600000*1},
		{zone:'EET',offset:3600000*2},
		{zone:'AST',offset:3600000*-4},
		{zone:'EST',offset:3600000*-5},
		{zone:'CST',offset:3600000*-6},
		{zone:'MST',offset:3600000*-7},
		{zone:'PST',offset:3600000*-8},
		{zone:'AKST',offset:3600000*-9},
		{zone:'HST',offset:3600000*-10},
		{zone:'MIT',offset:3600000*-11},
		{zone:'NST',offset:3600000*12},
		{zone:'SST',offset:3600000*11},
		{zone:'ACT',offset:3600000*10},
		{zone:'JST',offset:3600000*9},
		{zone:'CTT',offset:3600000*8},
		{zone:'VST',offset:3600000*7},
		{zone:'IST',offset:3600000*6},
		{zone:'PLT',offset:3600000*5},
		{zone:'MET',offset:3600000*4},
		{zone:'EAT',offset:3600000*3},
		{zone:'AGT',offset:3600000*-3}
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

	self.returnNewMembers = function(){
		return self.newMemberResult;
	};

	self.returnScheduleTable = function(){
		return self.tableResult;
	};

	self.returnScheduleData = function(ZONE){
		var workArray = new Array();
		var selectedZoneOffset = self.returnOffset(ZONE);
		var AM = self.utc12AM;
		var PM = self.utcMidnight;
		var rtnObj = new Object();

		rtnObj.member = "-" + ZONE + "-";
		rtnObj.tier_low = "";
		rtnObj.tier_high =  "NA";
     	rtnObj.beg = new Date(AM + selectedZoneOffset);
     	rtnObj.end = new Date(PM + selectedZoneOffset);
     	workArray.push(rtnObj);

		for (var i = 0; i < self.scheduleResult.length; i++) {
			rtnObj = new Object();
			var gamer = self.scheduleResult[i].member;
			var memberZone = self.scheduleResult[i].zone;
			
			//time from database is the UTC equivelent... i.e. as if the member was in UTC when they selected the time
			var utcBegMsec = parseInt(self.scheduleResult[i].beg);
			var utcEndMsec = parseInt(self.scheduleResult[i].end);
			self.logHour(utcBegMsec,utcEndMsec,"From Database " + gamer + "..........................");
			
			// apply offset for member time zone
			var memberOffset = self.returnOffset(memberZone);
			var memberBegMsec = utcBegMsec + memberOffset;
			var memberEndMsec = utcEndMsec + memberOffset;
			self.logHour(memberBegMsec,memberEndMsec,"With member offset");

			// subtract 1 day if it went to the next day
			if(memberBegMsec > PM){
				memberBegMsec-=self.oneDay;
				memberEndMsec-=self.oneDay;
				self.logHour(memberBegMsec,memberEndMsec,"Subtracted 1 day");
			}

			// add 1 day if it went to the previous day
			if(memberBegMsec < AM && memberEndMsec < AM){
				memberBegMsec+=self.oneDay;
				memberEndMsec+=self.oneDay;
				self.logHour(memberBegMsec,memberEndMsec,"Added 1 day");
			}
			

			var splitBar = false;

			if(memberBegMsec < AM && memberEndMsec > AM){
				splitBar = true;
				// divide the bar into 2 segments
				var memberBegMsecBarOne = AM;
				var memberEndMsecBarOne = memberEndMsec;

				var memberBegMsecBarTwo = memberBegMsec + self.oneDay;
				var memberEndMsecBarTwo = PM;
			}

			if(memberBegMsec < PM && memberEndMsec > PM){
				splitBar = true;
				// divide the bar into 2 segments
				var memberBegMsecBarOne = memberBegMsec;
				var memberEndMsecBarOne = PM;

				var memberBegMsecBarTwo = AM;
				var memberEndMsecBarTwo = memberEndMsec - self.oneDay;
			}

			
			// apply offset for selected time zone
			

			memberBegMsec+=selectedZoneOffset;
			memberEndMsec+=selectedZoneOffset;
			self.logHour(memberBegMsec,memberEndMsec,"With zone offset");

			if(splitBar == true){
				memberBegMsecBarOne+=selectedZoneOffset;
				memberEndMsecBarOne+=selectedZoneOffset;
				memberBegMsecBarTwo+=selectedZoneOffset;
				memberEndMsecBarTwo+=selectedZoneOffset;
			}

			var graphDateBegin;
			var graphDateEnd;


			if(splitBar == true){
				graphDateBegin = new Date(memberBegMsecBarOne);
				graphDateEnd = new Date(memberEndMsecBarOne);
				rtnObj.member = self.scheduleResult[i].member;
				rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
				rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     			rtnObj.beg = graphDateBegin;
     			rtnObj.end = graphDateEnd;
     			rtnObj.zone = memberZone;
     			workArray.push(rtnObj);

     			rtnObj = new Object();
     			graphDateBegin = new Date(memberBegMsecBarTwo);
				graphDateEnd = new Date(memberEndMsecBarTwo);
				rtnObj.member = self.scheduleResult[i].member;
				rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
				rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     			rtnObj.beg = graphDateBegin;
     			rtnObj.end = graphDateEnd;
     			rtnObj.zone = memberZone;
     			workArray.push(rtnObj);

			}else{
				graphDateBegin = new Date(memberBegMsec);
				graphDateEnd = new Date(memberEndMsec);
				rtnObj.member = self.scheduleResult[i].member;
				rtnObj.tier_low = self.integerToTier(self.scheduleResult[i].tier_low);
				rtnObj.tier_high = self.integerToTier(self.scheduleResult[i].tier_high);
     			rtnObj.beg = graphDateBegin;
     			rtnObj.end = graphDateEnd;
     			rtnObj.zone = memberZone;
     			workArray.push(rtnObj);
			}
     	};
     	self.tableResult = [];
     	for (var x = 0; x < workArray.length; x++) {
     		var tblObj = new Object();
     		tblObj.member = workArray[x].member;
			tblObj.tier_low = workArray[x].tier_low;
			tblObj.tier_high = workArray[x].tier_high;
     		tblObj.beg = self.formatDate(workArray[x].beg.toJSON());
     		tblObj.end = self.formatDate(workArray[x].end.toJSON());
     		tblObj.zone = workArray[x].zone;
     		self.tableResult.push(tblObj);
     	};
     	
		return workArray;
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
				console.log(tzone + " Offset #" + i);
				break;	
			}
		};
		return rtn;
	};

	self.logHour = function(beg,end,comment){
		var dateBeg = new Date(beg);
		var dateEnd = new Date(end);
		var hourBeg = dateBeg.getHours();
		var hourEnd = dateEnd.getHours();
		console.log(comment + " : Beg = " +  hourBeg + " End = " + hourEnd);
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

