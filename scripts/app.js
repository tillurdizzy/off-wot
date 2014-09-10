'use strict';

var APP = angular.module('myApp', ['smart-table','ui.router','ngResource','ngSanitize'])

APP.config(function($stateProvider, $urlRouterProvider) {
 	
 	$urlRouterProvider.otherwise("/home");
  	

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "views/home.html",
			controller:"HomeCtrl"
		})
		.state('admin', {
			url: "/admin",
			templateUrl: "views/admin.html"
		})
		.state('members', {
			url: "/members",
			templateUrl: "views/new-members.html",
			controller:"MembersCtrl"
		})
		.state('memberadd', {
			url: "/memberadd",
			templateUrl: "views/new-members-edit.html",
			controller:"ScheduleCtrl"
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
		.state('scheduleEdit', {
			url: "/scheduleedit",
			templateUrl: "views/schedule-edit.html",
			controller:"ScheduleCtrl"
		})

		.state('announcements', {
			url: "/announcements",
			templateUrl: "views/announcements.html",
			controller:"AnnouncementsCtrl"
		})

		.state('training', {
			url: "/training",
			templateUrl: "views/training.html",
			controller:"TrainingCtrl"
		})

		.state('reference', {
			url: "/reference",
			templateUrl: "views/reference.html",
			controller:"ReferenceCtrl"
		})

		.state('reference.xbox', {
			url: "/refxbox",
			templateUrl: "views/reference_xbox.html"
		})
		.state('reference.utube', {
			url: "/refutube",
			templateUrl: "views/reference_utube.html"
		})
		.state('reference.equipment', {
			url: "/refequip",
			templateUrl: "views/reference_equipment.html"
		})

		.state('reference.maps', {
			url: "/refmaps",
			templateUrl: "views/reference_maps.html"
		})
		.state('reference.strategy', {
			url: "/refstratey",
			templateUrl: "views/reference_strategy.html"
		})

		.state('reference.perks', {
			url: "/refperks",
			templateUrl: "views/reference_perks.html"
		})

		.state('events', {
			url: "/events",
			templateUrl: "views/events.html",
			controller:"EventsCtrl"
		})

    
});

