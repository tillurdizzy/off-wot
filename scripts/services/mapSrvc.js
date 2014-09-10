'use strict';

APP.service('mapSrvc',function(){
	var self = this;
	self.currentMapData = new Array();
	self.newMarker = new Object();
	self.mapUrl;
	self.drawType;
	self.spawnType;
	self.currentMapName="";
	self.removeID = 0;

	self.mapList = [
		{label:'Abbey',value:'abbey',url:'images/map_abby.jpg'},
		{label:'Arctic',value:'arctic',url:'images/map_arctic.jpg'},
		{label:'Cliff',value:'cliff',url:'images/map_cliffs.jpg'},
		{label:'El Hallouf',value:'hallouf',url:'images/map_elahlluf.jpg'},
		{label:'El Hallouf Encounter',value:'hallouf_e',url:'images/map_elhalluf_encounter.jpg'},
		{label:'Ensk',value:'ensk',url:'images/map_ensk.jpg'},
		{label:'Ensk Encounter',value:'ensk_e',url:'images/map_ensk_encounter.jpg'},
		{label:'Erlenberg',value:'erlenberg',url:'images/map_erlenberg.jpg'},
		{label:'Erlenberg Encounter',value:'erlenberg_e',url:'images/map_erlenberg_encounter.jpg'},
		{label:'Erlenberg Assault',value:'erlenberg_a',url:'images/map_erlenberg_assault.jpg'},
		{label:'Fish Bay',value:'fish',url:'images/map_fish.jpg'},
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
		{label:'Murovanka',value:'murovanka',url:'images/map_murovanka.jpg'},
		{label:'Murovanka Encounter',value:'murovanka_e',url:'images/map_murovanka_encounter.jpg'},
		{label:'Port',value:'port',url:'images/map-port.jpg'},
		{label:'Prokhorovka',value:'prokhorovka',url:'images/map_prohovorka.jpg'},
		{label:'Prokhorovka Encounter',value:'prokhorovka_e',url:'images/map_prohovorka-encounter.jpg'},
		{label:'Province',value:'province',url:'images/map_province.jpg'},
		{label:'Redshire',value:'redshire',url:'images/map_redshire.jpg'},
		{label:'Redshire Encounter',value:'redshire_e',url:'images/map_redshire-encounter.jpg'},
		{label:'Sand River',value:'sandriver',url:'images/map_sandriver.jpg'},
		{label:'Sand River Assault',value:'sandriver_a',url:'images/map_sandriver_assault.jpg'},
		{label:'Sand River Encounter',value:'sandriver_e',url:'images/map_sandriver_encounter.jpg'},
		{label:'Westfield',value:'Westfield',url:'images/map_westfield.jpg'},
		{label:'Westfield Assault',value:'Westfield_a',url:'images/map_westfield_assault.jpg'},
		{label:'Widepark',value:'widepark',url:'images/map_widepark.jpg'}];

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

	return self;
});

