var myApp = angular.module('myapp', ['rzModule', 'ui.ace']);
var id = Math.random().toString(36).substring(7);
myApp.controller('TestController', ['$scope','$http', TestController]);

function TestController($scope, $http, $timeout) {


  $scope.showTask = true;
  $scope.showQuiz = true;
  $scope.idCounter = 1;
  $scope.buttonText = 'Hint Lv1';
  $scope.hint = "";
  $scope.disableSubmit = true;
  $scope.counter = 0;

  $scope.quizAnswer = {
    _id: id,
    question: []
  };

  $scope.taskSubAnswer = {
    _id: id,
    answers: []
  };

  $scope.taskObjAnswer = {
    _id: id,
    answers: []
  }

  //assessment
  $scope.color = {
    name: 'blue'
  };
  $scope.specialValue = {
    "id": "12345",
    "value": "green"
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

  $scope.answers = [{
    'answer': "level 1",
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
    'answer': 'level 2',
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
    'answer': 'level 3',
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

  $scope.generateID = function(){

  }

  $scope.submitQuiz = function() {
    debugger;
    $http.post('/slowsearch', $scope.quizAnswer).success(function(response) {
      console.log(response);
    });
    $scope.showQuiz = false;
    $scope.disableSubmit = true;
  }

  $scope.submit = function() {
    debugger;
    $scope.showTask = !$scope.showTask;


  };

  $scope.aceLoaded = function(_editor){
    var _session = _editor.getSession();
    var _renderer = _editor.renderer;
    console.log("shit")
    // Options
    _editor.setReadOnly(false);
    _session.setUndoManager(new ace.UndoManager());
    _renderer.setShowGutter(true);
    _editor.setOption("maxlines",10);
  }

  $scope.aceOption = {

    theme: 'tomorrow_night_eighties',
    mode: 'html',
    useWrapMode : true

  };


  $scope.nextTask = function() {
    $scope.idCounter++;
    $scope.hint = "";
    $scope.buttonText = 'Hint Lv1';
    $scope.showTask = !$scope.showTask;
    $scope.disableSubmit = true;
  };

  $scope.tasks = [{
    id: '1',
    name: 'Task 1 (b)',
    content: 'task 1 content ',
    description: 'You are given a variable that contains a text. \n var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\'; \n Remove all the digits, whitespace character and punctuations, and print the result in console.',
    hintLv1: 'You can go to this link to find what you need: http://www.w3schools.com/jsref/jsref_obj_regexp.asp',
    hintLv2: 'you could use .match(), .replace() function, /\s+/g expression, /[0-9]/g, and /[.?]/g expression',
    hintLv3: 'var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\';\n', //missing something, fix later

  }, {
    id: '2',
    name: 'Task 2 (b)',
    content: 'task 2 content',
    description: 'Can you provide two asynchronous methods in javascript and write a working example',
    hintLv1: 'Synchronous method means the code will not execute the next method till this method is finished; whereas for asynchronous method, the next method will run no matter the status of this method',
    hintLv2: 'Ajax call is asynchronous, and a for loop is synchronous,',
    hintLv3: 'Explanation + running code',

  }]




  $scope.taskAs = [{
    id: '1',
    name: 'Task 1 (a)',
    content: 'task 1 content ',
    description: 'You are given a variable that contains a text. \n var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\'; \n Remove all the digits, whitespace character and punctuations, and print the result in console.',

  }, {
    id: '2',
    name: 'Task 2 (a)',
    content: 'task 2 content',
    description: 'Can you provide two asynchronous methods in javascript and write a working example',

  }]

  $scope.run = function(){
    alert("hi");
    $(function () {
    var val = _session.getValue();
  eval(val)
  console.log = function(message) {
    $('.output').text(message);
  }
    });
  }





}
