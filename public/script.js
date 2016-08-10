// script.js

// create the module and name it scotchApp
    // also include ngRoute for all our routing needs
var app = angular.module('app', ['rzModule', 'ui.ace','ui.bootstrap', 'ngRoute', "xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

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
  .when('/study', {
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
  })

  // route for the contact page
  .when('/part2/:id', {
      templateUrl : 'pages/part2.html',
      controller  : 'part2Controller'
  })

  // route for the contact page
  .when('/part3/:id', {
      templateUrl : 'pages/part3.html',
      controller  : 'part3Controller'
  })

  .when('/task', {
      templateUrl : 'pages/task.html',
      controller  : 'taskController'
  })

  .when('/task/:taskid', {
      templateUrl : 'pages/task.html',
      controller  : 'taskController'
  });

});


// create the controller and inject Angular's $scope
app.controller('mainController', ['$scope','$http','$location', function($scope, $http, $location) {

  // create a message to display in our view
  $scope.message = 'N/A';
  var id = Math.random().toString(36).substring(7);
  $scope._id = id;
  $scope.studymode = false;

  $scope.participant_data = {
      studyStartTime: (new Date()).getTime(),
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

    $scope.updateData = function(callback){
      $http.post('/slowsearch', $scope.participant_data).success(function(response) {
        console.log(response);
        callback();
      });
    };
  }]);

var consentController = function($scope, $http, $timeout, $location, $routeParams){
  window.scrollTo(0,0);
  $scope.disableSubmit = true;
  if ( $location.$$path == "/study"){
    $scope.$parent.studymode = true;
  }

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

var part1Controller = function($scope,  $http, $timeout, $location){
  $scope.quiz = part1_quiz;
  $scope.startTime = new Date();
  $scope.quizAnswer = [];
  window.scrollTo(0,0);

  $scope.submitQuiz = function() {

    var submitTime = new Date();
    $scope.participant_data.quiz.quiz_answer = $scope.quizAnswer;
    $scope.participant_data.quiz['submitTime'] = submitTime.getTime();
    $scope.participant_data.quiz['startTime'] = $scope.startTime.getTime();

    $scope.updateData(function(){
      $location.path("part2");
    });
  }

};

var part2Controller = function($scope,$http, $timeout, $location, $routeParams  ){
  window.scrollTo(0,0);

  $scope.subjectiveTaskInstruction = true;
  $scope.showAnswers = false;
  $scope.disableSubmit = true;
  $scope.idCounter = 0;

  if($routeParams.id){
    $scope.subjectiveTaskInstruction = false;
    $scope.idCounter = parseInt($routeParams.id)-1;
  }

  $scope.gotoSubTask = function(){
    var timestamp = new Date();
    $scope.participant_data["startTime"] = timestamp.getTime();
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

    $scope.participant_data.subjectiveTask[$scope.idCounter] = {};
    $scope.participant_data.subjectiveTask[$scope.idCounter]["search"] = $scope.searchSlider.value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level1"] = $scope.taskAs[$scope.idCounter].answers[0].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level2"] = $scope.taskAs[$scope.idCounter].answers[1].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level3"] = $scope.taskAs[$scope.idCounter].answers[2].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["submitTime"] = timestamp.getTime();

    $scope.idCounter++;
    $scope.updateData(function(){
      console.log("updateData Successful");
      window.scrollTo(0,0);
      $scope.searchSlider.value = 3;
      if ($scope.idCounter == 7){
        $location.path("part3/1/");
      }else{
        $scope.showAnswers = !$scope.showAnswers;
        $scope.disableSubmit = !$scope.disableSubmit;
      }
    });
  };
};

var part3Controller = function($scope, $http, $timeout, $location, $routeParams){
  $scope.consoleOutput = '';
  $scope.lastOutput = null;
  $scope.showinstruction = false;
  $scope.taskid = 0;
  $scope.startTime = (new Date()).getTime();
  if($routeParams.id){

    $scope.taskid = parseInt($routeParams.id);
    if($scope.taskid == 1){
        $scope.showinstruction = true;
    }
  }else{
    $scope.showinstruction = true;
    $scope.taskid = 1;

  }

  var custom_console_log = function(message, raw) {
    if(raw){
      $scope.consoleOutput += message;
    }else{
      $scope.consoleOutput += JSON.stringify(message);
    }

    $scope.consoleOutput += "\n";
    $scope.lastOutput = message;
  };
  var temp_handle = console.log;
  console.log = custom_console_log;

  window.scrollTo(0,0);
  $scope.levelButton = false;
  $scope.slowProgrammingDisabled = false;

  //$scope.tasks = part3_questions;
  $http.get("gettask/" + $scope.taskid)
  .then(function(response) {

    if(response.data.length>1){
      console.error("more than one task returned: investigate this!");
      alert("Look at the console!");
      return;
    }else if (response.data.length == 0){
      window.onbeforeunload = null;
      $scope.thankyou = true;
      alert("Thank you for your particiaption!" , $scope._id);
    }
    $scope.task = response.data[0];
  });

  $scope.disableNext = true;
  $scope.level = -1;
  $scope.gotoActualTask = function(){
    $scope.showinstruction = false;
    $scope.startTime = (new Date()).getTime();

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

  $scope.typeofAnswer = function(caseIndex){
    return typeof $scope.task.testCase[caseIndex].answer;
  };

  $scope.typeofOutput = function(caseIndex){
    return typeof $scope.task.testCase[caseIndex].output;
  };
 $scope.run = function(userContent) {
    $scope.consoleOutput = '';
    var result;
    try {
      $scope.currentOutput = eval(userContent);
    } catch (e) {
      custom_console_log(e.message);
    }
    var aggResult = true;
    for (var ss_index=0; ss_index< $scope.task.testCase.length; ss_index++){
      try {
        $scope.task.testCase[ss_index].output = eval("custom_console_log('test case ' + " + (ss_index+1)+ "+' running...', true);\n" + userContent + "\n" + $scope.task.testCase[ss_index].code );
        if($scope.task.testCase[ss_index].output === undefined){
          $scope.task.testCase[ss_index].output = $scope.lastOutput;
        }
      } catch (e) {
        $scope.task.testCase[ss_index].output = e.message;
      }
      // check the return value
      $scope.task.testCase[ss_index].match = JSON.stringify($scope.task.testCase[ss_index].answer) == JSON.stringify($scope.task.testCase[ss_index].output);
      aggResult = aggResult & $scope.task.testCase[ss_index].match
    }

    if (aggResult){
      $scope.disableNext = false;
    }else{
      $scope.disableNext = true;
    }
  };

  $scope.nextTask = function() {
    $scope.endTime = (new Date()).getTime();

    $scope.consoleOutput = "";
    $scope.slowProgrammingDisabled = false;
    $scope.levelButton = false;
    $scope.loading = false;
    if(timer){
        $timeout.cancel(timer);
    }
    $scope.level = -1;

    var timestamp = new Date();
    $scope.participant_data.objectiveTask[$scope.taskid].content = $scope.task.startercode;
    $scope.participant_data.objectiveTask[$scope.taskid].startTime =$scope.startTime;
    $scope.participant_data.objectiveTask[$scope.taskid].finishTime =$scope.endTime;

    $scope.updateData(function(){
       window.onbeforeunload = null;
       $location.path("part3/" + ($scope.taskid + 1));
    });

    $scope.disableSubmit = true;
    $scope.msg="";

    $scope.disableNext = !$scope.disableNext;
  };

  $scope.slowprogramming = function(){

    if($scope.level == -1){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.taskid].level1time = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      if(!$scope.task.level1time)$scope.task.level1time = 1;
      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
      }, $scope.task.level1time * 1000);

    }else if($scope.level == 0){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.taskid].level2 = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      if(!$scope.task.level2time)$scope.task.level2time = 1;

      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
      }, $scope.task.level2time * 1000);

    }else if($scope.level == 1){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.taskid].level3 = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      if(!$scope.task.level3time)$scope.task.level3time = 1;

      timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;

        $scope.slowProgrammingDisabled = true;
      }, $scope.task.level3time * 1000);
    }
  }

};


var taskController = function($scope, $http, $timeout, $location, $routeParams){
  $scope.message = "hello";
  $scope.taskid = $routeParams.taskid;
  $scope.consoleOutput = 'console.log message in starter code will appear here.';
  $scope.showTaskSelection = true;
  $scope.updateEnabled = false;
  $scope.newTask = false;
  $scope.tasks = [];
  $scope.pTypes = [
    {name:"Memory Aids", desc:"Participants sought a specific function name."},
    {name:"Explanatory Requests", desc:"Participants sought examples or explanations of their code."},
    {name:"High-Level Strategic Guidance", desc:"Participants sought best ways to approach problems."},
    {name:"Code Requests", desc:"Participants sought specific pieces of code,"},
    {name:"Bug Fixing", desc:"Participants sought specific solutions to program errors."},
    {name:"Code Refactoring", desc:"Participants asked for code improvements."},
    {name:"Effort-Saving Requests", desc:" Participants handed off tasks to save time and effort"},
  ];

  if($scope.taskid){
    $http.get("gettaskid/" + $scope.taskid)
    .then(function(response) {

      if(response.data.length>1){
        console.error("more than one task returned: investigate this!");
        alert("Look at the console!");
        return;
      }
      $scope.task = response.data[0];
      $scope.showTaskSelection = false;

    });
  }else{
    $http.get("gettasks")
    .then(function(response) {
      $scope.tasks = response.data;
    });
  };

  $scope.updateTaskSet = function(){
    console.log("updateTaskSet");
    var totalCount = 0;
    for(var i=0; i< this.tasks.length; i++){
      this.tasks[i].selectedid = -1;

      if(this.tasks[i].selected){
        totalCount++;
        this.tasks[i].selectedid = totalCount;
      }
    }

    if(totalCount > 7){
      alert("Don't we only allow up to 7 tasks?");
      return;
    }

    var count = 0;
    for(var i=0; i< this.tasks.length; i++){
      $http.post('/taskupdate', {_id: this.tasks[i]._id, update: {selected:this.tasks[i].selected, selectedid: this.tasks[i].selectedid}}).success(function(response) {
        console.log(JSON.stringify(response));
        count++;
        if(count == totalCount){
          location.reload();
        }
      });
    }
  };

  $scope.createNewTask = function(){
    $http.get("createtask")
    .then(function(response) {
      $scope.task = response.data;
      $scope.showTaskSelection = false;
      $scope.newTask = true;
    });
  }

  $scope.addTestCase = function(){
    if(!$scope.task.testCase)
      $scope.task.testCase = [];
    $scope.task.testCase.push(
      {
        code:"",
        answer:"",
        output:"",
        match: false
      }
    );
  };

  var custom_console_log = function(message, raw) {
    if(raw){
      $scope.consoleOutput += message;
    }else{
      $scope.consoleOutput += JSON.stringify(message);
    }
    $scope.consoleOutput += "\n";
  };
  console.log = custom_console_log;

  $scope.aceLoaded = function(_editor){
      _editor.setTheme("ace/theme/twilight");
      _editor.getSession().setMode("ace/mode/javascript");
      _editor.focus();
  }
  $scope.typeofAnswer = function(caseIndex){
    try {
      var evaluated = eval($scope.task.testCase[caseIndex].answer);
    } catch (e) {
      custom_console_log("Answer has an error:", e.message);
    }
    return typeof evaluated;
  };

  $scope.typeofOutput = function(caseIndex){
    return typeof $scope.task.testCase[caseIndex].output;
  };

  $scope.run = function(userContent) {
     $scope.consoleOutput = '';
     var result;
     try {
       $scope.currentOutput = eval(userContent);
     } catch (e) {
       custom_console_log(e.message);
     }
     var aggResult = true;
     if(!$scope.task.testCase) return;
     for (var ss_index=0; ss_index< $scope.task.testCase.length; ss_index++){
       try {
         var answer = eval($scope.task.testCase[ss_index].answer) ;
         $scope.task.testCase[ss_index].output= eval("custom_console_log('test case ' + " + (ss_index+1)+ "+' running...', true);\n" + userContent + "\n" + $scope.task.testCase[ss_index].code );

         if($scope.task.testCase[ss_index].output === undefined){
           $scope.task.testCase[ss_index].output = eval($scope.lastOutput);
         }
       } catch (e) {
         $scope.task.testCase[ss_index].output = e.message;
       }

       // check the return value
       $scope.task.testCase[ss_index].match = JSON.stringify(answer) == JSON.stringify($scope.task.testCase[ss_index].output);
       aggResult = aggResult & $scope.task.testCase[ss_index].match
     }

     if (aggResult){
       $scope.updateEnabled = true;
     }else{
       $scope.updateEnabled = false;
     }

   };
   $scope.remove = function(){
     console.log($scope.task);
     $http.post('/taskremove', $scope.task).success(function(response) {
        console.log("response", response);
       location.reload();
     });
   };

   $scope.update = function(){
     console.log("update pressed");
     for (var ss_index=0; ss_index< $scope.task.testCase.length; ss_index++){
       $scope.task.testCase[ss_index].output = "";
       $scope.task.testCase[ss_index].match = false;
       $scope.task.testCase[ss_index].answer = eval($scope.task.testCase[ss_index].answer) ;
     }

     $scope.task.level1time = parseInt($scope.task.level1time);
     $scope.task.level2time = parseInt($scope.task.level2time);
     $scope.task.level3time = parseInt($scope.task.level3time);


     $http.post('/taskupdate', {_id: $scope.task._id, update: $scope.task}).success(function(response) {
       alert("Thank you for your update!");
       console.log(JSON.stringify(response));
       location.reload();
     });
   }
}



app.controller('consentController', ['$scope','$http', '$timeout', '$location', consentController]);

app.controller('part1Controller', ['$scope','$http', '$timeout', '$location', part1Controller]);

app.controller('part2Controller', ['$scope','$http', '$timeout', '$location', '$routeParams',  part2Controller]);

app.controller('part3Controller', ['$scope','$http', '$timeout', '$location', '$routeParams',  part3Controller]);

app.controller('taskController', ['$scope','$http', '$timeout', '$location', '$routeParams',  taskController]);



window.onbeforeunload = function(event) {

  // console.log(participant_data);
  // $http.post('/slowsearch', participant_data).success(function(response) {
  //   console.log(response);
  // });
  event.returnValue = "Do you really want to leave?";
};
