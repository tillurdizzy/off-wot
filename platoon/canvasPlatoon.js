'use strict';

APP.directive('kineticPlatoon',['mapSrvc',function(mapSrvc){
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
			scope.pathPoints = new Object();
			scope.pathPoints.xpos = 0;
			scope.pathPoints.ypos = 0;
			scope.pathPoints.xpos2 = 0;
			scope.pathPoints.ypos2 = 0;
			var mydiv = ele[0];
			var id = attrs["id"];
			
			scope.kineticStage = new Kinetic.Stage({
				container: id,
				width:800,
				height:800
		    });
		  
			scope.mapLayer = new Kinetic.Layer({name:'mapLayer'});
			scope.plan_I = new Kinetic.Layer({name:'plan_I'});
			scope.plan_II = new Kinetic.Layer({name:'plan_II'});
			scope.plan_III = new Kinetic.Layer({name:'plan_III'});
			scope.plan_IV = new Kinetic.Layer({name:'plan_IV'});
			
			scope.kineticStage.add(scope.mapLayer);
			scope.kineticStage.add(scope.plan_I);
			scope.kineticStage.add(scope.plan_II);
			scope.kineticStage.add(scope.plan_III);
			scope.kineticStage.add(scope.plan_IV);
			

			scope.kineticStage.on('mousedown', function(event) {
				if(scope.isEditable == 'yes'){
					var id = event.target.attrs.id;
					var clickX = event.evt.layerX;
					var clickY = event.evt.layerY;
					if(id == "map"){
						if(scope.formstate.visible){
							scope.tempID++;
							var curPos = scope.mapLayer.getAbsolutePosition();
							
							if(scope.COM.drawType!="path"){
								scope.formstate.role = 'saveMarker';
								scope.COM.newMarker = new Object();
								scope.COM.newMarker.map = scope.COM.currentMapName;
								scope.COM.newMarker.xpos = clickX;
								scope.COM.newMarker.ypos = clickY;
								scope.COM.newMarker.xpos2 = 0;
								scope.COM.newMarker.ypos2 = 0;
								scope.COM.newMarker.type = scope.COM.drawType;
								scope.COM.newMarker.spawn = scope.COM.spawnType;
								scope.COM.newMarker.author = scope.COM.commander;
								placeSymbol(clickX,clickY,scope.COM.drawType,scope.COM.spawnType,scope.tempID);
								scope.$apply();
							}else{
								savePathPoints(clickX,clickY);
							}
						}
					}else if(scope.formstate.role=='createPath'){
						savePathPoints(clickX,clickY);
					}else{
						scope.COM.removeID = id;
						scope.formstate.visible = false;
						scope.formstate.role = 'deleteMarker';
						scope.$apply();
					}
				}
			});

			function drawNewPath(xpos,ypos,xpos2,ypos2){
				var config = {
					points:[xpos,ypos,xpos2,ypos2],
					strokeWidth:4,
					lineCap:'round',
					lineJoin: 'round',
					id:scope.tempID
				}

				if(scope.COM.spawnType == "red"){
					config.stroke="#EE0000";
				}else{
					config.stroke="#00EE00";
				}

				var line = new Kinetic.Line(config);
				scope.pathLayer.add(line);
				scope.pathLayer.draw();
			};

			function placeSymbol(xpos,ypos,type,spawn,_id){
				var tankSymbol = new Image();
				var imageSrc;
				
				if(type == 'T1'){
					imageSrc = 'images/platoonTankID_01.fw.png';
				}else if(type == 'T2'){
					imageSrc = 'images/platoonTankID_02.fw.png';
				}else if(type == 'T3'){
					imageSrc = 'images/platoonTankID_03.fw.png';
				}else if(type == 'T4'){
					imageSrc = 'images/platoonTankID_04.fw.png';
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
					if(spawn == 'I'){
						scope.plan_I.add(tank);
						scope.plan_I.draw();
					}else if(spawn == 'II'){
						scope.plan_II.add(tank);
						scope.plan_II.draw();
					}else if(spawn == 'III'){
						scope.plan_III.add(tank);
						scope.plan_III.draw();
					}else if(spawn == 'IV'){
						scope.plan_IV.add(tank);
						scope.plan_IV.draw();
					}
				}
				tankSymbol.src = imageSrc;
			};

			
			function drawSavedObjects(){
				scope.plan_I.removeChildren();
				scope.plan_II.removeChildren();
				scope.plan_III.removeChildren();
				scope.plan_IV.removeChildren();
				var objList = scope.COM.currentMapData;
				for (var i = 0; i < objList.length; i++) {
					if(objList[i].type == "path"){
						//drawpath(objList[i].xpos,objList[i].ypos,objList[i].xpos2,objList[i].ypos2,objList[i].spawn,objList[i].PRIMARY_ID);
					}else{
						placeSymbol(objList[i].xpos,objList[i].ypos,objList[i].type,objList[i].spawn,objList[i].PRIMARY_ID);
					}
				};
				scope.plan_I.draw();
				scope.plan_II.draw();
				scope.plan_III.draw();
				scope.plan_IV.draw();

				scope.plan_II.visible(false);
				scope.plan_III.visible(false);
				scope.plan_IV.visible(false);
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

			function newPointsObject(x,y){
				scope.COM.pushPointSet(scope.pathPoints);
				scope.pathPoints = new Object();
				scope.pathPoints.xpos = x;
				scope.pathPoints.ypos = y;
				scope.pathPoints.xpos2 = 0;
				scope.pathPoints.ypos2 = 0;
			}

			function savePathPoints(x,y){
				// xpos==0 indicates the FIRST point in a new series
				if(scope.pathPoints.xpos == 0){
					scope.COM.newMarker = new Object();
					scope.COM.newMarker.map = scope.COM.currentMapName;
					scope.COM.newMarker.type = scope.COM.drawType;
					scope.COM.newMarker.spawn = scope.COM.spawnType;
					scope.COM.newMarker.author = scope.COM.commander;
					scope.pathPoints.xpos = x;
					scope.pathPoints.ypos = y;
				}else if(scope.pathPoints.xpos2 == 0){
					scope.pathPoints.xpos2 = x;
					scope.pathPoints.ypos2 = y;
					drawNewPath(scope.pathPoints.xpos,scope.pathPoints.ypos,scope.pathPoints.xpos2,scope.pathPoints.ypos2);
					newPointsObject(x,y);
				}
			}


			scope.$on('event:newMapImage',function(){
				placeMapImage(scope.COM.mapUrl);
			});

			scope.$on('event:refreshMap',function(){
				drawSavedObjects();
			});

			scope.$on('event:updateLayerFilters',function(event,filters){
				scope.plan_I.visible(filters.I);
				scope.plan_II.visible(filters.II);
				scope.plan_III.visible(filters.III);
				scope.plan_IV.visible(filters.IV);
				scope.kineticStage.draw();
			});
		}
	}
}]);