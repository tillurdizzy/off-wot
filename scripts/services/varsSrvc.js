'use strict';

APP.service('VarsSrvc',[function (){
	var self = this;

	self.zoneList = [
	    {label:'Greenwich',value:'UTC',description:'Greenwich Mean Time, UTC -0 hours'},
	    {label:'Europe Central (+1)',value:'ECT',description:'European Central, UTC +1 hours'},
	    {label:'Europe Eastern (+2)',value:'EET',description:'Eastern European, UTC +2 hours'},
	    {label:'US Atlantic (-4)',value:'AST',description:'Atlantic, UTC -4 hours'},
	    {label:'US Eastern (-5)',value:'EST',description:'Eastern, UTC -5 hours'},
	    {label:'US Central (-6)',value:'CST',description:'Central, UTC -6 hours'},
	    {label:'US Mountain (-7)',value:'MST',description:'Mountain, UTC -7 hours'},
		{label:'US Pacific (-8)',value:'PST',description:'Pacific, UTC -8 hours'},
		{label:'Alaska (-9)',value:'AKST',description:'Alaska, UTC -9 hours'},
		{label:'Hawaii (-10)',value:'HST',description:'Hawaii, UTC -10 hours'},
		{label:'Midway (-11)',value:'MIT',description:'Midway, UTC -11 hours'},
		{label:'New Zealand (+12)',value:'NST',description:'New Zealand, UTC +12 hours'},
		{label:'Solomon (+11)',value:'SST',description:'Solomon Islands, UTC +11 hours'},
		{label:'Australia (+10)',value:'ACT',description:'Australia, UTC +10 hours'},
		{label:'Japan (+9)',value:'JST',description:'Japan, UTC +9 hours'},
		{label:'China (+8)',value:'CTT',description:'China, UTC +8 hours'},
		{label:'Vietnam (+7)',value:'VST',description:'Vietnam, UTC +7 hours'},
		{label:'India (+6)',value:'IST',description:'India, UTC +6 hours'},
		{label:'Pakistan (+5)',value:'PLT',description:'Pakistan, UTC +5 hours'},
		{label:'Middle East (+4)',value:'MET',description:'Middle East, UTC +4 hours'},
		{label:'Africa (+3)',value:'EAT',description:'African, UTC +3 hours'},
		{label:'Argentina (-3)',value:'AGT',description:'African, UTC -3 hours'}];

	self.timeList = [
			{clock:'12 AM',hour:0},
			{clock:' 1 AM',hour:1},
			{clock:' 2 AM',hour:2},
			{clock:' 3 AM',hour:3},
			{clock:' 4 AM',hour:4},
			{clock:' 5 AM',hour:5},
			{clock:' 6 AM',hour:6},
			{clock:' 7 AM',hour:7},
			{clock:' 8 AM',hour:8},
			{clock:' 9 AM',hour:9},
			{clock:'10 AM',hour:10},
			{clock:'11 AM',hour:11},
			{clock:'Noon',hour:12},
			{clock:' 1 PM',hour:13},
			{clock:' 2 PM',hour:14},
			{clock:' 3 PM',hour:15},
			{clock:' 4 PM',hour:16},
			{clock:' 5 PM',hour:17},
			{clock:' 6 PM',hour:18},
			{clock:' 7 PM',hour:19},
			{clock:' 8 PM',hour:20},
			{clock:' 9 PM',hour:21},
			{clock:'10 PM',hour:22},
			{clock:'11PM',hour:23},
			{clock:'Midnight',hour:24}
		];

	self.timeListB = [
			{clock:' 1 AM',hour:1},
			{clock:' 2 AM',hour:2},
			{clock:' 3 AM',hour:3},
			{clock:' 4 AM',hour:4},
			{clock:' 5 AM',hour:5},
			{clock:' 6 AM',hour:6},
			{clock:' 7 AM',hour:7},
			{clock:' 8 AM',hour:8},
			{clock:' 9 AM',hour:9},
			{clock:'10 AM',hour:10},
			{clock:'11 AM',hour:11},
			{clock:'Noon',hour:12},
			{clock:' 1 PM',hour:13},
			{clock:' 2 PM',hour:14},
			{clock:' 3 PM',hour:15},
			{clock:' 4 PM',hour:16},
			{clock:' 5 PM',hour:17},
			{clock:' 6 PM',hour:18},
			{clock:' 7 PM',hour:19},
			{clock:' 8 PM',hour:20},
			{clock:' 9 PM',hour:21},
			{clock:'10 PM',hour:22},
			{clock:'11PM',hour:23},
			{clock:'Midnight',hour:24}
		];

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
		{offset:37,clock:"1PM",hour:13,day:3},
		{offset:38,clock:"2PM",hour:14,day:3},
		{offset:39,clock:"3PM",hour:15,day:3},
		{offset:40,clock:"4PM",hour:16,day:3},
		{offset:41,clock:"5PM",hour:17,day:3},
		{offset:42,clock:"6PM",hour:18,day:3},
		{offset:43,clock:"7PM",hour:19,day:3},
		{offset:44,clock:"8PM",hour:20,day:3},
		];

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
	self.weekDayObjects = [
		{label:"Sunday",value:0},
		{label:"Monday",value:1},
		{label:"Tuesday",value:2},
		{label:"Wednesday",value:3},
		{label:"Thursday",value:4},
		{label:"Friday",value:5},
		{label:"Saturday",value:6}];
		
	self.sortValObjects = [
		{label:"1",value:1},
		{label:"2",value:2},
		{label:"3",value:3},
		{label:"4",value:4},
		{label:"5",value:5},
		{label:"6",value:6}];
	
	self.weekDayLabels = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	self.monthLabels = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	self.returnTierObj = function(val){
		var rtnObj = new Object();
		for (var i = 0; i < self.tierList.length; i++) {
			if(self.tierList[i].value == val){
				rtnObj = self.tierList[i];
				break;
			}
		};
		return rtnObj;
	};

	self.returnZoneObj = function(val){
		var rtnObj = new Object();
		for (var i = 0; i < self.zoneList.length; i++) {
			if(self.zoneList[i].value == val){
				rtnObj = self.zoneList[i];
				break;
			}
		};
		return rtnObj;
	};

	self.returnTimeObj = function(val){
		var rtnObj = new Object();
		for (var i = 0; i < self.timeList.length; i++) {
			if(self.timeList[i].hour == parseInt(val)){
				rtnObj = self.timeList[i];
				break;
			}
		};
		return rtnObj;
	};

	self.returnTimeObjB = function(val){
		var rtnObj = new Object();
		for (var i = 0; i < self.timeListB.length; i++) {
			if(self.timeListB[i].hour == parseInt(val)){
				rtnObj = self.timeListB[i];
				break;
			}
		};
		return rtnObj;
	};

	self.returnClockHour = function(Hr24){
		var rtnStr;
		for (var i = 0; i < self.timeList.length; i++) {
			if( self.timeList[i].hour == Hr24){
				rtnStr = self.timeList[i].clock;
				break;
			}
		};
		return rtnStr;
	};


	return self;
}]);

