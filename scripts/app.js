'use strict';

var APP = angular.module('myApp', ['smart-table','ui.router','ngResource','ngSanitize','ngCookies','mm.foundation','ngAnimate']);

APP.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
     $rootScope
        .$on('$stateChangeSuccess',
            function(event){
 
                if (!$window.ga)
                    return;
 
                $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);

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
			templateUrl: "registration/registration.html",
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
		.state('reference.tanks', {
			url: "/reftanks",
			templateUrl: "ref/reference_tanks.html",
			controller:"WOTAPICtrl"
		})
		
		.state('reference.guides', {
			url: "/refguides",
			templateUrl: "ref/reference_guides.html"
		})

		.state('reference.perks', {
			url: "/refperks",
			templateUrl: "ref/reference_perks.html"
		})
		.state('reference.optics', {
			url: "/refoptics",
			templateUrl: "ref/reference_optics.html"
		})
		.state('reference.glossary', {
			url: "/refglossary",
			templateUrl: "ref/reference_glossary.html",
			controller:"GlossaryCtrl"
		})
		.state('reference.radials', {
			url: "/refradials",
			templateUrl: "ref/reference_radials.html"
		})

		.state('quizmenu', {
			url: "/quizmenu",
			templateUrl: "quizzes/quiz_menu.html",
			controller:"QuizCtrl"
		})

		.state('events', {
			url: "/events",
			templateUrl: "events/events.html",
			controller:"EventsCtrl"
		})
		
		.state('eventCalendar', {
			url: "/eventCalendar",
			templateUrl: "events/events-calendar.html",
			controller:"CalendarCtrl"
		})

		.state('eventMgr', {
			url: "/eventsmanager",
			templateUrl: "events/views/eventsManager2.html"
		})
		.state('eventMgr.weekly', {
			url: "/weekly",
			templateUrl: "events/views/eventsMgrWeekly.html",
			controller:"EventsUpdateCtrl"
		})
		.state('eventMgr.update', {
			url: "/update",
			templateUrl: "events/views/eventsMgrUpdate.html",
			controller:"EventsUpdateCtrl"
		})
		.state('eventMgr.edit', {
			url: "/edit",
			templateUrl: "events/views/eventsMgrEdit.html",
			controller:"EventsEditCtrl"
		})
		.state('eventMgr.add', {
			url: "/add",
			templateUrl: "events/views/eventsMgrAdd.html",
			controller:"EventsMgrCtrl"
		})
		.state('eventMgr.delete', {
			url: "/delete",
			templateUrl: "events/views/eventsMgrDelete.html",
			controller:"EventsMgrCtrl"
		})
		
		.state('platoon', {
			url: "/platoon",
			templateUrl: "platoon/maps-platoon.html",
			controller:"PlatoonCtrl"
		})
		.state('teamBattles', {
			url: "/teamBattles",
			templateUrl: "events/events-5x5.html",
			controller:"TeamsCtrl"
		})
		
		.state('platoonedit', {
			url: "/platoonedit",
			templateUrl: "platoon/maps-platoon-edit.html",
			controller:"PlatoonCtrl"
		})
		.state('error', {
			url: "/error",
			templateUrl: "views/oops.html"
		})

		.state('wotapi', {
			url: "/wotapi",
			templateUrl: "wotapi/apitest.html",
			controller:"WOTAPICtrl"
		})

		.state('battles', {
			url: "/battles",
			templateUrl: "battles/battles.html",
			controller:"BattleCtrl"
		})
		.state('battlesdata', {
			url: "/battles",
			templateUrl: "battles/battlesdata.html",
			controller:"BattleCtrl"
		})

    
});



