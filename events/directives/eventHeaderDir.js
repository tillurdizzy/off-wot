'use strict';

APP.directive('eventHdr', function () {
    return {
    	restrict: 'A',
      scope:{
        eventdata:'='
      },
      templateUrl:'events/eventsHdrTemplate.html',
    	link: function($scope, elm, attrs) {
        
      }
  	}
});