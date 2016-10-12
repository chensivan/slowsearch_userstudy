// script.js

// TODO slider initial value NaN



// create the module and name it scotchApp
    // also include ngRoute for all our routing needs
var app = angular.module('app', ['rzModule', 'ui.ace','ui.bootstrap', 'ngRoute', "xeditable"]);

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
  .when('/study/:condition/:part2_ps/:part3_ps', {
      templateUrl : 'pages/consent.html',
      controller  : 'consentController'
  })

  .when('/consent', {
      templateUrl : 'pages/consent.html',
      controller  : 'consentController'
  })

  // route for the about page
  .when('/part1/:condition/:part2_ps/:part3_ps', {
      templateUrl : 'pages/part1.html',
      controller  : 'part1Controller'
  })

  // route for the contact page
  .when('/part2/:condition/:part2_ps/:part3_ps', {
      templateUrl : 'pages/part2.html',
      controller  : 'part2Controller'
  })


  // route to a specific contect the contact page
  .when('/part3/:condition/:part3_ps/:id/:array', {
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
  $scope.condition = 1; // by deafult we test synchronous condition

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
  if ( $location.$$path.includes("/study")){
    $scope.$parent.studymode = true;
  }
  var condition = $routeParams.condition;
  var ps2 = $routeParams.part2_ps;
  var ps3 = $routeParams.part3_ps;


  if (!$routeParams.condition){
    alert("specify the condition. 0 for baseline, 1 for synchronous");
  }
  if (!$routeParams.part2_ps){
    alert("specify the problem set for part 2 . 0 for baseline, 1 for synchronous");
  }
  if (!$routeParams.part3_ps){
    alert("specify the problem set for part 2 . 0 for baseline, 1 for synchronous");
  }
  $scope.$parent.condition = parseInt($routeParams.condition);
  $scope.$parent.part2_ps = $routeParams.part2_ps;
  $scope.$parent.part3_ps = $routeParams.part3_ps;
  /*
  condition can be 1, 2, 3
  0: baseline
  1: synchronous
  2: asynchronous.
  */


  $scope.isToggled = function() {
   return $scope.disableSubmit;
  };

  $scope.toggle = function() {
    $scope.disableSubmit = !$scope.disableSubmit;
  };

  $scope.submitConsent = function() {
    $location.path("part1/" + condition + "/" + part2_ps + "/" + part3_ps);
  };


};

var part1Controller = function($scope,  $http, $timeout, $location, $routeParams){
  $scope.quiz = part1_quiz;
  $scope.startTime = new Date();
  $scope.quizAnswer = [];
  window.scrollTo(0,0);
  var condition = $routeParams.condition;
  var part2_ps = $routeParams.part2_ps;
  var part3_ps = $routeParams.part3_ps;


  $scope.submitQuiz = function() {

    var submitTime = new Date();
    $scope.participant_data.quiz.quiz_answer = $scope.quizAnswer;
    $scope.participant_data.quiz['submitTime'] = submitTime.getTime();
    $scope.participant_data.quiz['startTime'] = $scope.startTime.getTime();

    $scope.updateData(function(){
      $location.path("part2/" + condition + "/" + part2_ps + "/" + part3_ps);
    });
  }

};

var part2Controller = function($scope,$http, $timeout, $location, $routeParams  ){
  var condition = $routeParams.condition;
  var part2_ps = $routeParams.part2_ps;
  var part3_ps = $routeParams.part3_ps;

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
  if(part2_ps != 'ps1' && part2_ps != 'ps2'&& part2_ps != 'ps3')
  {
    $scope.taskAs = part2_questions;
  }
  else{

    $scope.taskAs = [];

    var task_ids = [];

    $http.get("gettasks")
    .then(function(response) {
      var tasks = response.data;
      console.log("tasks.length",tasks.length);
      for (var i=0; i<tasks.length; i++){
        if (tasks[i].ps== part2_ps){
          task_ids.push(tasks[i].id);
        }
      }
      console.log("before:", task_ids);
      task_ids = shuffle(task_ids);
      console.log("shuffle:", task_ids);
      for (i=0; i< task_ids.length; i++){
        $http.get("gettask/" + task_ids[i])
        .then(function(response) {
          if(response.data.length>1){
            console.error("more than one task returned: investigate this!");
            alert("Look at the console!");
            return;
          }
          $scope.taskAs.push({
            id: $scope.taskAs.length,
            task_id : response.data[0].id,
            name: response.data[0].name,
            content: response.data[0].startercode,
            description: response.data[0].description ,
            answers:[
              {text:(response.data[0].level1?response.data[0].level1:"Level 1 answer not yet specified"), value:defaultValue,  expectedTime : 0},
              {text:(response.data[0].level2?response.data[0].level2:"Level 2 answer not yet specified"), value:defaultValue, expectedTime : 0},
              {text:(response.data[0].code?response.data[0].code:"Level 3 answer not yet specified"), value:defaultValue, expectedTime : 0}
            ]
          })

        });
      }
    });
  }

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
    ceil: 20,
    precision: 2,
    ticksValuesTooltip: function(v) {
      return 'Tooltip for ' + v;
    },
    translate: function(value) {
      return value;
    }
  };

  $scope.timeSliderOptions = {
    step: 1,
    floor: 0,
    ceil: 60,
    precision: 1,
    ticksValuesTooltip: function(v) {
      return 'Tooltip for ' + v;
    },
    translate: function(value) {
      return value;
    }
  }

  $scope.taskValue =  4;

  $scope.searchSliderChanged = function(a,b,c){
      console.log(a,b,c);
  };

  $scope.howLongSliderChanged = function(a,b,c){
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

  $scope.howLongSlider = {
    value:0,
    options:{
      step: 1,
      floor: 0,
      ceil: 60,
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
    $scope.participant_data.subjectiveTask[$scope.idCounter]["task_id"] = $scope.taskAs[$scope.idCounter].task_id;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["search"] = $scope.searchSlider.value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["howLong"] = $scope.howLongSlider.value
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level1"] = $scope.taskAs[$scope.idCounter].answers[0].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level2"] = $scope.taskAs[$scope.idCounter].answers[1].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["level3"] = $scope.taskAs[$scope.idCounter].answers[2].value;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["howLongLevel1"] = $scope.taskAs[$scope.idCounter].answers[0].expectedTime;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["howLongLevel2"] = $scope.taskAs[$scope.idCounter].answers[1].expectedTime;
    $scope.participant_data.subjectiveTask[$scope.idCounter]["howLongLevel3"] = $scope.taskAs[$scope.idCounter].answers[2].expectedTime;

    $scope.participant_data.subjectiveTask[$scope.idCounter]["submitTime"] = timestamp.getTime();

    $scope.updateData(function(){
      console.log("updateData Successful");
      window.scrollTo(0,0);
      $scope.searchSlider.value = 3;
      $scope.howLongSlider.value = 0;
      $scope.taskAs[$scope.idCounter].answers[0].value = 0;
      $scope.taskAs[$scope.idCounter].answers[1].value = 0;
      $scope.taskAs[$scope.idCounter].answers[2].value = 0;
      $scope.taskAs[$scope.idCounter].answers[0].expectedTime = 0;
      $scope.taskAs[$scope.idCounter].answers[1].expectedTime = 0;
      $scope.taskAs[$scope.idCounter].answers[2].expectedTime = 0;
      $scope.idCounter++;

      if ($scope.idCounter == $scope.taskAs.length){
        $location.path("part3/"+condition+"/" + part3_ps + "/0/none");
      }else{
        $scope.showAnswers = !$scope.showAnswers;
        $scope.disableSubmit = !$scope.disableSubmit;
      }
    });
  };
};

var part3Controller = function($scope, $http, $timeout, $location, $routeParams, $interval){
  $scope.consoleOutput = '';
  $scope.runlog = [];
  $scope.lastOutput = null;
  $scope.showinstruction = false;
  $scope.taskid = 0;
  $scope.startTime = (new Date()).getTime();
  $scope.moveOn = false;
  $scope.array = ($routeParams.array?$routeParams.array.split("-"):[]);
  var temp_handle = console.log;

  if($scope.timer){
    $timeout.cancel($scope.timer);
  }

  var condition = $routeParams.condition;
  var part3_ps = $routeParams.part3_ps;
  $scope.condition = parseInt(condition);
  if($scope.updateProgressBar){
    $interval.cancel($scope.updateProgressBar);
  }

  if($routeParams.id){

    $scope.taskid = parseInt($routeParams.id);
    if($scope.taskid == 0){
      $scope.showinstruction = true;

      var task_ids = [];
      $http.get("gettasks")
      .then(function(response) {
        var tasks = response.data;
        temp_handle("tasks.length",tasks.length);
        for (var ii=0; ii<tasks.length; ii++){
          if (tasks[ii].ps== part3_ps){
            task_ids.push(tasks[ii].id);
          }
        }
        temp_handle("before:", task_ids);
        task_ids = shuffle(task_ids);
        temp_handle("shuffle:", task_ids);
        $scope.array = task_ids;
      });
    }
  }else{
    $scope.showinstruction = true;
    alert("we need id /part3/:taskid/");
    return;
  }
  if(!$scope.showinstruction){

    $timeout(function(){
      $scope.moveOn = true;
      alert("Now you have an option to give up on this task and move on to the next task. Once you move on you cannot solve this task");
    },cutOffTime * 1000);

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
  console.log = custom_console_log;

  window.scrollTo(0,0);
  $scope.levelButton = false;
  $scope.slowProgrammingDisabled = false;

  //$scope.tasks = part3_questions;
  if($scope.taskid > 0)
  {
    var task_id = $scope.array[$scope.taskid-1];
    temp_handle("retrieving task :", task_id);
    $http.get("gettask/" + task_id)
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

  }

  $scope.disableNext = true;
  $scope.level = -1;
  $scope.gotoActualTask = function(){
    window.onbeforeunload = null;
    $location.path("part3/" + condition + "/" + part3_ps + "/" +($scope.taskid + 1)+ "/" + $scope.array.join("-"));
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
    var log = {time: (new Date()).getTime(), match:0};
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
      if($scope.task.testCase[ss_index].match ){
        log.match++;
      }
    }
    log.match /= $scope.task.testCase.length;
    $scope.runlog.push(log);
    if (aggResult){
      $scope.disableNext = false;
    }else{
      $scope.disableNext = true;
    }
  };

  $scope.stringify = function (a){
    return JSON.stringify(a);
  }

  $scope.nextTask = function(moveOn) {
    $scope.endTime = (new Date()).getTime();

    $scope.consoleOutput = "";
    $scope.slowProgrammingDisabled = false;
    $scope.levelButton = false;
    $scope.loading = false;
    if($scope.timer){
      $timeout.cancel($scope.timer);
    }

    if($scope.updateProgressBar){
      $interval.cancel($scope.updateProgressBar);
    }
    $scope.level = -1;

    var timestamp = new Date();
    $scope.participant_data.objectiveTask[$scope.taskid].taskid = $scope.task.id;
    $scope.participant_data.objectiveTask[$scope.taskid].content = $scope.task.startercode;
    $scope.participant_data.objectiveTask[$scope.taskid].startTime =$scope.startTime;
    $scope.participant_data.objectiveTask[$scope.taskid].finishTime =$scope.endTime;
    $scope.participant_data.objectiveTask[$scope.taskid].runlog = $scope.runlog;
    $scope.participant_data.objectiveTask[$scope.taskid].moveOn = moveOn;

    $scope.updateData(function(){
       window.onbeforeunload = null;
       $location.path("part3/" + condition + "/" + part3_ps + "/" + ($scope.taskid + 1)+ "/" + $scope.array.join("-"));
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
      if(!$scope.task.level1time)$scope.task.level1time = DEFAULT_DELAY;
      $scope.timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
        $interval.cancel($scope.updateProgressBar);
      }, $scope.task.level1time * 1000);

      $(".progress-bar").attr("aria-valuenow",0);
      if(displayProgress)$(".progress-bar").text("0% Complete");
      $(".progress-bar").attr("style", "width:0%;");

      $scope.updateProgressBar = $interval(function() {
        var progress = parseInt($(".progress-bar").attr("aria-valuenow"));
        progress++;
        $(".progress-bar").attr("style", "width:" + progress + "%;");
        $(".progress-bar").attr("aria-valuenow", progress);
        if(displayProgress)$(".progress-bar").text(progress + "% Complete");

      }, $scope.task.level1time * 1000 / 100);

    }else if($scope.level == 0){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.taskid].level2 = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      if(!$scope.task.level2time)$scope.task.level2time = DEFAULT_DELAY;

      $scope.timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;
        $interval.cancel($scope.updateProgressBar);

      }, $scope.task.level2time * 1000);

      $(".progress-bar").attr("aria-valuenow",0);
      if(displayProgress) $(".progress-bar").text("0% Complete");
      $(".progress-bar").attr("style", "width:0%;");

      $scope.updateProgressBar = $interval(function() {
        var progress = parseInt($(".progress-bar").attr("aria-valuenow"));
        progress++;
        $(".progress-bar").attr("style", "width:" + progress + "%;");
        $(".progress-bar").attr("aria-valuenow", progress);
        if(displayProgress)  $(".progress-bar").text(progress + "% Complete");
      }, $scope.task.level2time * 1000 / 100);

    }else if($scope.level == 1){
      var timestamp = new Date();
      $scope.participant_data.objectiveTask[$scope.taskid].level3 = timestamp.getTime();
      $scope.levelButton = true;
      $scope.loading = true;
      if(!$scope.task.level3time)$scope.task.level3time = DEFAULT_DELAY;

      $scope.timer = $timeout(function() {
        $scope.loading = false;
        $scope.level++;
        $scope.levelButton = false;

        $scope.slowProgrammingDisabled = true;
        $interval.cancel($scope.updateProgressBar);

      }, $scope.task.level3time * 1000);

      $(".progress-bar").attr("aria-valuenow",0);
      if(displayProgress) $(".progress-bar").text("0% Complete");
      $(".progress-bar").attr("style", "width:0%;");

      $scope.updateProgressBar = $interval(function() {
        var progress = parseInt($(".progress-bar").attr("aria-valuenow"));
        progress++;
        $(".progress-bar").attr("style", "width:" + progress + "%;");
        $(".progress-bar").attr("aria-valuenow", progress);
        if(displayProgress)    $(".progress-bar").text(progress + "% Complete");
      }, $scope.task.level3time * 1000 / 100);
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
      for (var ii=0; ii<$scope.tasks.length; ii++){
        $scope.tasks[ii].ps = ($scope.tasks[ii].ps ? $scope.tasks[ii].ps : "ps0");
      }
      $timeout(function () {
    //DOM has finished rendering
      $( ".pool-task-div" ).sortable({
        connectWith: ".connectedSortable",
        receive: function(event, ui){
          console.log(ui.item.attr("id") ," in ", event.target.id);
          var taskid = ui.item.attr("id");
          $scope.tasks[taskid-1].ps = event.target.id;
        }
      }).disableSelection();
      });

    });
  };

  $scope.updateTaskSet = function(){
    console.log("updateTaskSet");
    var totalCount = 0;

    var count = 0;
    var length = this.tasks.length;
    for(var i=0; i< this.tasks.length; i++){
      $http.post('/taskupdate', {_id: this.tasks[i]._id, update: {ps:this.tasks[i].ps}}).success(function(response) {
        console.log(JSON.stringify(response));
        count++;
        if(count == length){
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

  $scope.deleteTestCase = function(index){
    $scope.task.testCase.splice(index, 1);
  };

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
  if(!$scope.showTaskSelection)
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
      return ("Answer has an error:" +  e.message);
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
  //   temp_handle($scope.task);
     if(confirm("are you sure?")){
       $http.post('/taskremove', $scope.task).success(function(response) {
          console.log("response", response);
         location.reload();
       });
     }

   };

   $scope.update = function(){
     console.log("update pressed");
     for (var ss_index=0; ss_index< $scope.task.testCase.length; ss_index++){
       $scope.task.testCase[ss_index].output = "";
       $scope.task.testCase[ss_index].match = false;
     }
     $scope.task.ps = "ps0";
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



app.controller('consentController', ['$scope','$http', '$timeout', '$location', '$routeParams', consentController]);

app.controller('part1Controller', ['$scope','$http', '$timeout', '$location','$routeParams', part1Controller]);

app.controller('part2Controller', ['$scope','$http', '$timeout', '$location', '$routeParams',  part2Controller]);

app.controller('part3Controller', ['$scope','$http', '$timeout', '$location', '$routeParams','$interval',  part3Controller]);

app.controller('taskController', ['$scope','$http', '$timeout', '$location', '$routeParams',  taskController]);



window.onbeforeunload = function(event) {

  // console.log(participant_data);
  // $http.post('/slowsearch', participant_data).success(function(response) {
  //   console.log(response);
  // });
  event.returnValue = "Do you really want to leave?";
};
