
(function () {
    'use strict';


angular.module('app')
  .controller('part3Controller', part3Controller);

part3Controller.$inject = ['$timeout', '$scope', '$http', '$location','$routeParams'];


function part3Controller($scope, $http, $timeout, $location, $routeParams){
  $scope.consoleOutput = '';
  $scope.lastOutput = null;
  $scope.idCounter = 1;
  $scope.showinstruction = true;

  if($routeParams.id){
    $scope.showinstruction = false;
    $scope.idCounter = parseInt($routeParams.id);
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

  $scope.tasks = part3_questions;
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
    for (var ss_index=0; ss_index< $scope.tasks[taskIndex].testCase.length; ss_index++){
      try {
        $scope.tasks[taskIndex].testCase[ss_index].output = eval("custom_console_log('test case ' + " + (ss_index+1)+ "+' running...', true);\n" + userContent + "\n" + $scope.tasks[taskIndex].testCase[ss_index].code );
        if($scope.tasks[taskIndex].testCase[ss_index].output === undefined){
          $scope.tasks[taskIndex].testCase[ss_index].output = $scope.lastOutput;
        }
      } catch (e) {
        $scope.tasks[taskIndex].testCase[ss_index].output = e.message;
      }
      // check the return value
      $scope.tasks[taskIndex].testCase[ss_index].match = JSON.stringify($scope.tasks[taskIndex].testCase[ss_index].answer) == JSON.stringify($scope.tasks[taskIndex].testCase[ss_index].output);
      aggResult = aggResult & $scope.tasks[taskIndex].testCase[ss_index].match
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
    if(timer){
        $timeout.cancel(timer);
    }
    $scope.level = -1;

    var timestamp = new Date();
    var task_sub_index = 'task'+$scope.idCounter+'b';

    $scope.participant_data.objectiveTask[$scope.idCounter].content = $scope.tasks[$scope.idCounter-1].content;
    $scope.participant_data.objectiveTask[$scope.idCounter].finishTime = timestamp.getTime();

    if($scope.idCounter==7){//if all tasks are complete
     window.onbeforeunload = null;
     $http.post('/slowsearch', $scope.participant_data).success(function(response) {
       alert("Thank you for your particiaption!");
     });
    }

    $scope.idCounter++;

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


})();
