'use strict';

APP.controller('QuizCtrl',['$scope','$state','memberSrvc','QuizSrvc', function ($scope,$state,memberSrvc,QuizSrvc) {

	var ME = "QUIZ CTRL: ";
	var QS = QuizSrvc;
	var MS = memberSrvc;
	$scope.quizActive = false;
	$scope.quizComplete = false;

	$scope.gamerTag = "";
	$scope.signedIn = false;
	$scope.signInResult = "";
	$scope.submitted = false;
	$scope.modalShown = false;
	
	$scope.quizList = QS.quizList;
	$scope.selectedQuiz = $scope.quizList[0];
	$scope.studyGuides = [];
	
	$scope.selectQuiz = function(q){
		$scope.studyGuides = q.study;
	};
	
	$scope.thisQuestion = new Object();
	$scope.answerRB = "";
	$scope.quizResult = 0;
	$scope.quizTitle = "";
	
	var initQuestion = function(){
		$scope.answerRB = "";
		$scope.thisQuestion = QS.getNextQuestion();
		if($scope.thisQuestion==null){
			$scope.quizResult = QS.quizResult;
			$scope.quizActive = false;
			$scope.quizComplete = true;
		}
	};
	
	$scope.isSignedIn = function(){
		if($scope.signedIn == false){
			toggleModal();
		}else{
			initQuiz();
		};	
	};

	var initQuiz = function(){
		$scope.quizActive = true;
		$scope.quizResult = 0;
		QS.setSelectedQuiz(parseInt($scope.selectedQuiz.quizID));
		$scope.quizTitle = QS.quizTitle;
		initQuestion();
	};

	$scope.clickSubmitBtn = function(){
		if($scope.answerRB==""){
			
		}else{
			QS.submitAnswer($scope.answerRB);
			initQuestion();
		};
	};
	
	$scope.resetPage = function(){
		$scope.quizActive = false;
		$scope.quizComplete = false;
		$scope.selectedQuiz = $scope.quizList[0];
		$scope.quizTitle = "";
		$scope.answerRB = "";
	};
	
	
	// Sign in functions
	
  	var toggleModal = function() {
    	$scope.modalShown = !$scope.modalShown;
		console.log("Modal" + $scope.modalShown);
  	};
	
	$scope.submitSignIn = function(isValid){
		$scope.submitted = true;
		if(isValid){
			var tag = this.signInTag;
			var pword = this.signInPword;
			MS.queryMember(tag,pword).then(function(result){
				$scope.signInResult = MS.validateSubmission();
				if($scope.signInResult == "SUCCESS"){
					getMemberStatus();
					$scope.modalShown = false;
					initQuiz();
				}
			});
		};
 	};
	

	var getMemberStatus = function(){
 		$scope.gamerTag = MS.gamerTag;
		$scope.signedIn = MS.signedIn;
 	};
	
	// Page load functions

 	getMemberStatus();
	$scope.selectQuiz($scope.selectedQuiz);
}]);