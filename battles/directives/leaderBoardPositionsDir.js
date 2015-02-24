'use strict';

APP.directive('positionDir', function () {
    return {
    	restrict: 'A',
      scope:{
      	display:'@',
        history:'@',
        selected:'=selected',
        labeltitle:'='
      },
      templateUrl:'battles/templates/positionTemplate.html',
    	link: function(scope, elm, attrs) {
         scope.$watch('selected',function() {
          if(scope.selected === true) {
            //console.log("is true");
          } else {
             //console.log("is false");
          }
        });
        
      }
  	}
});

