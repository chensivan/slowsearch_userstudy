// script.js

// create the module and name it scotchApp
    // also include ngRoute for all our routing needs
var app = angular.module('app', ['rzModule', 'ui.ace','ui.bootstrap', 'ngRoute']);


app.filter('minsToMinSeconds', [function() {
    return function(value) {
      var str = Math.floor(value) + " min ";
      var sec = value - Math.floor(value);
      if( sec > 0){
        str += Math.floor(sec * 60.0) + "sec";
      }
      return str;
    };
}])
// configure our routes
app.config(function($routeProvider) {
  $routeProvider

  // route for the home page
  .when('/', {
      templateUrl : 'pages/consent.html',
      controller  : 'consentController'
  })

  .when('/consent', {
      templateUrl : 'pages/consent.html',
      controller  : 'consentController'
  })

  // route for the about page
  .when('/part1', {
      templateUrl : 'pages/part1.html',
      controller  : 'part1Controller'
  })

  // route for the contact page
  .when('/part2', {
      templateUrl : 'pages/part2.html',
      controller  : 'part2Controller'
  })

  // route for the contact page
  .when('/part3', {
      templateUrl : 'pages/part3.html',
      controller  : 'part3Controller'
  });
});


// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
  var id = Math.random().toString(36).substring(7);


  $scope.participant_data = {
      _id:  id,
      quiz: {
        quiz_answer: []
      },
      subjectiveTask: {},
      objectiveTask: {
        "1":{},
        "2":{},
        "3":{},
        "4":{},
        "5":{},
        "6":{},
        "7":{}
      }
    };
  });

var consentController = function($scope, $http, $timeout, $location){
  window.scrollTo(0,0);
  $scope.disableSubmit = true;

  $scope.isToggled = function() {
   return $scope.disableSubmit;
  };

  $scope.toggle = function() {
    $scope.disableSubmit = !$scope.disableSubmit;
  };

  $scope.submitConsent = function() {
    $location.path("part1");
  };


};

var part1Controller = function($scope, $http, $timeout, $location){
  $scope.quiz = part1_quiz;

  window.scrollTo(0,0);

};

var part2Controller = function($scope, $http, $timeout, $location){
  window.scrollTo(0,0);

  $scope.subjectiveTaskInstruction = true;
  $scope.showAnswers = false;
  $scope.disableSubmit = true;
  $scope.totaltext = "testing2";


  $scope.gotoSubTask = function(){
    var timestamp = new Date();
    $scope.participant_data.subjectiveInstructionButton = timestamp.getTime();
    $scope.subjectiveTaskInstruction = !$scope.subjectiveTaskInstruction;
  }

  $scope.taskAs = part2_questions;

  $scope.testhtml = function(test){
    return "<strong>I'm string, "+test+"</strong>";

  }
  $scope.getAccAnswer = function(taskIndex, levelIndex){

    var list  = [];
    for (var i=0; i<= levelIndex; i++){

      list.push($scope.taskAs[taskIndex].answers[i].text.trim());

    //  string += "\n linebreak \n";
    }

    return list;
  }
  $scope.sliderOptions =   {
    step: 0.001666666666667,
    floor: 0,
    ceil: 10,
    precision: 2,
    ticksValuesTooltip: function(v) {
      return 'Tooltip for ' + v;
    },
    translate: function(value) {
      return value;
    }
  };

  var taskACurrentId = 0;

  $scope.idCounter = 0;
  $scope.taskValue =  4;

  $scope.searchSliderChanged = function(a,b,c){
    console.log(a,b,c);
  };

  $scope.waitSliderChanged = function(a,b,c){
    $scope.disableSubmit = false;
  };

  $scope.searchSlider = {
    value:3,
    options:{
      floor: 1,
      ceil: 5,
      stepsArray: [
        {value: 1, legend: 'Definitely not'},
        {value: 2, legend: 'Maybe not'},
        {value: 3, legend: 'Netural'},
        {value: 4, legend: 'Maybe'},
        {value: 5, legend: 'Definitely'}
      ],
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      },
      translate: function(value) {
        return value;
      }
    }
  };


  $scope.continueToAnswer = function(){
    $scope.showAnswers = true;
  }

  $scope.submit = function() {

    // debugger;
    // $http.get('http://slow-server-test.dataprocessingclub.org/c/1/task?uid='+id+'&no=1', 'true')
    // .success(function(data, status, headers, config){
    //   console.log(data);
    // });;

    var taskSubAnswer = [$scope.taskAs[$scope.idCounter].answers[0].value
    ,$scope.taskAs[$scope.idCounter].answers[1].value
    ,$scope.taskAs[$scope.idCounter].answers[2].value];

    var timestamp = new Date();

    $scope.participant_data.subjectiveTask[$scope.idCounter] = [];
    $scope.participant_data.subjectiveTask[$scope.idCounter] = taskSubAnswer;
    $scope.participant_data.subjectiveTask[$scope.idCounter].push(timestamp.getTime());

    //
    // $http.post('/slowsearch', participant_data).success(function(response) {
    //   console.log(response);
    // });

    // $http.put('/slowsearch/'+$scope.taskSubAnswer._id, $scope.taskSubAnswer.answers).success(function(response) {
    //   console.log(response);
    // });
    taskACurrentId++;
    $scope.idCounter++;
    $scope.showAnswers = !$scope.showAnswers;

    $scope.disableSubmit = !$scope.disableSubmit;

    window.scrollTo(0,0);

  };

};

var part3Controller = function($scope, $http, $timeout, $location){
  window.scrollTo(0,0);
};


app.controller('consentController', ['$scope','$http', '$timeout', '$location', consentController]);

app.controller('part1Controller', ['$scope','$http', '$timeout', '$location', part1Controller]);

app.controller('part2Controller', ['$scope','$http', '$timeout', '$location', part2Controller]);

app.controller('part3Controller', ['$scope','$http', '$timeout', '$location', part3Controller]);



window.onbeforeunload = function(event) {
  debugger;
  // console.log(participant_data);
  // $http.post('/slowsearch', participant_data).success(function(response) {
  //   console.log(response);
  // });
  event.returnValue = "Do you really want to leave?";
};
