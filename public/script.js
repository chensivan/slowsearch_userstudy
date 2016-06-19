var myApp = angular.module('myapp', ['rzModule', 'ui.ace']);
var id = Math.random().toString(36).substring(7);
var participant_data = {
                          _id:  id,
                          quiz: {
                            quiz_answer: []
                          },
                          task_answer: {}
                        };

myApp.controller('TestController', ['$scope','$http', TestController]);

function TestController($scope, $http, $timeout) {


  $scope.showTask = true;
  $scope.showQuiz = false;

  $scope.showWrapper = false;
  $scope.showConsent = true;
  $scope.idCounter = 1;
  $scope.buttonText = 'Hint Lv1';
  $scope.hint = "";
  $scope.disableSubmit = true;
  $scope.disableNext = true;
  $scope.counter = 0;

  //assessment
  $scope.color = {
    name: 'blue'
  };
  $scope.specialValue = {
    "id": "12345",
    "value": "green"
  };


  $scope.isClicked = function() {
    $scope.disableSubmit = false;
  };

  $scope.quizAnswer = {
    question: []
  };

  $scope.quiz = [
    {
      "question": " (function(){  \n  return typeof arguments; \n })();",
      "options": ["\"object\"", "\"array\"", "\"arguments\"", "\"undefined\""]
    }, {
      "question": " var f = function g(){ return 23; };   \n typeof g();",
      "options": ["\"number\"", "\"undefined\"", "\"function\"", "Error"]
    },
    {
      "question": " (function(x){\n   delete x;\n   return x;\n })(1);",
      "options": ["1", "null", "undefined", "Error"]
    }, {
      "question": " var y = 1, x = y = typeof x; \n x;",
      "options": ["1", "\"number\"", "undefined", "\"undefined\""]
    }, {
      "question": " (function f(f){\n return typeof f();\n })(function(){ return 1; });",
      "options": ["\"number\"", "\"undefined\"", "\"function\"", "Error"]
    }
    , {
      "question": " var foo = {\n  bar: function() { return this.baz; },\n  baz: 1\n };\n (function(){\n  return typeof arguments[0](); \n })(foo.bar); ",
      "options": ["\"undefined\"", "\"object\"", "\"number\"", "\"function\""]
    }, {
      "question": " var foo = {\n  bar: function(){ return this.baz; },\n  baz: 1\n }\n typeof (f = foo.bar)();",
      "options": ["\"undefined\"", "\"object\"", "\"number\"", "\"function\""]
    }, {
      "question": " var f = (function f(){ return \"1\"; }, function g(){ return 2; })();\n typeof f;",
      "options": ["\"string\"", "\"number\"", "\"function\"", "\"undefined\""]
    }
    , {
      "question": " var x = 1;\n if (function f(){}) {\n  x += typeof f;\n }\n x;",
      "options": ["1", "\"1function\"", "\"1undefined\"", "NaN"]
    }, {
      "question": " var x = [typeof x, typeof y][1];\n typeof typeof x;",
      "options": ["\"number\"", "\"string\"", "\"undefined\"", "\"object\""]
    }, {
      "question": " (function(foo){\n  return typeof foo.bar;\n })({ foo: { bar: 1 } });",
      "options": ["\"undefined\"", "\"object\"", "\"number\"", "Error"]
    }
    , {
      "question": " (function f(){\n  function f(){ return 1; }\n  return f();\n  function f(){ return 2; }\n })();",
      "options": ["1", "2", "Error", "undefined"]
    }, {
      "question": " function f(){ return f; }\n new f() instanceof f;",
      "options": ["true", "false"]
    },
    {
      "question": " with (function(x, undefined){}) length;",
      "options": ["1", "2", "undefined", "Error"]
    }
  ]

  //load quizzes
  // $scope.quiz = $http.get('/data/quiz.json').success(function(response){
  //   return response
  // });

  $scope.slider = { //requires angular-bootstrap to display tooltips
    value: 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      },
      translate: function(value) {
        return value;
      }
    }
  };

  $scope.submitConsent = function() {

    // debugger;
    $http.get('http://slow-server-test.dataprocessingclub.org/c/1/task?uid=123&no=3').success(function(data, status, headers, config){
      debugger;
      console.log(data);
    });

    $scope.showConsent = false;
    $scope.disableSubmit = true;
    $scope.showQuiz = !$scope.showQuiz;
  };

  $scope.run = function(a, b) {
    //alert(b
    debugger;
    eval(a)
    console.log = function(message) {
      $scope.consoleOutput = message;
    };
    if ($scope.consoleOutput == b) {
      $scope.disableNext = false;
      $scope.msg = "You have the right output! Press the next button to move on!";
    }
    else {
      $scope.msg = "Your output is wrong.";
    }
  };

  $scope.answers = [{
    'answer': ["You can go to this link to find what you need: \nw3schools.com/jsref", "level 1.2"],
    'value': 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      },
      translate: function(value) {
        return value;
      }
    }
  }, {
    'answer': ["You could use .match(), .replace() function. \nFor the expression, you can use /\s+/g expression, /[0-9]/g, and /[.?]/g expression", "No matter what button the user clicks the number 5 will always be logged to the console. This is because, at the point that the onclick method is invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5. (Bonus points for the interviewee if they know enough to talk about how execution contexts, variable objects, activation objects, and the internal “scope” property contribute to the closure behavior.)"],
    'value': 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      },
      translate: function(value) {
        return value;
      }
    }
  }, {
    'answer': ["var task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n //the correct answer is 'IhavedollarsinmypocketCouldyousellmethat'\n   \nvar task1 = task1.replace(/\s+/g,'');\nvar task1 = task1.replace(/[0-9]/g,'');\nvar task1 = task1.replace(/[.?]/g,'');\n\nconsole.log(task1);", "The key to making this work is to capture the value of i at each pass through the for loop by passing it into a newly created function object. Here are three possible ways to accomplish this:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', (function(i) {\n    return function() { console.log(i); };\n  })(i));\n  document.body.appendChild(btn);\n}"],
    'value': 5,
    options: {
      floor: 0,
      ceil: 10,
      showTicksValues: true,
      ticksValuesTooltip: function(v) {
        return 'Tooltip for ' + v;
      },
      translate: function(value) {
        return value;
      }
    }
  }]

  $scope.isClicked = function() {
    $scope.disableSubmit = false;
  }

  $scope.isClickedQuiz = function() {

    // $scope.keyArray.push(key);
    // if (ifContainsAll()) {
    //   alert(key);
    $scope.disableSubmit = false;
    //}
  }

  $scope.submitQuiz = function() {
    // $http.post('/slowsearch', $scope.quizAnswer).success(function(response) {
    //   console.log(response);
    // });
    var timestampe = new Date();
    participant_data.quiz.quiz_answer = $scope.quizAnswer;
    participant_data.quiz['timestampe'] = timestampe.getTime();
    $scope.showQuiz = !$scope.showQuiz;
    $scope.showWrapper = true;

    $scope.showQuiz = false;
    $scope.disableSubmit = true;
  }


    var taskACurrentId = 1;
    $scope.submit = function() {


    var taskSubAnswer = [$scope.answers[0].value, $scope.answers[1].value, $scope.answers[2].value];

    var timestampe = new Date();
    var task_sub_index = 'task'+$scope.idCounter+'a';

    participant_data.task_answer[task_sub_index] = [];
    participant_data.task_answer[task_sub_index] = taskSubAnswer;
    participant_data.task_answer[task_sub_index+"_finish_time"] = timestampe.getTime();

    //
    // $http.post('/slowsearch', participant_data).success(function(response) {
    //   console.log(response);
    // });

    // $http.put('/slowsearch/'+$scope.taskSubAnswer._id, $scope.taskSubAnswer.answers).success(function(response) {
    //   console.log(response);
    // });
      if(taskACurrentId==$scope.taskAs.length){

          $scope.showTask = !$scope.showTask;
          $scope.idCounter =1;
      }
      else{
          taskACurrentId++;
          $scope.idCounter++;
      }


  };

   $scope.aceLoaded = function(_editor){
       _editor.setTheme("ace/theme/twilight");
       _editor.getSession().setMode("ace/mode/javascript");
//    useWrapMode : true,
//      showGutter: false,
//      theme:'twilight',
//      mode: 'javascript',
   }

  $scope.aceOption = {

    theme: 'tomorrow_night_eighties',
    mode: 'html',
    useWrapMode : true

  };

  $scope.nextTask = function() {

    debugger;
    var timestampe = new Date();
    var task_sub_index = 'task'+$scope.idCounter+'b';

    participant_data.task_answer[task_sub_index] = $scope.tasks[$scope.idCounter-1].content;
    participant_data.task_answer[task_sub_index+"_finish_time"] = timestampe.getTime();


    if($scope.idCounter==2){
      $scope.showWrapper = !$scope.showWrapper;
      $scope.finalpage = !$scope.finalpage;
      $http.post('/slowsearch', participant_data).success(function(response) {
        console.log(response);
      });
    }

    $scope.idCounter++;
    //$scope.showTask = !$scope.showTask;
    $scope.disableSubmit = true;
    $scope.msg="";

  };

  $scope.tasks = [{
    id: '1',
    name: 'Task 1 (b)',
    content: "var task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n//The correct answer is console.log(1). You probably need to press run button twice. ",
    description: 'You are given a variable that contains a text. \n var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\'; \n Remove all the digits, whitespace character and punctuations, and print the result in console.',
    correctOutput: '1'

  }, {
    id: '2',
    name: 'Task 2 (b)',
    content: "for (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\n\n//The correct answer is console.log(2). You probably need to press run button twice. ",
    description: "Consider the following code snippet:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\nWhat gets logged to the console when the user clicks on “Button 4” and why? \nProvide one or more alternate implementations that will work as expected.",
    correctOutput: '2'
  }];

  $scope.taskAs = [{
    id: '1',
    name: 'Task 1 (a)',
    content: 'task 1 content ',
    description: 'You are given a variable that contains a text. \n var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\'; \n Remove all the digits, whitespace character and punctuations, and print the result in console.',

  }, {
    id: '2',
    name: 'Task 2 (a)',
    content: 'task 2 content',
    description: "Consider the following code snippet:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\nWhat gets logged to the console when the user clicks on “Button 4” and why? \nProvide one or more alternate implementations that will work as expected."

  }]



}
