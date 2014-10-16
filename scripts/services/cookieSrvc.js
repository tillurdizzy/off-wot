'use strict';

APP.service('cookieSrvc',['$cookieStore',function ($cookieStore){
	var self = this;

	self.gamerCookie = null;
	self.canEdit = null;

	// SET COOKIES
	
	self.setCookie = function(gamertag){
		$cookieStore.put('Gamertag',gamertag);
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
		}
	};

	self.getEditStatus = function(){
		var myCookie = $cookieStore.get('EditStatus');
		if(myCookie!=undefined){		
			self.canEdit = myCookie;
		}
	};

	//REMOVE COOKIES

	self.removeCookie = function(){
		$cookieStore.remove('Gamertag');
		self.getCookie();
	};

	self.removeEditStatus = function(){
		$cookieStore.remove('EditStatus');
		self.getEditStatus();
	};

	self.getCookie();
	self.getEditStatus();

	// production only : remove cookies every refresh
	//self.removeCookie();


	return self;
}]);

