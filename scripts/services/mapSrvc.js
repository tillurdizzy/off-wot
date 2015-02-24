'use strict';

APP.service('mapSrvc',function(){
	var self = this;
	self.currentMapData = new Array();
	self.newMarker = new Object();
	self.newPathObjects = [];
	self.mapUrl='images/map_abby.jpg';
	self.drawType="scout";
	self.spawnType="red";
	self.currentMapName="abbey";
	self.author="typical";
	self.commander="";
	self.removeID = 0;

	self.mapList = [
		{label:'Abbey Standard',value:'abbey',url:'images/map_abby.jpg'},
		{label:'Airfield Standard',value:'airfield',url:'images/map_airfield_standard.jpg'},
		{label:'Airfield Encounter',value:'airfield_e',url:'images/map_airfield_encounter.jpg'},
		{label:'Arctic Standard',value:'arctic',url:'images/map_arctic.jpg'},
		{label:'Cliff Standard',value:'cliff',url:'images/map_cliff.jpg'},
		{label:'Cliff Encounter',value:'cliff_e',url:'images/map_cliff_encounter.jpg'},
		{label:'El Halluf Standard',value:'hallouf',url:'images/map_elhalluf.jpg'},
		{label:'El Halluf Encounter',value:'hallouf_e',url:'images/map_elhalluf_encounter.jpg'},
		{label:'Ensk Standard',value:'ensk',url:'images/map_ensk.jpg'},
		{label:'Ensk Encounter',value:'ensk_e',url:'images/map_ensk_encounter.jpg'},
		{label:'Erlenberg Standard',value:'erlenberg',url:'images/map_erlenberg.jpg'},
		{label:'Erlenberg Encounter',value:'erlenberg_e',url:'images/map_erlenberg_encounter.jpg'},
		{label:'Erlenberg Assault',value:'erlenberg_a',url:'images/map_erlenberg_assault.jpg'},
		{label:'Fishermans Bay Standard',value:'fish',url:'images/map_fish.jpg'},
		{label:'Fishermans Bay Encounter',value:'fish_e',url:'images/map_fish_encounter.jpg'},
		{label:'Highway Standard',value:'highway',url:'images/map_highway_standard.jpg'},
		{label:'Himmelsdorf Standard',value:'himmelsdorf',url:'images/map_himmel.jpg'},
		{label:'Himmelsdorf Encounter',value:'himmelsdorf_e',url:'images/map_himmel_encounter.jpg'},
		{label:'Karelia Standard',value:'karelia',url:'images/map_karelia_standard.jpg'},
		{label:'Karelia Assault',value:'karelia_a',url:'images/map_karelia_assault.jpg'},
		{label:'Karelia Encounter',value:'karelia_e',url:'images/map_karelia_encounter.jpg'},
		{label:'Komarin Standard',value:'komarin',url:'images/map_komarin.jpg'},
		{label:'Lakeville Standard',value:'lakeville',url:'images/map_lakeville.jpg'},
		{label:'Lakeville Encounter',value:'lakeville_e',url:'images/map_lakeville_encounter.jpg'},
		{label:'Live Oaks Standard',value:'oaks',url:'images/map_liveoak.jpg'},
		{label:'Malinovka Standard',value:'malinovka',url:'images/map_malinkova.jpg'},
		{label:'Malinovka Assault',value:'malinovka_a',url:'images/map_malinkova_assault.jpg'},
		{label:'Malinovka Encounter',value:'malinovka_e',url:'images/map_malinkova_encounter.jpg'},
		{label:'Mines Standard',value:'mines',url:'images/map_mines.jpg'},
		{label:'Mines Encounter',value:'mines_e',url:'images/map_mines_encounter.jpg'},
		{label:'Mountain Pass',value:'mountain',url:'images/map_mountainpass.jpg'},
		{label:'Mountain Pass Encounter',value:'mountain_e',url:'images/map_mountainpass_encounter.jpg'},
		{label:'Murovanka Standard',value:'murovanka',url:'images/map_murovanka_standard.jpg'},
		{label:'Murovanka Encounter',value:'murovanka_e',url:'images/map_unavailable.jpg'},
		{label:'Pearl River Standard',value:'pearlriver',url:'images/map_pearlriver_standard.jpg'},
		{label:'Pearl River Encounter',value:'pearlriver_e',url:'images/map_pearlriver_encounter.jpg'},
		{label:'Port Standard',value:'port',url:'images/map_port.jpg'},
		{label:'Port Encounter',value:'port_e',url:'images/map_port_encounter.jpg'},
		{label:'Prokhorovka',value:'prokhorovka',url:'images/map_prokhorovka.jpg'},
		{label:'Prokhorovka Encounter',value:'prokhorovka_e',url:'images/map_prokhorovka_encounter.jpg'},
		{label:'Province Standard',value:'province',url:'images/map_province_standard.jpg'},
		{label:'Redshire Standard',value:'redshire',url:'images/map_redshire.jpg'},
		{label:'Redshire Encounter',value:'redshire_e',url:'images/map_redshire_encounter.jpg'},
		{label:'Sand River Standard',value:'sandriver',url:'images/map_sandriver_standard.jpg'},
		{label:'Sand River Assault',value:'sandriver_a',url:'images/map_sandriver_assault.jpg'},
		{label:'Siegfried Line Standard',value:'siegfried',url:'images/map_siegfried_standard.jpg'},
		{label:'Siegfried Line Assault',value:'siegfried_a',url:'images/map_siegfried_assault.jpg'},
		{label:'Siegfried Line Encounter',value:'siegfried_e',url:'images/map_siegfried_encounter.jpg'},
		{label:'Steppes Standard',value:'steppes',url:'images/map_steppes_standard.jpg'},
		{label:'Westfield Standard',value:'westfield',url:'images/map_westfield_standard.jpg'},
		{label:'Westfield Assault',value:'westfield_a',url:'images/map_westfield_assault.jpg'},
		{label:'Widepark Standard',value:'widepark',url:'images/map_widepark_standard.jpg'},
		{label:'Widepark Encounter',value:'widepark_e',url:'images/map_widepark_encounter.jpg'}
		];

	self.drawTypeList = [
		{label:'Light',value:'scout'},
		{label:'Artillary',value:'arty'},
		{label:'Destroyer',value:'destroy'},
		{label:'Medium',value:'medium'},
		{label:'Heavy',value:'heavy'},
		{label:'Danger',value:'danger'}];

	self.spawnLocationList = [
		{label:'Red',value:'red'},
		{label:'Green',value:'green'}];

	self.platoonStrategyNum = [
		{label:'Strategy I',value:'I'},
		{label:'Strategy II',value:'II'},{label:'Strategy III',value:'III'},{label:'Strategy IV',value:'IV'}];

	self.tankList = [
		{label:'Tank 1',value:'T1'},
		{label:'Tank 2',value:'T2'},
		{label:'Tank 3',value:'T3'},
		{label:'Tank 4',value:'T4'}];

	self.commanderList = [
		{label:'SmokyFiber163',value:'SmokyFiber163'},
		{label:'Torgyj',value:'Torgyj'}];

	self.pushPointSet = function(ptSetObj){
		self.newPathObjects.push(ptSetObj);
	}

	self.returnMapObj = function(mapVal){
		var rtnObj = new Object();
		for (var i = 0; i < self.mapList.length; i++) {
			if (self.mapList[i].value==mapVal) {
				rtnObj = self.mapList[i];
			};
		};
		return rtnObj;
	}

	self.returnCommander = function(gamertag){
		
		var rtnObj = new Object();
		for (var i = 0; i < self.commanderList.length; i++) {
			if(self.commanderList[i].label == gamertag){
				self.commander=self.commanderList[i].value;
				rtnObj = self.commanderList[i];
			}
		};
		return rtnObj;
	}

	self.commander=self.commanderList[0].value;

	return self;
});

