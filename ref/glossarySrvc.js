'use strict';

APP.service('GlossarySrvc',[function (){
	var self = this;

	self.AC=[
		{term:"Alpha",def:"The amount of damage in a single hit, or refers to a high-damage, slow-firing gun."},
		{term:"AP",def:"Armor Piercing. Standard shell type available for almost all guns in game."},
		{term:"APCR",def:"Armor Piercing Composite Rigid. Premium shell type available for most guns in game."},
		{term:"Cap Circle",def:"The large circle around the flag, once in side the circle the base is starting to be capped; captured."},
		{term:"Cupola",def:"Dome shaped structure used by commander/crew to enter/exit tank. Some cupolas have observation slits for the commander. Usually have no armour."}
	];

	self.DF=[
		{term:"Derp/Derp Gun",def:"A high caliber gun that is very inaccurate and is best for shooting HE shells (for example the KV's 152mm)."},
		{term:"DPM or DPS",def:"Damage of a tank gun per minute/second. A high DPM tank/gun fires low damage shots, but with fast reload, which is the opposite of a high alpha gun."}
	];

	self.GI=[
		{term:"GLD",def:"Gun Laying Drive. A piece of equipment that can be mounted on majority of tanks to reduce aim time (a very good idea for artillery)."},
		{term:"HE",def:"High Explosive. A standard shell type available for every gun in game."},
		{term:"HEAT",def:"High Explosive Anti Tank. Premium shell available for mainly Howitzers and artillery guns only."},
		{term:"Hull Down",def:"Hull-down is a position taken up by a tank such that its hull is behind a crest or other raised ground, but its turret is exposed."}
	];

	self.JL=[
		{term:"Lower Glacis",def:"Lower frontal hull armour on a tank, usually weaker."},
		{term:"Lemming Rush",def:"Occurs when a majority of tanks all deploy to the same side of the map."}
	];

	self.MO=[
		{term:"Mantlet",def:"The armour section surrounding the gun. Usually strongest part of a tank."},
		{term:"MG Mount",def:"Location where a machine gun is mounted on a tank for local defence against infantry. Usually have weaker armour."}
	];

	self.PR=[
		{term:"Pen",def:"Penetrate, penetration. Penetrates a tank's armor."},
		{term:"Rammer ",def:"Gun rammer. A piece of equipment that can be mounted on majority of tanks to reduce load time."}
	];

	self.SU=[
		{term:"SPG",def:"Self Propelled Gun. Another name for Artillery."},
		{term:"Suicide Scout",def:"When a light tank rushes to the enemy base as fast as possible at the very beginning of the game, in order to spot as many enemy tanks as possible before dying."},
		{term:"Upper Glacis",def:"The upper frontal hull armour plate of a tank."}
	];

	self.VZ=[
		{term:"Vents",def:"Improved Ventilation. A piece of equipment that can be mounted on majority of tanks to increase the crew performance."},
		{term:"Vert Stab",def:"A piece of equipment that can be mounted on majority of tanks to decreases the amount of aim dispersion caused by tank/turret motion."}
	];

	return self;
}]);

