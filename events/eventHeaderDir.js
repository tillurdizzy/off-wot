'use strict';

APP.directive('eventHdr', function () {
    return {
    	restrict: 'A',
      scope:{
        eventtitle:'=',
        eventtimes:'=',
        eventtiers:'=',
        eventhost:'=',
        eventimage:'='
      },
      templateUrl:'events/signHder.html',
    	link: function($scope, elm, attrs) {
        
      }
    		
  	}
});