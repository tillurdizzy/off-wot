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
	self.commander="Example";
	self.removeID = 0;

	self.mapList = [
		{label:'Abbey',value:'abbey',url:'images/map_abby.jpg'},
		{label:'Cliff',value:'cliff',url:'images/map_cliff.jpg'},
		{label:'Cliff Encounter',value:'cliff_e',url:'images/map_cliff_encounter.jpg'},
		{label:'El Halluf',value:'hallouf',url:'images/map_elhalluf.jpg'},
		{label:'El Halluf Encounter',value:'hallouf_e',url:'images/map_elhalluf_encounter.jpg'},
		{label:'Ensk',value:'ensk',url:'images/map_ensk.jpg'},
		{label:'Ensk Encounter',value:'ensk_e',url:'images/map_ensk_encounter.jpg'},
		{label:'Erlenberg',value:'erlenberg',url:'images/map_erlenberg.jpg'},
		{label:'Erlenberg Encounter',value:'erlenberg_e',url:'images/map_erlenberg_encounter.jpg'},
		{label:'Erlenberg Assault',value:'erlenberg_a',url:'images/map_erlenberg_assault.jpg'},
		{label:'Fishermans Bay',value:'fish',url:'images/map_fish.jpg'},
		{label:'Fishermans Bay Encounter',value:'fish_e',url:'images/map_fish_encounter.jpg'},
		{label:'Himmelsdorf',value:'himmelsdorf',url:'images/map_himmel.jpg'},
		{label:'Himmelsdorf Encounter',value:'himmelsdorf_e',url:'images/map_himmel_encounter.jpg'},
		{label:'Komarin',value:'komarin',url:'images/map_komarin.jpg'},
		{label:'Lakeville',value:'lakeville',url:'images/map_lakeville.jpg'},
		{label:'Lakeville Encounter',value:'lakeville_e',url:'images/map_lakeville_encounter.jpg'},
		{label:'Live Oaks',value:'oaks',url:'images/map_liveoak.jpg'},
		{label:'Malinovka',value:'malinovka',url:'images/map_malinkova.jpg'},
		{label:'Malinovka Assault',value:'malinovka_a',url:'images/map_malinkova_assault.jpg'},
		{label:'Malinovka Encounter',value:'malinovka_e',url:'images/map_malinkova_encounter.jpg'},
		{label:'Mines',value:'mines',url:'images/map_mines.jpg'},
		{label:'Mines Encounter',value:'mines_e',url:'images/map_mines_encounter.jpg'},
		{label:'Mountain Pass',value:'mountain',url:'images/map_mountainpass.jpg'},
		{label:'Mountain Pass Encounter',value:'mountain_e',url:'images/map_mountainpass_encounter.jpg'},
		{label:'Port',value:'port',url:'images/map_port.jpg'},
		{label:'Prokhorovka',value:'prokhorovka',url:'images/map_prokhorovka.jpg'},
		{label:'Prokhorovka Encounter',value:'prokhorovka_e',url:'images/map_prokhorovka_encounter.jpg'},
		{label:'Province',value:'province',url:'images/map_province.jpg'},
		{label:'Redshire',value:'redshire',url:'images/map_redshire.jpg'},
		{label:'Redshire Encounter',value:'redshire_e',url:'images/map_redshire_encounter.jpg'},
		{label:'Siegfried Line',value:'siegfried',url:'images/map_siegfried_standard.jpg'},
		{label:'Siegfried Line Assault',value:'siegfried_a',url:'images/map_siegfried_assault.jpg'},
		{label:'Siegfried Line Encounter',value:'siegfried_e',url:'images/map_siegfried_encounter.jpg'}
		];

	self.drawTypeList = [
		{label:'Light',value:'scout'},
		{label:'Artillary',value:'arty'},
		{label:'Destroyer',value:'destroy'},
		{label:'Medium',value:'medium'},
		{label:'Heavy',value:'heavy'},
		{label:'Danger',value:'danger'},
		{label:'Path',value:'path'}];

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
		{label:'Example',value:'Example'},
		{label:'Jaemonite',value:'Jaemonite'},
		{label:'TKE919',value:'TKE919'}];

	self.pushPointSet = function(ptSetObj){
		self.newPathObjects.push(ptSetObj);
		console.log("COM.newPathObjects = " + self.newPathObjects.length);
	}

	return self;
});

