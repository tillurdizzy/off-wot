'use strict';

APP.service('GlossarySrvc',[function (){
	var self = this;

	self.AC=[
		{term:"Alpha",def:"The amount of damage in a single hit, or refers to a high-damage, slow-firing gun."},
		{term:"AP",def:"Armor Piercing. Standard shell type available for almost all guns in game. This type of ammo can only do damage if the shell penetrates, so no penetration means no damage. The shell will lose a bit of penetration the farther it traveles."},
		{term:"APCR",def:"Armor Piercing Composite Rigid. Premium shell type available for most guns in game. Higher penetration and faster travel than AP, but loses more penetration at distance."},
		{term:"Cap Circle",def:"The large circle around the flag, once in side the circle the base is starting to be capped; captured."},
		{term:"Cupola",def:"Dome shaped structure used by commander/crew to enter/exit tank. Some cupolas have observation slits for the commander. Usually have no armour."}
	];

	self.DF=[
		{term:"Derp/Derp Gun",def:"A high caliber gun that is very inaccurate and is best for shooting HE shells (for example the KV's 152mm)."},
		{term:"DPM or DPS",def:"Damage of a tank gun per minute/second. A high DPM tank/gun fires low damage shots, but with fast reload, which is the opposite of a high alpha gun."},
		{term:"Effective Armor Thickness",def:"Thickness of the armor that actually must be pierced when the shell impact is at an angle. The effective armour thickness increases exponentially with the impact angle. For example, if your tank has 150mm armor with an angle of 50 degrees, the effective armor will be 233mm."}
	];

	self.GI=[
		{term:"GLD",def:"Gun Laying Drive. A piece of equipment that can be mounted on majority of tanks to reduce aim time (a very good idea for artillery)."},
		{term:"HE",def:"High Explosive Shell.  Explodes when it hits the ground or tank. It can do damage by splash. The shell has low penetration but can do more damage when it penetrates. If the shell doesn't penetrate it will most likely do very little damage but it will most likely not bounce. HE will not lose penetration at range. The shell has a high chance of damaging modules and crew members."},
		{term:"HEAT",def:"High Explosive Anti Tank. Premium shell available for mainly Howitzers and artillery guns only. The shell has more penetration than the AP rounds, but it has trouble going through sloped armor. HEAT will not lose penetration at range."},
		{term:"HESH",def:"This British only ammo will replace the HE round on a few tanks and works almost the same as HE but has a bit more penetration."},
		{term:"Hull Down",def:"Hull-down is a position taken up by a tank such that its hull is behind a crest or other raised ground, but its turret is exposed."},
		{term:"Impact Angle",def:"The angle at which the shell hits the target's armor. The ideal impact angle is along the normal, i.e. perpendicular to the armour plate. The actual impact angle is calculated as the deviation from the normal."}
	];

	self.JL=[
		{term:"Lower Glacis",def:"Lower frontal hull armour on a tank, usually weaker."},
		{term:"Lemming Rush",def:"Occurs when a majority of tanks all deploy to the same side of the map."}
	];

	self.MO=[
		{term:"Mantlet",def:"The armour section surrounding the gun. Usually strongest part of a tank."},
		{term:"MG Mount",def:"Location where a machine gun is mounted on a tank for local defence against infantry. Usually have weaker armour."},
		{term:"Nominal Armor Thickness",def:"The published thickness of an armor plate. The nominal thickness of an armour plate is just the minimal amount of armour a shell impacting it must penetrate. As soon as the impact angle deviates from the normal, i.e. is not perfectly perpendicular to the armour plate's surface, the Effective Armour Thickness that the shell needs to penetrate will be higher than the nominal armour thickness:"}
	];

	self.PR=[
		{term:"Pen",def:"Penetrate, penetration. Penetrates a tank's armor."},
		{term:"Rammer ",def:"Gun rammer. A piece of equipment that can be mounted on majority of tanks to reduce load time."},
		{term:"Rocking ",def:"A slight steering or turret zig-zag (left-right) rotation to prevent accurate enemy aim."}
	];

	self.SU=[
		{term:"Spaced Armor",def:"Multiple layers of armor."},
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

