'use strict';

APP.service('cookieSrvc',['$cookieStore',function ($cookieStore){
	var self = this;

	self.gamerCookie = null;
	self.memberID = null;
	self.canEdit = null;// not being used!

	// SET COOKIES
	
	self.setCookie = function(gamertag){
		$cookieStore.put('Gamertag',gamertag);
		self.getCookie();
	};

	self.setMemberID = function(_id){
		$cookieStore.put('memberID',_id);
		self.getCookie();
	};

	self.setEditStatus = function(stringBoolean){
		$cookieStore.put('EditStatus',stringBoolean);
		self.getEditStatus();
	};

	// GET COOKIES

	self.getCookie = function(){
		var myCookie = $cookieStore.get('Gamertag');
		if(myCookie!=undefined){		
			self.gamerCookie = myCookie;
		}else{
			self.gamerCookie = null;
		}
	};

	self.getEditStatus = function(){
		var myCookie = $cookieStore.get('EditStatus');
		if(myCookie!=undefined){		
			self.canEdit = myCookie;
		}
	};

	self.getID = function(){
		var myID = $cookieStore.get('memberID');
		if(myID!=undefined){		
			self.memberID = myID;
		}
	};

	//REMOVE COOKIES

	self.removeCookie = function(){
		$cookieStore.remove('Gamertag');
		self.gamerCookie = null;
		self.getCookie();
	};

	self.removeEditStatus = function(){
		$cookieStore.remove('EditStatus');
		self.getEditStatus();
	};

	self.getCookie();
	self.getID();
	self.getEditStatus();

	// production only : remove cookies every refresh
	//self.removeCookie();


	return self;
}]);

