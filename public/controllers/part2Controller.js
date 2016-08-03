angular.module('app')
  .controller('part2Controller', part2Controller);

part2Controller.$inject = ['$timeout', '$scope', '$http', '$location','$routeParams'];



function part2Controller($scope,$http, $timeout, $location, $routeParams){
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

}
