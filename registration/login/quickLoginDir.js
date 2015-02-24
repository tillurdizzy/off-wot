'use strict';

APP.directive('quickLogin',['memberSrvc',function (memberSrvc) {
    return {
    	restrict: 'A',
      scope:{
       
      },
      templateUrl:'registration/login/quickLoginTemplate.html',
    	link: function(scope, elm, attrs) {
        scope.submitted = false;
        scope.submitForm = function(isValid) {
          scope.submitted = true;
          if (isValid) {
              alert('our form is amazing');
          }
        };
        
      }	
  	}
}]);