'use strict';



APP.directive('teamItem', function () {

    return {

    	restrict: 'A',

      scope:{

      	teamLetter:'@',

      	teamName:'@',

      	attendees:'=',

      	eventClosed:'=',

      	eventExpired:'=',

      	isRegistered:'=',

        addMe:'&',

        cancelMe:'&'

      },

      templateUrl:'events/eventTeamsItemTemplate.html',

    	link: function($scope, elm, attrs) {

        

      }

  	}

});