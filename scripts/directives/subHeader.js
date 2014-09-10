'use strict';

APP.directive('subHeader', function () {
    return {
    	restrict: 'A',
      scope:{
        sectiontitle:'@'
      },
      templateUrl:'views/subheader.html',
    	link: function($scope, elm, attrs) {
        
      }
    		
  	}
});