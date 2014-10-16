APP.directive('eventReservation',['EventComSrvc', function(EventComSrvc) {
	return {
		restrict: 'A',
		scope: {
			eventdate: '@',
			eventweek: '@'
		},
		templateUrl:"events/reservationTemplate.html",

		link: function (scope, element, attrs) {
			//scope vars
			scope.COM = EventComSrvc;
			scope.attendeeA = "";
			scope.attendeeB = "";

			function addAttendee(){
				console.log("Add Attendee")
			}

			function cancelAttendee(){
				console.log("Cancel Attendee")
			}

			
		}
	};
}]);



