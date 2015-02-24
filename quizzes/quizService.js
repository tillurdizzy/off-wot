'use strict';

APP.service('QuizSrvc',[function (){
	//Private vars
	var self = this;
	var selectedQuizID = 0;
	var qNum=-1;
	var idList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
	var quizOrder = [];
	var quizQuestions = [];
	var userAnswers = [];


	//Public vars
	self.quizTitle = "";
	self.currentQuestion = new Object();
	self.quizResult=0;


	self.setSelectedQuiz = function(int){
		selectedQuizID = int;
		switch(selectedQuizID){
			case 1:
				self.quizTitle = "Armor and Penetration Mechanics";
				quizQuestions = quiz01;
				break;
		}
		quizOrder = shuffle(idList);
		qNum=-1;
		userAnswers = [];
	};

	self.getNextQuestion = function(){
		qNum+=1;
		if(qNum == 20){
			self.currentQuestion = null;//Indicates to controller quiz is complete;
			quizComplete();
		}else{
			self.currentQuestion = new Object();
			self.currentQuestion = quizQuestions[quizOrder[qNum]];
			self.currentQuestion.num = qNum + 1;
		}
		return self.currentQuestion;
	};

	self.submitAnswer = function(ans){
		userAnswers.push(ans);
		console.log(userAnswers)
	};

	var quizComplete = function(){
		self.quizResult = 0;
		for (var i = 0; i < quizQuestions.length; i++) {
			var correct = quizQuestions[quizOrder[i]].Answer;
			var user = userAnswers[i];
			if(correct==user){
				self.quizResult+=1;
			}
		};
		quizQuestions = [];
		qNum=-1;
		selectedQuizID = 0;
		quizOrder = [];
		userAnswers = [];
		self.quizTitle = "";
	};

	

	//Penetration Mechanics
	var quiz01=[
		{id:1,Question:"Game pyhsics allow for a +/-(___) randomization in shell penetration from it's published average penetration (alpha).",
		A:"10%",B:"15%",C:"25%",Answer:"C"},

		{id:2,Question:"The color of the penetration indicator is based only on:",
		A:"Nominal armor thickness",B:"Effective armor thickness",C:"Impact angle",Answer:"A"},

		{id:3,Question:"A ricochet is most likely at impact angles over:",
		A:"30 degrees",B:"50 degrees",C:"70 degrees",Answer:"C"},

		{id:4,Question:"If a shell's caliber is more than (___) greater than the thickness of the armor, no ricochet will happen regardless of armor angle.",
		A:"2X",B:"3X",C:"4X",Answer:"B"},

		{id:5,Question:"Which of the following causes the most hit point damage when penetrated?",
		A:"external modules",B:"spaced armor",C:"solid armor",Answer:"C"},

		{id:6,Question:"AP and APCR shell penetration is significantly decreased from a distance of more than (___).",
		A:"100m",B:"200m",C:"300m",Answer:"A"},

		{id:7,Question:"Which type of shell has the highet penetration value?",
		A:"AP",B:"APCR",C:"HEAT",Answer:"B"},

		{id:8,Question:"A shell's normalization refers to:",
		A:"adjusting the angle of impact towards 90 degrees.",B:"averaging the dispertion rate",C:"lowering the trajectory",Answer:"A"},

		{id:9,Question:"Almost every vehicle is protected better on its':",
		A:"Front",B:"Sides",C:"Rear",Answer:"A"},

		{id:10,Question:"Positioning your tank at an angle to the enemy helps to (__).",
		A:"increase effective armor thickness",B:"reduce impact angle",C:"prevent richchet",Answer:"A"},

		{id:11,Question:"When peeking around a corner you should (__). ",
		A:"never expose your tracks",B:"cut the corner",C:"utilize side-scraping",Answer:"B"},

		{id:12,Question:"Use the Horizontal Rocking technique to (__).",
		A:"prevent enemy from aiming at weak spots",B:"increase nominal armor thickness",C:"travel faster over rough terrain",Answer:"A"},

		{id:13,Question:"An effective defensive measure while reloading in a duel is to (__).",
		A:"move back and forth",B:"rotate your turret",C:"turn the front of your tank toward the enemy",Answer:"B"},

		{id:14,Question:"A hull down position is useful for (__).",
		A:"targeting the enemy's lower glacial plate",B:"obtaining a better line of sight",C:"protecting vulnerble areas of the tank",Answer:"C"},

		{id:15,Question:"Every shot you take is dispersed randomly around the center of your (__).",
		A:"aiming circle",B:"reticle",C:"Both A and C",Answer:"C"},

		{id:16,Question:"A red outline on your target indicates:",
		A:"A clear line of sight",B:"A good chance of penetration",C:"Target has been detected",Answer:"A"},

		{id:17,Question:"Shots that fall outside your aim or go in a completely different direction are usually caused by:",
		A:"random dispersion",B:"injured or dead gunner",C:"network or server lag",Answer:"C"},

		{id:18,Question:"Shots will be most accurate when the aiming circle is:",
		A:"colored red",B:"at its smallest",C:"completely covering the target",Answer:"B"},

		{id:19,Question:"if your Gunner is killed or knocked out, his skill for calculating accuracy is set to:",
		A:"50%",B:"25%",C:"0%",Answer:"C"},

		{id:20,Question:"Over a long distance, there is NO penetration loss when using:",
		A:"AP",B:"APCR",C:"HE",Answer:"C"}];


		self.quizList=[
			{label:'Gunnery and Penetration Mechanics',
			study:[
				{label:"Gunnery & Armor Penetration (WoT)",url:"http://wiki.wargaming.net/en/Gunnery_%26_Armor_Penetration_(WoT)"},
				{label:"Explaining Mechanics - Penetration",url:"https://www.youtube.com/watch?v=wq5S8CrsUig"}],
				quizID:1}
		];
		
		var shuffle = function(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex ;
		
		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {
		
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
		
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		  }
		
		  return array;
		};


		
	return self;
}]);