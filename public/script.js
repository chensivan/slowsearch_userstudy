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
  $scope.message = 'N/A';
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

    $scope.idCounter++;

    if ($scope.idCounter == 7){
      $location.path("part3");
    }else{
      $scope.showAnswers = !$scope.showAnswers;
      $scope.disableSubmit = !$scope.disableSubmit;
    }
    window.scrollTo(0,0);

  };

};



var part3Controller = function($scope, $http, $timeout, $location){
  $scope.consoleOutput = '';

  var custom_console_log = function(message) {
    $scope.consoleOutput += message;
    $scope.consoleOutput += "\n";
  };
  var temp_handle = console.log;
  console.log = custom_console_log;

  window.scrollTo(0,0);
  $scope.showinstruction = true;
  $scope.levelButton = false;
  $scope.slowProgrammingDisabled = false;

  $scope.tasks = part3_questions;
  $scope.idCounter = 1;
  $scope.disableNext = true;
  $scope.level = -1;
  $scope.gotoActualTask = function(){
    $scope.showinstruction = false;
  };

  $scope.aceLoaded = function(_editor){
      _editor.setTheme("ace/theme/twilight");
      _editor.getSession().setMode("ace/mode/javascript");
      _editor.focus();
  }

  $scope.aceOption = {
    theme: 'tomorrow_night_eighties',
    mode: 'html',
    useWrapMode : true
  };



 $scope.run = function(userContent, taskIndex) {
    $scope.consoleOutput = '';
    var result;
    try {
      $scope.currentOutput = eval(userContent);
    } catch (e) {
      custom_console_log(e.message);
    }
    var aggResult = true;
    for (var i=0; i< $scope.tasks[taskIndex].testCase.length; i++){
      try {
        $scope.tasks[taskIndex].testCase[i].output = eval(userContent + "\nconsole.log('test case ' + " + (i+1)+ "+' running...');\n" + $scope.tasks[taskIndex].testCase[i].code);
      } catch (e) {
        $scope.tasks[taskIndex].testCase[i].output = e.message;
      }
      $scope.tasks[taskIndex].testCase[i].match = JSON.stringify($scope.tasks[taskIndex].testCase[i].answer) == JSON.stringify($scope.tasks[taskIndex].testCase[i].output);
      aggResult = aggResult & $scope.tasks[taskIndex].testCase[i].match
    }

    if (aggResult){
      $scope.disableNext = false;
    }else{
      $scope.disableNext = true;
    }
    /*
    if($scope.idCounter==4){
      var now = new Date();
      var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
      var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
      var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

      correctAnswer =  days[now.getDay()] + ", " +
              months[now.getMonth()] + " " +
              date + ", 2016";
    }

    if (JSON.stringify($scope.currentOutput) == JSON.stringify(correctAnswer)) {
      $scope.disableNext = false;
      $scope.message = "Correct!";
    }
    else {
      $scope.disableNext = true;
      $scope.message = "Incorrect!";
    }*/
  };

  $scope.nextTask = function() {

    $scope.consoleOutput = "";
    $scope.slowProgrammingDisabled = false;
    $scope.levelButton = false;
    $scope.loading = false;
    $timeout.cancel(timer);
    $scope.level = -1;


    var timestamp = new Date();
    var task_sub_index = 'task'+$scope.idCounter+'b';

    $scope.participant_data.objectiveTask[$scope.idCounter].content = $scope.tasks[$scope.idCounter-1].content;
    $scope.participant_data.objectiveTask[$scope.idCounter].finishTime = timestamp.getTime();



    if($scope.idCounter==7){//if all tasks are complete
     $scope.confirmation = $scope.participant_data._id;
     $scope.showWrapper = !$scope.showWrapper;
     $scope.finalpage = !$scope.finalpage;
     window.onbeforeunload = function () {};
     $http.post('/slowsearch', $scope.participant_data).success(function(response) {
       console.log(response);
     });
    }

    $scope.idCounter++;
    //$scope.showTask = !$scope.showTask;

    // debugger;
    // $http.get('http://slow-server-test.dataprocessingclub.org/c/1/task?uid='+id+'&no='+$scope.idCounter+'', 'true')
    // .success(function(data, status, headers, config){
    //   console.log(data);
    // });

    $scope.disableSubmit = true;
    $scope.msg="";

    $scope.disableNext = !$scope.disableNext;
  };

  $scope.slowprogramming = function(){

    if($scope.level == -1){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.idCounter].basic = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
      }, 1000);

    }else if($scope.level == 0){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.idCounter].psedocode = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
      }, 1000);

    }else if($scope.level == 1){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.idCounter].correct = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;

        $scope.slowProgrammingDisabled = true;
      }, 1000);
    }
  }

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
