'use strict';

APP.controller('BattleCtrl',['$scope','$state','BattlesDb','memberSrvc', function ($scope,$state,BattlesDb,memberSrvc) {

	// formstate; 
	// 0= begin new battle
	// 1=in progress - gets set when tier is selected
	// 2=ready to submit - gets set when leaderboard is selected
	// 3=submitted success
	$scope.formstate = 0;
	
	var ME = "BATTLES CTRL: ";
	var DB = BattlesDb;
	var MS = memberSrvc;

	
	$scope.gamerTag = "Please sign in";
	$scope.signedIn = false;
	var memberID ="";
	
	var lastSubmitID = 0;
	$scope.formDataObj;

	// vars for ng-class
	$scope.tiertopselected = false;
	$scope.tiermidselected = false;
	$scope.tierbotselected = false;

	$scope.boardfirselected = false;
	$scope.boardtopselected = false;
	$scope.boardmidselected = false;
	$scope.boardbotselected = false;

	$scope.boardselected = null;

	$scope.battleSelections = new Object();
		
	$scope.battlesData = new Object();
		$scope.battlesData.One = 0;
		$scope.battlesData.Top = 0;
		$scope.battlesData.Mid = 0;
		$scope.battlesData.Bot = 0;

		$scope.battlesData.topFirst = 0;
		$scope.battlesData.topTop = 0;
		$scope.battlesData.topMid = 0;
		$scope.battlesData.topBot = 0;

		$scope.battlesData.midFirst = 0;
		$scope.battlesData.midTop = 0;
		$scope.battlesData.midMid = 0;
		$scope.battlesData.midBot = 0;

		$scope.battlesData.botFirst = 0;
		$scope.battlesData.botTop = 0;
		$scope.battlesData.botMid = 0;
		$scope.battlesData.botBot = 0;

	$scope.sessionData = new Object();
		$scope.sessionData.One = 0;
		$scope.sessionData.Top = 0;
		$scope.sessionData.Mid = 0;
		$scope.sessionData.Bot = 0;
		$scope.sessionData.tierTop = 0;
		$scope.sessionData.tierMid = 0;
		$scope.sessionData.tierBot = 0;
		

	$scope.OFF_Rating = 0;
	$scope.numBattles = 0;
	$scope.numBattlesSession = 0;
	
	var leaderBoardPositionList = [
		{label:'First',value:1},
		{label:'Top 5',value:2},
		{label:'Middle 5',value:3},
		{label:'Bottom 5',value:4}
		];

	var battleTierPositionList = [
		{label:'Top',value:1},
		{label:'Middle',value:2},
		{label:'Bottom',value:3}
	];

	var resetTierSelections = function(){
		$scope.battleSelections.battleTier_Val = null;
		$scope.battleSelections.battleTier_Str = "";
		
		$scope.tiertopselected = false;
		$scope.tiermidselected = false;
		$scope.tierbotselected = false;
	}

	var resetBoardSelections = function(){
		
		$scope.battleSelections.leaderBoard_Val = null;
		$scope.battleSelections.leaderBoard_Str = "";

		$scope.boardfirselected = false;
		$scope.boardtopselected = false;
		$scope.boardmidselected = false;
		$scope.boardbotselected = false;
	}
	
	
	$scope.selectTierPosition= function(val){
		resetTierSelections();
		$scope.battleSelections.battleTier_Val = val;
		$scope.battleSelections.battleTier_Str = getTierString(val);
		$scope.formstate = 1;
		switch(val){
			case 0:$scope.tiertopselected = true;break;
			case 1:$scope.tiermidselected = true;break;
			case 2:$scope.tierbotselected = true;break;
		}
		console.log($scope.tiertopselected + ":" + $scope.tiermidselected);
	};
	
	$scope.selectBoardPosition= function(val){
		resetBoardSelections();
		$scope.battleSelections.leaderBoard_Val = val;
		$scope.battleSelections.leaderBoard_Str = getLeaderBoardString(val);
		console.log(val);
		$scope.formstate = 2;
		switch(val){
			case 1:$scope.boardfirselected = true;break;
			case 2:$scope.boardtopselected = true;break;
			case 3:$scope.boardmidselected = true;break;
			case 4:$scope.boardbotselected = true;break;
		}
	};

	var getTierString = function(val){
		var rtnStr = "";
		for (var i = 0; i < battleTierPositionList.length; i++) {
			if(battleTierPositionList[i].value == val){
				rtnStr = battleTierPositionList[i].label;
			}
		};
		return rtnStr;
	};

	var getLeaderBoardString = function(val){
		var rtnStr = "";
		for (var i = 0; i < leaderBoardPositionList.length; i++) {
			if(leaderBoardPositionList[i].value == val){
				rtnStr = leaderBoardPositionList[i].label;
			}
		};
		return rtnStr;
	};

	
	var insertBattle = function(){		
		DB.submitBattle($scope.battlesData).then(function(successCallback){
			lastSubmitID = successCallback.result;
			$scope.formstate = 0;
		}, function(errorCallback){
			alert('Data Transfer Error: Try Saving again.');
		});
	};

	var updateRating = function(){
		console.log($scope.OFF_Rating);
		$scope.OFF_Rating = 0;
		$scope.numBattles = 0;
		var bF = $scope.battlesData.botFirst * 100;
		var bT = $scope.battlesData.botTop * 90;
		var bM = $scope.battlesData.botMid * 50;
		var bB = $scope.battlesData.botBot * 10;
		var mF = $scope.battlesData.midFirst * 90;
		var mT = $scope.battlesData.midTop * 80;
		var mM = $scope.battlesData.midMid * 20;
		var mB = $scope.battlesData.midBot * -5;
		var tF = $scope.battlesData.topFirst * 70;
		var tT = $scope.battlesData.topTop * 50;
		var tM = $scope.battlesData.topMid * 30;
		var tB = $scope.battlesData.topBot * -10;

		$scope.numBattles = $scope.battlesData.One + $scope.battlesData.Top + $scope.battlesData.Mid + $scope.battlesData.Bot;
		$scope.numBattlesSession = $scope.sessionData.One + $scope.sessionData.Top + $scope.sessionData.Mid + $scope.sessionData.Bot;
		var scoreTotal = bF+bT+bM+bB+mF+mT+mM+mB+tF+tT+tM+tB;
		var rating = scoreTotal/$scope.numBattles;
		$scope.OFF_Rating = roundOff(rating);
		console.log(scoreTotal);
		console.log($scope.OFF_Rating);
	}

	
	$scope.submitBattle = function(){
		if($scope.battleSelections.leaderBoard_Val == null){
			alert('Please select leaderboard position.');
		}else if($scope.battleSelections.battleTier_Val == null){
			alert('Please select battle tier position.');
		}else{	

			switch($scope.battleSelections.leaderBoard_Val){
				case 1:
					$scope.battlesData.One += 1;
					$scope.sessionData.One += 1;break;
				case 2:
					$scope.battlesData.Top += 1;
					$scope.sessionData.Top += 1;break;
				case 3:
					$scope.battlesData.Mid += 1;
					$scope.sessionData.Mid += 1;break;
				case 4:
					$scope.battlesData.Bot += 1;
					$scope.sessionData.Bot += 1;break;
			}

			switch($scope.battleSelections.battleTier_Val){
				case 0:
					$scope.sessionData.tierTop += 1;break;
				case 1:
					$scope.sessionData.tierMid += 1;break;
				case 2:
					$scope.sessionData.tierBot += 1;
			}

			var board = $scope.battleSelections.leaderBoard_Val;
			var tier = $scope.battleSelections.battleTier_Val;
			var dataOK = true;

			if(tier==0 && board==1){
				$scope.battlesData.topFirst += 1;
			}else if(tier==0 && board==2){
				$scope.battlesData.topTop += 1;
			}else if(tier==0 && board==3){
				$scope.battlesData.topMid += 1;
			}else if(tier==0 && board==4){
				$scope.battlesData.topBot += 1;
			}else if(tier==1 && board==1){
				$scope.battlesData.midFirst += 1;
			}else if(tier==1 && board==2){
				$scope.battlesData.midTop += 1;
			}else if(tier==1 && board==3){
				$scope.battlesData.midMid += 1;
			}else if(tier==1 && board==4){
				$scope.battlesData.midBot += 1;
			}else if(tier==2 && board==1){
				$scope.battlesData.botFirst += 1;
			}else if(tier==2 && board==2){
				$scope.battlesData.botTop += 1;
			}else if(tier==2 && board==3){
				$scope.battlesData.botMid += 1;
			}else if(tier==2 && board==4){
				$scope.battlesData.botBot += 1;
			}else{
				dataOK = false;
			};

			resetTierSelections();
			resetBoardSelections();
			if(dataOK){
				updateRating();
				insertBattle();
			}else{

			};
			
		};
	};

	$scope.skipBattle = function(){
		$scope.battleSelections.leaderBoard_Val = 4;
		$scope.submitBattle();
	}

	$scope.getTest = function(){
		getBattles();
	}

	var getBattles = function(){
		var dataObj = new Object();
		dataObj.memberID = memberID;
		DB.queryMemberBattles(dataObj).then(function(successCallback){
			if(successCallback.length > 0){
				var data = successCallback[0];
				$scope.battlesData.One = parseInt(data.One);
				$scope.battlesData.Top = parseInt(data.Top);
				$scope.battlesData.Mid = parseInt(data.Mid);
				$scope.battlesData.Bot = parseInt(data.Bot);
				$scope.battlesData.topFirst = parseInt(data.topFirst);
				$scope.battlesData.topTop = parseInt(data.topTop);
				$scope.battlesData.topMid = parseInt(data.topMid);
				$scope.battlesData.topBot = parseInt(data.topBot);

				$scope.battlesData.midFirst = parseInt(data.midFirst);
				$scope.battlesData.midTop = parseInt(data.midTop);
				$scope.battlesData.midMid = parseInt(data.midMid);
				$scope.battlesData.midBot = parseInt(data.midBot);

				$scope.battlesData.botFirst = parseInt(data.botFirst);
				$scope.battlesData.botTop = parseInt(data.botTop);
				$scope.battlesData.botMid = parseInt(data.botMid);
				$scope.battlesData.botBot = parseInt(data.botBot);

				updateRating();
			};
			
		}, function(errorCallback){
			alert(errorCallback.result);
		});	
	};


	var roundOff = function(num){
		var rtnNum;
		if(num < 100){
			rtnNum = num.toPrecision(2);
		}else{
			rtnNum = num.toPrecision();
		}
		return rtnNum
	};

	$scope.submitSignIn = function(){
 		var tag = this.signInTag;
 		var pword = this.signInPword;
 		MS.queryMember(tag,pword).then(function(result){
 			var signInResult = MS.validateSubmission();
 			if(signInResult == "SUCCESS"){
 				$scope.getMemberStatus();
 			}
 		});
 	}

	
	$scope.getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
		$scope.signedIn = MS.signedIn;
		memberID = MS.memberID;
		$scope.battlesData.memberID = memberID;
		if(memberID!=null){
			getBattles();
		}
 	};


	resetTierSelections();
	resetBoardSelections();
 	$scope.getMemberStatus();


}]);