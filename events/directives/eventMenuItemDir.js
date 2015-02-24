'use strict';

APP.directive('eventMenuItem', function () {
    return {
    	restrict: 'A',
      scope:{
      	title:'@',
      	view:'@',
      	imgsrc:'@'
      },
      templateUrl:'events/eventMenuTemplate.html',
    	link: function(scope, elm, attrs) {
			scope.hover = false;
			 elm.bind('mouseenter',function() {
                scope.hover = true;
				scope.$digest();
				
            });
            elm.bind('mouseleave',function() {
                scope.hover = false;
				scope.$digest();
				
            });
			
			scope.getHover = function(){
				var rtn;
				if(scope.hover == false){
					rtn="";
				}else{
					rtn="hoverBkg";
				};
				return rtn;
			};
      }
  	}
});