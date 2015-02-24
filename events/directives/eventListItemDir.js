'use strict';

APP.directive('eventItem', function () {
    return {
    	restrict: 'A',
      scope:{
      	myWeek:'@',
      	month:'@',
      	day:'@',
      	attendees:'=',
      	eventClosed:'=',
      	eventExpired:'=',
      	isRegistered:'=',
        addMe:'&',
        cancelMe:'&'
      },
      templateUrl:'events/eventListItemTemplate.html',
    	link: function($scope, elm, attrs) {
        
      }
  	}
});