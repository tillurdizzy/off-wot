'use strict';

var APP = angular.module('myApp', ['smart-table','ui.router','ngResource','ngSanitize','ngCookies','mm.foundation'])

APP.config(function($stateProvider, $urlRouterProvider) {
 	
 	$urlRouterProvider.otherwise("/home");
  	

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "views/home.html",
			controller:"HomeCtrl"
		})
		.state('registration', {
			url: "/registration",
			templateUrl: "views/registration.html",
			controller:"RegistrationCtrl"
		})
		.state('contribute', {
			url: "/contribute",
			templateUrl: "views/contribute.html",
			controller:"ContributeCtrl"
		})
		.state('members', {
			url: "/members",
			templateUrl: "views/new-members.html",
			controller:"MembersCtrl"
		})
		
		.state('map', {
			url: "/map",
			templateUrl: "views/maps.html",
			controller:"MapCtrl"
		})
		.state('mapedit', {
			url: "/mapedit",
			templateUrl: "views/maps-edit.html",
			controller:"MapCtrl"
		})

		.state('schedule', {
			url: "/schedule",
			templateUrl: "views/schedule.html",
			controller:"ScheduleCtrl"
		})
		

		.state('reference', {
			url: "/reference",
			templateUrl: "ref/reference.html",
			controller:"ReferenceCtrl"
		})

		.state('reference.links', {
			url: "/reflinks",
			templateUrl: "ref/reference_links.html"
		})
		.state('reference.utube', {
			url: "/refutube",
			templateUrl: "ref/reference_utube.html"
		})
		.state('reference.equipment', {
			url: "/refequip",
			templateUrl: "ref/reference_equipment.html"
		})

		.state('reference.maps', {
			url: "/refmaps",
			templateUrl: "ref/reference_maps.html"
		})
		.state('reference.strategy', {
			url: "/refstragey",
			templateUrl: "ref/reference_strategy.html"
		})

		.state('reference.perks', {
			url: "/refperks",
			templateUrl: "ref/reference_perks.html"
		})
		.state('reference.glossary', {
			url: "/refglossary",
			templateUrl: "ref/reference_glossary.html",
			controller:"GlossaryCtrl"
		})

		.state('events', {
			url: "/events",
			templateUrl: "events/events.html",
			controller:"EventsCtrl"
		})
		.state('monday01', {
			url: "/monday01",
			templateUrl: "events/events-monday01.html",
			controller:"CalendarCtrl"
		})
		.state('monday02', {
			url: "/monday02",
			templateUrl: "events/events-monday02.html",
			controller:"CalendarCtrl"
		})
		.state('tuesday01', {
			url: "/tuesday01",
			templateUrl: "events/events-tuesday01.html",
			controller:"CalendarCtrl"
		})
		.state('tuesday02', {
			url: "/tuesday02",
			templateUrl: "events/events-tuesday02.html",
			controller:"CalendarCtrl"
		})
		.state('wednesday01', {
			url: "/wednesday01",
			templateUrl: "events/events-wednesday01.html",
			controller:"CalendarCtrl"
		})
		.state('wednesday02', {
			url: "/wednesday02",
			templateUrl: "events/events-wednesday02.html",
			controller:"CalendarCtrl"
		})
		.state('thursday01', {
			url: "/thursday01",
			templateUrl: "events/events-thursday01.html",
			controller:"CalendarCtrl"
		})
		.state('thursday02', {
			url: "/thursday02",
			templateUrl: "events/events-thursday02.html",
			controller:"CalendarCtrl"
		})
		.state('thursday03', {
			url: "/thursday03",
			templateUrl: "events/events-thursday03.html",
			controller:"CalendarCtrl"
		})
		.state('thursday04', {
			url: "/thursday04",
			templateUrl: "events/events-thursday04.html",
			controller:"CalendarCtrl"
		})
		.state('friday01', {
			url: "/friday01",
			templateUrl: "events/events-friday01.html",
			controller:"CalendarCtrl"
		})
		.state('saturday01', {
			url: "/saturday01",
			templateUrl: "events/events-saturday01.html",
			controller:"CalendarCtrl"
		})
		.state('sunday01', {
			url: "/sunday01",
			templateUrl: "events/events-sunday01.html",
			controller:"CalendarCtrl"
		})
		.state('sunday02', {
			url: "/sunday02",
			templateUrl: "events/events-sunday02.html",
			controller:"CalendarCtrl"
		})
		
		.state('platoon', {
			url: "/platoon",
			templateUrl: "platoon/maps-platoon.html",
			controller:"PlatoonCtrl"
		})
		.state('platoonedit', {
			url: "/platoonedit",
			templateUrl: "platoon/maps-platoon-edit.html",
			controller:"PlatoonCtrl"
		})

    
});

