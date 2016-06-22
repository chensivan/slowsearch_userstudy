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
      "question": " Consider the following code snippet :\n var book = {\n\"main title\": \"JavaScript\",\n \'sub-title': \"The Definitive Guide\",\n\"for\": \"all audiences\",\n author: { \nfirstname: \"David\", \nsurname: \"Flanagan\" }};\nIn the above snippet, firstname and surname are",
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

      console.log(data);
    });

    $scope.showConsent = false;
    $scope.disableSubmit = true;
    $scope.showQuiz = !$scope.showQuiz;
  };

  $scope.run = function(a, b) {
//    alert(b)
    //debugger;

    console.log = function(message) {
      $scope.consoleOutput = message;

    };
    console.log($scope.consoleOutput);


    if($scope.idCounter==4){
      var now = new Date();
      var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
      var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
      var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

      b =  days[now.getDay()] + ", " +
               months[now.getMonth()] + " " +
               date + ", 2016";
    }


    if ($scope.consoleOutput == b) {
      $scope.disableNext = false;
      $scope.msg = "You have the right output! Press the next button to move on!";
    }
    else {
      $scope.msg = "Your output is wrong.";
    }
  };

  $scope.answers = [{
                      'answer': ["You can go to this link to find what you need: http://www.w3schools.com/jsref/jsref_obj_regexp.asp",
                                  'This task is about asynchronous method in javascript. You need to understand that within the synchronous function, the asynchronous function. "No matter what button the user clicks the number 5 will always be logged to the console. This is because, at the point that the onclick method is invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5.\n" ',
                                  "Because of the scope of i when the anonymous function is called the loop is over and iis in it's final value(-1). ",
                                  "You need to split the string to an array and combine regex and ",
                                  "You can do bubble sorting by the property name. \n\n",
                                  "\n\nAnd to id, you use '#' sign to select the element.",
                                  "You need to make sure that you match the right element from each property. To do that you can track the index."],
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
                      'answer': ["you could use .match(), .replace() function, /\s+/g expression, /[0-9]/g, and /[.?]/g expression",
                                 "The key to making this work is to capture the value of i at each pass through the for loop by passing it into a newly created function object.  You should consider to use closure function to scope the adding click even listener.",
                                 "To solve this you can isolate a local scope with another anonymous function where you can redefine private variable i like this:\n\ncountdown function:\n    for loop:\n        using a closure to close the setTimeout function\n            setTimeout\n       closing the closure function, and call the iteration\n    end\nend\n\ncountdown(5);",
                                 "You can do the following:\n\nfunction:\n   split the string using .split(/(\d{1,2})\/(\d{1,2})\/(\d{6})/);\nreturn the results",
                                 "Here is the algorithm\n\ninput: array, property\n\nfunction:\n   for i=1:length of the array\n      if array[i-1]>array[i] swap these two\n   end\nend",
                                 "To select title, you use: $('#title')\n\nTo select the first input, you use: $('#myTextField')\n\n2nd input, you use: $('#byBtn')\n\nTo change value, you use: .val(' ')\n\n",
                                 "Since you know the format and the key, you can use:\n\nfor(key in obj)\n   temp[key] = obj[key][i];\n   push temp to final array\n   i++\nend"],
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
                      'answer': ["var task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n //the correct answer is 'IhavedollarsinmypocketCouldyousellmethat'\n   \nvar task1 = task1.replace(/\s+/g,'');\nvar task1 = task1.replace(/[0-9]/g,'');\nvar task1 = task1.replace(/[.?]/g,'');\n\nconsole.log(task1);",
                                 "Here are three possible ways to accomplish this:\n\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', (function(i) {\n    return function() { console.log(i); };\n  })(i));\n  document.body.appendChild(btn);\n}\n\n//check case, the correct value is 4",
                                 "function countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        (function(i) {\n            setTimeout(function () {\n                alert(num - i);\n            }, i * 1000);\n        })(i);\n    }\n}\n\ncountdown(5);\n\n",
                                 "function formatDate(userDate) {\n // format from M/D/YYYY to YYYYMMDD\n var dateParts = userDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{6})/);\n return dateParts[3] + dateParts[1] + dateParts[2];\n}\n\nconsole.log(formatDate(\"12/31/2016\"));",
                                 "var arrayOfPeople = [\n{name:\"Rick\", age: 30, place: 2},\n{name:\"Alan\", age: 25, place: 1},\n{name:\"Joe\", age: 40, place: 4},\n{name:\"Dave\", age: 35, place:3}\n];\n\n\nfunction bubbleSort(a, par)\n{\n    var swapped;\n    do {\n        swapped = false;\n        for (var i=0; i < a.length-1; i++) {\n            if (a[i][par] > a[i+1][par]) {\n                var temp = a[i];\n                a[i] = a[i+1];\n                a[i+1] = temp;\n                swapped = true;\n            }\n        }\n    } while (swapped);\n}\n\n\nbubbleSort(arrayOfPeople, 'place');\n\nfor (i = 0; i < arrayOfPeople.length; i++) {\n   console.log(arrayOfPeople[i]); }",
                                 "\n\n<script>\n$('document').ready(function(){\n  \n$('#byBtn').click(function(){\nvar text = $('#myTextField').val();\n  if(text.length==0)\n      console.log('Write Some real Text please.');\nelse{\n$('#title').text(text);\n   }\n    \n});\n</script>\n\n\n<h1 id=\"title\">Javascript example no.2</h1>\n<input type=\"text\" id=\"myTextField\"/>\n<input type=\"submit\" id=\"byBtn\" value=\"Change\" onclick=\"change()\"/>\n\n",
                                 "var array = [];\nvar obj = {};\nvar i = 0;\nfor (key in object){\nobj['firstName'] = object['firstName'][i];\nobj['lastName'] = object['lastName'][i];\nobj['number'] = object['number'][i];\narray.push(obj)\ni++;\n}\n"],
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
                    }];

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


    if($scope.idCounter==7){//if all tasks are complete
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


//subjective tasks
  $scope.taskAs = [{
                      id: '1',
                      name: 'Task 1 (a)',
                      content: '',
                      description: "You are given a variable that contains a text. \n\nvar task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n\nRemove all the digits, whitespace character and punctuations, and print the result in console."
                    },{
                      id: '2',
                      name: 'Task 2 (a)',
                      content: '',
                      description: "Consider the following code snippet. for (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button')\n  btn.setAttribute('id',i);\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ \n      console.log(i); \n  });\n  document.body.appendChild(btn);\n}\n \nExplain what will the code print out when clicking button 4 and why? Can you rewrite it so that it does what you think it should do?\n"
                    },{
                      id: '3',
                      name: 'Task 3(a)',
                      content: '',
                      description: 'Given the following javascript code:\n\nfunction countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        setTimeout(function () {\n            alert(num - i);\n        }, i * 1000);\n    }\n}\n\ncountdown(5);\nThe desired result is a countdown from 5 to 0 using alert messages. Explain why the code only alerts -1, then fix the code so it works as expected.\n\n'
                    },{
                      id: '4',
                      name: 'Task 4 (a)',
                      content: '',
                      description: 'Write Javascript code that converts a date formatted as M/D/YYYY to a format as YYYYMMD string.\n\nFor example, it should convert user entered date "12/31/2014" to "20141231". \n\nfunction formatDate(userDate) {\n  // format from M/D/YYYY to YYYYMMDD\n}\n\nconsole.log(formatDate("12/31/2014"));'
                    },{
                      id: '5',
                      name: 'Task 5 (a)',
                      content: '',
                      description: 'Please write a function to sort an array of objects by one of their properties. Each object may have different property and the property could be string or number. \n\nFor example, given the following array, \n \nvar arrayOfPeople = [\n{name:"Rick", age: 30, place: 2},\n{name:"Alan", age: 25, place: 1},\n{name:"Joe", age: 40, place: 4},\n{name:"Dave", age: 35, place:3}\n];\n\nIf sorting by place, this function should print out:\n\n[\n{name:"Alan", age: 25, place: 1},\n{name:"Rick", age: 30, place: 2},\n{name:"Dave", age: 35, place:3},\n{name:"Joe", age: 40, place: 4}\n];'
                    },{
                      id: '6',
                      name: 'Task 6 (a)',
                      content: '',
                      description: 'Rewrite the following code using jQuery library\n\n<script>\nfunction change(){\n    \n   var myNewTitle = document.getElementById("myTextField").value;\n   if( myNewTitle.length==0 ){\n       console.log("Write Some real Text please.");\n   return;\n   }\n   \n   var title = document.getElementById("title");\n   title.innerHTML = myNewTitle;\n    \n}\n</script>\n\n\n<h1 id="title">Javascript example no.2</h1>\n<input type="text" id="myTextField"/>\n<input type="submit" id="byBtn" value="Change" onclick="change()"/>\n\n'
                    },{
                      id: '7',
                      name: 'Task 7 (a)',
                      content: '',
                      description: 'Giving the following JSON, try to rewrite it to an array format with each element having the pattern of {"firstName": "Akira", "lastName":"Laine", "number":"0543236543"}.\n\nvar contacts = {\n    "firstName": ["Akira", "Harry","Sherlock","Kristian"],\n    "lastName": ["Laine","Potter", "Holmes","Vos"],\n    "number": ["0543236543","0994372684","0487345643","unknown"]\n    };\n\n'
                    }
]


//objective tasks
$scope.tasks = [{
  id: '1',
  name: 'Task 1 (b)',
  content: "var task1 = 'I have $300 in my left pocket and $200 in my right pocket that can buy 2 tickets.'; \n//The correct answer is console.log(1). You probably need to press run button twice. ",
  description: "You are given a variable that contains a text. \n\nvar task1 = 'I have $300 in my left pocket and $200 in my right pocket that can buy 2 tickets.'\n\nWrite a function to replace dollar sign '$' in front of the numbers with the word 'dollars' after them. (e.g. $300 -> 300 dollars) Your answer should like this 'I have 300 dollars in my left pocket and 200 dollars in my right pocket that can buy 2 tickets.'",
  correctOutput: 'I have 300 dollars in my left pocket and 200 dollars in my right pocket that can buy 2 tickets.'

}, {
  id: '2',
  name: 'Task 2 (b)',
  content: "var a = [];\nfor( var j = 0; j < 5; j++ )\n{\n   setTimeout ( function () {\n       a.push(j)\n       console.log(a);\n   }, j);\n}",
  description: "Explain what will the following code print out and why? Can you rewrite it so that it does what you think it should do?\n\n",
  correctOutput: '[0,1,2,3,4]'
},{
  id: '3',
  name: 'Task 3 (b)',
  content: "var a = [],\n    funcs = [];\nfor (var i = 0; i < 3; i++) {          // let's create 3 functions\n    funcs[i] = function() {            // and store them in funcs\n        a.push(i); // each should log its value.\n    };\n}\nfor (var j = 0; j < 3; j++) {\n    funcs[j]();                        // and now let\'s run each one to see\n}\n\nconsole.log(a)\n\n",
  description: "The desire output is 1,2,3. Please correct this code to achieve the desired output.",
  correctOutput: '[1,2,3]'
},{
  id: '4',
  name: 'Task 4 (b)',
  content: "function dateoutput(){\nvar today;\n//you code\n\nconsole.log(today)  //should be a string\n}\n\n",
  description: "Write Javascript code to display the current date in this format: Tuesday, June 21, 2016.",
  correctOutput: ''
},{
  id: '5',
  name: 'Task 5 (b)',
  content: 'var array2d = [\n    [1, "Cathy"]\n    [3, "Boa"],\n    [10, "Drew"],\n    [9, "Drew"],\n    [0, "Bob"],\n    ];',
  description: 'Given a 2D array, please sort them by the 2nd element (i.e. names) and then 1st element (i.e. numbers). \n\n\nYou output should like this:\n\n[\n    [3, "Boa"],\n    [0, "Bob"],\n    [1, "Cathy"],\n    [9, "Drew"],\n    [10, "Drew"]\n    ];',
  correctOutput: '[[3, "Boa"],[0, "Bob"],[1, "Cathy"],[9, "Drew"],[10, "Drew"]]'
},{
  id: '6',
  name: 'Task 6 (b)',
  content: "var obj = {\n\n'current_job_title': [{'engineer': 'front-end'}, {'staff': 'hr'}, {'ceo': 'personal-startup'}],\n'previous_company': { 'time': 1996, 'company_name':  'Facebook' },\n'name' : 'sam',\n'title': 'student'\n\n};",
  description: "Given an objects. Please write a function to count the number of all object property in it. ",
  correctOutput: '9'
},{
  id: '7',
  name: 'Task 7 (b)',
  content: ' \n// test cases \n\n// lookUpNumberByProperty("Holmes", "lastName")\n//  returns : ["0487345643"]\n\n\n// lookUpNumberByProperty("Harry", "firstName")\n// ["0994372684", "unknown"]\n\n// lookUpNumberByProperty("222", "lastName")\n// []\n\nvar contacts = [\n    {\n        "firstName": "Akira",\n        "lastName": "Laine",\n        "number": "0543236543",\n    },\n    {\n        "firstName": "Harry",\n        "lastName": "Potter",\n        "number": "0994372684",\n    },\n    {\n        "firstName": "Sherlock",\n        "lastName": "Holmes",\n        "number": "0487345643",\n    },\n    {\n        "firstName": "Kristian",\n        "lastName": "Vos",\n        "number": "unknown",\n    }\n];\n\nfunction lookUpNumberByLastName(lastName){\n  // Only change code below this line\n  for (var i = 0; i < contacts.length; i++) {\n    if (contacts[i].lastName === lastName){\n        return contacts[i].number;\n     }\n  }\n}\n\nconsole.log ("Akira Laine\' phone number is "+ lookUpNumberByLastName("Laine") \n\n//test case\nconsole.log (lookUpNumberByProperty("Laine", "lastName")););',
  description: "The following code allows you to search the phone number for a given last name in the database. Change the code so that it will look up a phone number by any property (not just last name) that is passed and refactor the example.",
  correctOutput: '543236543'
}

];



}
