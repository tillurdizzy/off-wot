'use strict';

APP.directive('kineticCanvas',['mapSrvc',function(mapSrvc){
	return{
       scope:{
        	formstate:'=',
        	isEditable:'@'
        },
		link: function(scope,ele,attrs,c){
			scope.COM = mapSrvc;
			scope.canvasSize = 800;
			scope.tempID = 20000;// Used for new objects... objects coming from DB will use PRIMARY_ID
			scope.removeID = 0;//shape to remove
			var mydiv = ele[0];
			var id = attrs["id"];
			

			scope.kineticStage = new Kinetic.Stage({
				container: id,
				width:800,
				height:800
		    });
		  
			scope.mapLayer = new Kinetic.Layer({name:'mapLayer'});
			scope.dangerLayer = new Kinetic.Layer({name:'dangerLayer'});
			scope.heavyLayer = new Kinetic.Layer({name:'heavyLayer'});
			scope.mediumLayer = new Kinetic.Layer({name:'mediumLayer'});
			scope.lightLayer = new Kinetic.Layer({name:'lightLayer'});
			scope.destroyerLayer = new Kinetic.Layer({name:'destroyerLayer'});
			scope.artyLayer = new Kinetic.Layer({name:'artyLayer'});
			

			scope.kineticStage.add(scope.mapLayer);
			scope.kineticStage.add(scope.dangerLayer);
			scope.kineticStage.add(scope.heavyLayer);
			scope.kineticStage.add(scope.mediumLayer);
			scope.kineticStage.add(scope.lightLayer);
			scope.kineticStage.add(scope.destroyerLayer);

			scope.kineticStage.on('mousedown', function(event) {
				if(scope.isEditable == 'yes'){
					var id = event.target.attrs.id;
					if(id == "map"){
						if(scope.formstate.visible){
							scope.formstate.role = 'saveMarker';
							scope.tempID++;
							var curPos = scope.mapLayer.getAbsolutePosition();
							var clickX = event.evt.layerX;
							var clickY = event.evt.layerY;
							scope.COM.newMarker = new Object();
							scope.COM.newMarker.map = scope.COM.currentMapName;
							scope.COM.newMarker.xpos = clickX;
							scope.COM.newMarker.ypos = clickY;
							scope.COM.newMarker.type = scope.COM.drawType;
							scope.COM.newMarker.spawn = scope.COM.spawntype;
							placeSymbol(clickX,clickY,scope.COM.drawType,scope.COM.spawntype,scope.tempID);
							scope.$apply();
						}
					}else{
						scope.COM.removeID = id;
						scope.formstate.visible = false;
						scope.formstate.role = 'deleteMarker';
						scope.$apply();
					}
				}
			});

			function placeSymbol(xpos,ypos,type,spawn,_id){
				var tankSymbol = new Image();
				var imageSrc;
				if(spawn == 'red'){
					if(type == 'scout'){
						imageSrc = 'images/light-symbol-red.png';
					}else if(type == 'destroy'){
						imageSrc = 'images/td-symbol-red.png';
					}else if(type == 'arty'){
						imageSrc = 'images/arty-symbol-red.png';
					}else if(type == 'medium'){
						imageSrc = 'images/medium-symbol-red.png';
					}else if(type == 'heavy'){
						imageSrc = 'images/heavy-symbol-red.png';
					}else if(type == 'danger'){
						imageSrc = 'images/danger.fw.png';
					}
				}else{
					if(type == 'scout'){
						imageSrc = 'images/light-symbol.png';
					}else if(type == 'destroy'){
						imageSrc = 'images/td-symbol.png';
					}else if(type == 'arty'){
						imageSrc = 'images/arty-symbol.png';
					}else if(type == 'medium'){
						imageSrc = 'images/medium-symbol.png';
					}else if(type == 'heavy'){
						imageSrc = 'images/heavy-symbol.png';
					}else if(type == 'danger'){
						imageSrc = 'images/danger.fw.png';
					}
				}
				
				tankSymbol.onload = function(){
					var tank = new Kinetic.Image({
						x:xpos-12,
						y:ypos-12,
						image:tankSymbol,
						height:24,
						width:24,
						id:_id
					})
					if(type == 'scout'){
						scope.lightLayer.add(tank);
						scope.lightLayer.draw();
					}else if(type == 'destroy'){
						scope.destroyerLayer.add(tank);
						scope.destroyerLayer.draw();
					}else if(type == 'arty'){
						scope.artyLayer.add(tank);
						scope.artyLayer.draw();
					}else if(type == 'medium'){
						scope.mediumLayer.add(tank);
						scope.mediumLayer.draw();
					}else if(type == 'heavy'){
						scope.heavyLayer.add(tank);
						scope.heavyLayer.draw();
					}else if(type == 'danger'){
						scope.dangerLayer.add(tank);
						scope.dangerLayer.draw();
					}
				}
				tankSymbol.src = imageSrc;
			};

			
			function drawSavedObjects(){
				scope.dangerLayer.removeChildren();
				scope.lightLayer.removeChildren();
				scope.destroyerLayer.removeChildren();
				scope.artyLayer.removeChildren();
				scope.mediumLayer.removeChildren();
				scope.heavyLayer.removeChildren();
				var objList = scope.COM.currentMapData;
				for (var i = 0; i < objList.length; i++) {
					placeSymbol(objList[i].xpos,objList[i].ypos,objList[i].type,objList[i].spawn,objList[i].PRIMARY_ID);
				};
				scope.kineticStage.draw();
			};

			function removeSelectedShape(){
				if(scope.COM.removeID != 0){
					var findid = '#'+scope.COM.removeID;
					var shape = scope.kineticStage.find(findid);
					shape.destroy();
					scope.kineticStage.draw();
					scope.COM.removeID = 0;
				}
			};

			scope.$on('event:eraseLastDraw',function(){
				var findid = '#'+scope.tempID;
				var shape = scope.kineticStage.find(findid);
				shape.destroy();
				scope.kineticStage.draw();
			});

			function placeMapImage(url){
				console.log("placeMapImage");
				var mapImage = new Image();
				mapImage.onload = function(){
					var map = new Kinetic.Image({
						x:0,
						y:0,
						image:mapImage,
						height:800,
						width:800,
						id:'map'
					})
					scope.mapLayer.add(map);
					scope.mapLayer.draw();
				}

				mapImage.src = url;
				drawSavedObjects();
			};


			scope.$on('event:newMapImage',function(){
				placeMapImage(scope.COM.mapUrl);
			});

			scope.$on('event:refreshMap',function(){
				drawSavedObjects();
			});

			scope.$on('event:updateLayerFilters',function(event,filters){
				scope.heavyLayer.visible(filters.heavy);	
				scope.mediumLayer.visible(filters.medium);	
				scope.lightLayer.visible(filters.light);
				scope.artyLayer.visible(filters.arty);	
				scope.destroyerLayer.visible(filters.destroyer);
				scope.dangerLayer.visible(filters.danger);
				scope.kineticStage.draw();
			});
		}
	}
}]);