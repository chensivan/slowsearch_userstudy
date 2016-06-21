var myApp = angular.module('myapp', ['rzModule', 'ui.ace','ui.bootstrap']);
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

    $scope.buttonHovered = false;

  //assessment
  $scope.color = {
    name: 'blue'
  };
  $scope.specialValue = {
    "id": "12345",
    "value": "green"
  };


    $scope.disabled = function() {
  if($scope.addInviteesDisabled) { return false;}
}

  $scope.isClicked = function() {
    $scope.disableSubmit = false;
  };

    $scope.isToggled = function() {
    $scope.disableSubmit = !$scope.disableSubmit;
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
      "question": " <script type=\"text/javascript\">\n x=4+\"4\";\ndocument.write(x);\n</script>",
      "options": ["44", "8", "4", "Error output"]
    },
     {
      "question": " <script type=\"text/javascript\">\nvar s = \"9123456 or 80000?\";\nvar pattern = /\d{4}/;\nvar output = s.match(pattern);\ndocument.write(output);\n</script>",
      "options": ["9123", "91234", "80000", "None of the above"]
    },
     {
      "question": " Consider the following code snippet\nfunction printprops(o) \n{\n    for(var p in o)\n      console.log(p + \": \" + o[p] + \"\n\");\n}\n What will the above code snippet result ?",
      "options": ["Prints the contents of each property of o", "Returns undefined", "Both a and b", "None of the mentioned"]
    },
     {
      "question": " What is the code to print hello one second from now?",
      "options": ["setTimeout(function() { console.log(\"Hello World\"); }, 1000);", "setTimeout(function() { 1000, console.log(\"Hello World\"); });", "setTimeout(function(1000) { console.log(\"Hello World\"); });", "setTimeout(function() { console.log(\"Hello World\"); });"]
    },
     {
      "question": " Which of the following is an equivalent replacement of $(document).ready(f)?",
      "options": ["jQuery(f)", "$(f)", "#(f)", "None of the mentioned"]
    },
     {
      "question": " Which of the following is used for parsing JSON text?",
      "options": ["jQuery.each()", "jQuery.parseJSON()", "jQuery.noConflict()", "None of the mentioned"]
    },
     {
      "question": " Consider the following code snippet :\n var book = {\n\"main title\": \"JavaScript\",\n 'sub-title': \"The Definitive Guide\",\n\"for\": \"all audiences\",\n author: { \nfirstname: \"David\", \nsurname: \"Flanagan\" }};\nIn the above snippet, firstname and surname are",
      "options": ["properties", " property values", "property names", "objects"]
    },
     {
      "question": " Consider the following code snippet\n const pi=3.14;\nvar pi=4;\nconsole.log(pi);\nWhat will be the output for the above code snippet?",
      "options": ["This will flash an error", "Prints 4", "Prints 3.14", "Ambiguity"]
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
//    alert(b)
    //debugger;
    eval(a)
    console.log = function(message) {
      $scope.consoleOutput = message;

    };
      console.log($scope.consoleOutput);
      
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


        $scope.disableSubmit = !$scope.disableSubmit;


  };

   $scope.aceLoaded = function(_editor){
       _editor.setTheme("ace/theme/twilight");
       _editor.getSession().setMode("ace/mode/javascript");
   }

  $scope.aceOption = {

    theme: 'tomorrow_night_eighties',
    mode: 'html',
    useWrapMode : true

  };

  $scope.nextTask = function() {

    var timestampe = new Date();
    var task_sub_index = 'task'+$scope.idCounter+'b';

    participant_data.task_answer[task_sub_index] = $scope.tasks[$scope.idCounter-1].content;
    participant_data.task_answer[task_sub_index+"_finish_time"] = timestampe.getTime();


    if($scope.idCounter==2){//if all tasks are complete
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

      $scope.disableNext = !$scope.disableNext;

  };

    //objective tasks
  $scope.tasks = [{
    id: '1',
    name: 'Task 1 (b)',
    content: "var task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n//The correct answer is console.log(1). You probably need to press run button twice. ",
    description: 'You are given a variable that contains a text. \nvar task1 = \'I have $300 in my left pocket and $200 in my right pocket that can buy 2 tickets, Could you see me that?why?\'\nWrite a function to replace dollar sign \'$\' in front of the numbers with the word \'dollars\' after them. Also, add space after question mark \'?\'. You answer should like this \'I have 300 dollars in my left pocket and 200 dollars in my right pocket that can buy 2 tickets, Could you see me that? why? \'',
    correctOutput: '1'

  }, {
    id: '2',
    name: 'Task 2 (b)',
    content: "for (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\n\n//The correct answer is console.log(2). You probably need to press run button twice. ",
    description: "Consider the following code snippet:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\n(a)What gets logged to the console when the user clicks on “Button 4” and why? ",
    correctOutput: '2'
  }
                  , {
    id: '3',
    name: 'Task 3 (b)',
    content: "for (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n\n\n//The correct answer is console.log(2). You probably need to press run button twice. ",
    description: "Consider the following code snippet:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ console.log(i); });\n  document.body.appendChild(btn);\n}\n \n(b)Provide one or more alternate implementations that will work as expected.",
    correctOutput: '2'
  }, {
    id: '4',
    name: 'Task 4 (b)',
    content: "var funcs = [];\nfor (var i = 0; i < 3; i++) {          // let's create 3 functions\n    funcs[i] = function() {            // and store them in funcs\n        console.log(\"My value: \" + i); // each should log its value.\n    };\n}\nfor (var j = 0; j < 3; j++) {\n    funcs[j]();                        // and now let's run each one to see\n} ",
    description: "var funcs = [];\nfor (var i = 0; i < 3; i++) {          // let's create 3 functions\n    funcs[i] = function() {            // and store them in funcs\n        console.log(\"My value: \" + i); // each should log its value.\n    };\n}\nfor (var j = 0; j < 3; j++) {\n    funcs[j]();                        // and now let's run each one to see\n}\nThe desire output is 1,2,3. Please correct this code to achieve the desired output.",
    correctOutput: '1,2,3'
  }, {
    id: '5',
    name: 'Task 5 (b)',
    content: "<div id=\"foo\">\n    <input type=\"text\">\n    <input type=\"button\" value=\"b\">\n    <input type=\"button\" value=\"c\">  \n</div>\n\n<script>\n\n$(document).ready(function(){       \n \n   \n});\n</script> ",
    description: "Finish the following code so that when clicking the 2nd input button (with value='c'), it will pop up an alert to show the output in the 1st text input tag. Please do no change the current html code but only javascript below.",
    correctOutput: '2'
  }, {
    id: '6',
    name: 'Task 6 (b)',
    content: "// test cases \n\n// lookUpNumberByProperty(\"Holmes\", \"lastName\")\n//  returns :\n[\"0487345643\"]\n\n\n// lookUpNumberByProperty(\"Harry\", \"firstName\")\n// [\"0994372684\", \"unknown\"]\n\n// lookUpNumberByProperty(\"222\", \"lastName\")\n// []\n\nvar contacts = [\n    {\n        \"firstName\": \"Akira\",\n        \"lastName\": \"Laine\",\n        \"number\": \"0543236543\",\n    },\n    {\n        \"firstName\": \"Harry\",\n        \"lastName\": \"Potter\",\n        \"number\":\n\"0994372684\",\n    },\n    {\n        \"firstName\": \"Sherlock\",\n        \"lastName\": \"Holmes\",\n        \"number\": \"0487345643\",\n    },\n    {\n        \"firstName\": \"Kristian\",\n        \"lastName\": \"Vos\",\n        \"number\": \"unknown\",\n    }\n];\nfunction lookUpNumberByLastName(lastName){\n  // Only change code below this line\n  for (var i = 0; i < contacts.length; i++) {\n    if (contacts[i].lastName === lastName){\n        return contacts[i].number;\n     }\n  }\n}\n\nconsole.log (\"Akira Laine\' phone number is \"+ lookUpNumberByLastName(\"Laine\")); ",
    description: "The following code allows you to search the phone number for a given last name in the database. Change the code so that it will look up a phone number by any property (not just last name) that is passed and refactor the example. ",
    correctOutput: '2'
  }
                 
                 ];
//subjective tasks
  $scope.taskAs = [{
    id: '1',
    name: 'Task 1 (a)',
    content: 'task 1 content ',
    description: 'You are given a variable that contains a text. \n var task1 = \'I have 300 dollars in my pocket. Could you sell me that?\'; \n Remove all the digits, whitespace character and punctuations, and print the result in console.',

  }, {
    id: '2',
    name: 'Task 2 (a)',
    content: 'task 2 content',
    description: "Given the following javascript code:\nfunction countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        setTimeout(function () {\n            alert(num - i);\n        }, i * 1000);\n    }\n}\ncountdown(5);\nThe desired result is a countdown from 5 to 0 using alert messages. Explain why the code only alerts -1, then fix the code so it works as expected."

  }
//    , {
//    id: '3',
//    name: 'Task 3 (a)',
//    content: 'task 3 content',
//    description: "Rewrite the following code using jQuery library\n<script>\nfunction change(){\n       var myNewTitle = document.getElementById('myTextField').value;\n   if( myNewTitle.length==0 ){\n       alert('Write Some real Text please.');\n   return;\n   }\n      var title = document.getElementById('title');\n   title.innerHTML = myNewTitle;\n    }\n</script>\n<h1 id=\"title\">Javascript example no.2</h1>\n<input type=\"text\" id=\"myTextField\"/>\n<input type=\"submit\" id=\"byBtn\" value=\"Change\" onclick=\"change()\"/>
//
//"
//
//  }, {
//    id: '4',
//    name: 'Task 4 (a)',
//    content: 'task 4 content',
//    description: "Giving the following array, try to rewrite it to a JSON format with each element having the pattern of {\"firstName\": \"Akira\", \"lastName\":\"Laine\", \"number\":\"0543236543\"}.\nvar contacts = {\n    \"firstName\": [\"Akira\", \"Harry\",\"Sherlock\",\"Kristian\"],\n    \"lastName\": [\"Laine\",\"Potter\", \"Holmes\",\"Vos\"],\n    \"number\":\n[\"0543236543\",\"0994372684\",\"0487345643\",\"unknown\"]\n    };"
//
//  }, {
//    id: '5',
//    name: 'Task 5 (a)',
//    content: 'task 5 content',
//    description: "Explain what is the output of the following code and why:\n  var foo = {\n    bar: function() { return this.baz; },\n    baz: 1\n  };\n  (function(){\n    return typeof arguments[0]();\n  })(foo.bar);"
//
//  }
                  
                  
]



}
