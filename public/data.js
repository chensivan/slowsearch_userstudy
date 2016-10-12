

part1_quiz = [
  {
    "question": "What is the result of the following script?",
    "code": "x=4+\"4\";\nconsole.log(x)",
    "options": ["44",
                "8",
                "4",
                "Error output"]
  },
   {
     "question": "What is the output from the following script?",
    "code": "var s = \"9123456 or 80000?\";\nvar pattern = /\d{4}/;\nvar output = s.match(pattern);\nconsole.log(output);",
    "options": ["9123",
                "91234",
                "80000",
                "None of the above"]
  },
   {
     "question": "What is will be shown in the console with the following function?",
    "code": "function printprops(o){\n    for(var p in o){\n      console.log(p + \": \" + o[p] + \" \");\n    }\n}",
    "options": ["Prints the contents of each property of o",
                "Returns undefined",
                "Both a and b",
                "None of the above"]
  },
   {
    "question": "Which of the following will print \'Hello World\' in the console after a one second delay?",
    "options": ["setTimeout(function() { console.log(\"Hello World\"); }, 1000);",
                "setTimeout(function() { 1000, console.log(\"Hello World\"); });",
                "setTimeout(function(1000) { console.log(\"Hello World\"); });",
                "setTimeout(function() { console.log(\"Hello World\"); });"]
  },
  {
    "question": "Which of the following is an equivalent replacement of $(document).ready(f)?",
    "options": ["jQuery(f)",
                "$(f)",
                "#(f)",
                "None of the above"]
  },
   {
    "question": "Which of the following functions will convert text in the JavaScript format to a JavaScript object",
    "options": ["jQuery.each()",
                "jQuery.parseJSON()",
                "jQuery.noConflict()",
                "None of the above"]
  },
   {
    "question": "In the following block of code, what are 'firstname' and 'surname' called?",
    "code":"var book = {\n\"main title\": \"JavaScript\",\n\"sub-title\": \"The Definitive Guide\",\n\"for\": \"all audiences\",\n\"author\": { \n   firstname: \"David\", \n   surname: \"Flanagan\" \n}};\n",
    "options": ["properties",
                "property values",
                "property names",
                "objects"]
  },
   {
     "question": "What is the console output of the following code block?",
     "code": "const pi=3.14;\nvar pi=4;\nconsole.log(pi);\n",
    "options": ["This will flash an error",
                "Prints 4",
                "Prints 3.14",
                "Ambiguity"]
  },
  {
    "question": "The following code returns",
    "code":"(function(){  \n  return typeof arguments; \n})();",
    "options": ["\"object\"",
                "\"array\"",
                "\"arguments\"",
                "\"undefined\""]
  }, {
    "question": "What is the console output of the following snippet?",
    "code":"var f = function g(){ return 23; };   \nconsole.log(typeof g());",
    "options": ["\"number\"",
                "\"undefined\"",
                "\"function\"",
                "Error"]
  }

];
var defaultValue = 0;

part2_questions = [
  {
    id: '1',
    name: 'Task 1 (a)',
    content: '',
    description: "Write a function that uses 'switch' and 'do/while' (but no 'if/else' statement) in Javascript to loop through an array, and find if the 0th and the 2nd element in the array are string 'hello'. Return a boolean value.\n\nFor example, if the array is ['hello', '1', 'hello'], then return true.",
    answers:[
      {text:"General syntax for these methods are:\n\nswitch(expression) {\n    case n:\n        code block\n        break;\n    case n:\n        code block\n        break;\n    default:\n        default code block\n}\n\ndo {\n    code block to be executed\n}\nwhile (condition);", value:defaultValue,  expectedTime : 0},
      {text:"You need to have two conditions in each case, one to check the element value, and the other to check the index value. \n\nswitch(always running){\n  case (condition1)\n    a1 = true\n  case (condition2)\n    a2 = true\n}\n\nreturn a1 && a2", value:defaultValue, expectedTime : 0},
      {text:"function task8(myArr){\n    \n    var checkBo = [0,0];\n    var i = 0;\n    do{\n      switch(true){\n                      case (myArr[i] =='hello' && i==0):\n                  checkBo[0] = 1;\n            break;\n          case (myArr[i] =='hello' && i==2):\n                  checkBo[1] = 1;\n            break;\n          default:\n                  break;\n      }\n      i++;\n    }while(i < myArr.length)\n    // console.log(checkBo[0] && checkBo[1])\n    return (checkBo[0] && checkBo[1]);\n}\n", value:defaultValue, expectedTime : 0}
    ]
      },{
    id: '2',
    name: 'Task 2 (a)',
    content: '',
    description: "Consider the following code snippet\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button')\n  btn.setAttribute('id',i);\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ \n      console.log(i); \n  });\n  document.body.appendChild(btn);\n}\n \nWhen any button is clicked, it should print the corresponding ID. For example, clicking button 4 should print 4 to the console. Currently, it always prints 5. Do you know why? Can you rewrite it to produce the correct behavior?\n",
    answers:[
      {text:'This task is about asynchronous method in javascript. You need to understand that inside the for loop function, the addEventListener method is an asynchronous function. No matter what button the user clicks the number 5 will always be logged to the console. This is because, at the point that the onclick method is invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5.',value:defaultValue},
      {text:"The key to make this work is to capture the value of i at each iteration in the for loop, and store it to a newly created function object.  You should consider to use a closure function to scope the adding click even listener.",value:defaultValue},
      {text:"//Here is a way to accomplish this:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', (function(i) {\n    return function() { console.log(i); };\n  })(i));\n  document.body.appendChild(btn);\n}\n\n//check case, the correct value is 4",value:defaultValue}
    ]
      },{
    id: '3',
    name: 'Task 3(a)',
    content: '',
    description: 'Given the following JavaScript snippet:\n\nfunction countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        setTimeout(function () {\n            console.log(num - i);\n        }, i * 1000);\n    }\n}\n\ncountdown(5);\nThe desired result is a countdown from 5 to 0 using alert messages. Explain why the code only alerts -1, then fix the code so it works as expected.\n\n',
    answers:[
        {text:"The setTimeout is an asynchronous method so it will be executed after the for loop. The variable i, therefore, will be the last value in the iteration. ",value:defaultValue},
      {text:"To solve this you can isolate a local scope with another anonymous function where you can redefine private variable i like this:\n\ncountdown function:\n    for loop:\n        using a closure to close the setTimeout function\n            setTimeout\n       closing the closure function, and call the iteration\n    end\nend\n\ncountdown(5);",value:defaultValue},
      {text:"function countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        (function(i) {\n            setTimeout(function () {\n                console.log(num - i);\n            }, i * 1000);\n        })(i);\n    }\n}\n\ncountdown(5);\n\n",value:defaultValue}

    ]
      },{
    id: '4',
    name: 'Task 4 (a)',
    content: '',
    description: 'Complete this JavaScript function to convert a date formatted of MM/DD/YYYY to a format of YYYYMMD string.\n\nFor example, when input is "12/31/2014", the return value should be "20141231". \n\nfunction formatDate(userDate) {\n  // format from MM/DD/YYYY to YYYYMMDD\n}\n\nconsole.log(formatDate("12/31/2014")); //prints 20141231',
    answers:[
      {text:"First, you need to split the string date to an array by '/'. Then you want to check if the date is valid, and then join the array back to string by some string manipulation.",value:defaultValue},
      {text:"The date constraints are: the month should be less than 13 but greater than 1, the day should be less than 31 but greater than 0. You need to also add a '0' if the month or day is less than 10.",value:defaultValue},
      {text:"function formatDate(userDate) {\n  var parts = userDate.split('/');\n  if (parseInt(parts[0])>12 || parseInt(parts[0])<1 \n  || parseInt(parts[1])>31|| parseInt(parts[1])<1)\n     return 'wrong date'\n  \n  if (parts[0].length == 1) parts[0] = '0' + parts[0];\n  if (parts[1].length == 1) parts[1] = '0' + parts[1];\n  return parts[2] + parts[0] + parts[1];\n}\n\n\nconsole.log(formatDate('13/32/2014')) // prints wrong date",value:defaultValue}
    ]
      },{
    id: '5',
    name: 'Task 5 (a)',
    content: '',
    description: 'Please write a function to sort an array of objects by a given property name. Each object may have different properties and each property might be a string or number. \n\nFor example, given the following array, \n \nvar arrayOfPeople = [\n{name:"Rick", age: 30, place: 2},\n{name:"Alan", age: 25, place: 1},\n{name:"Joe", age: 40, place: 4},\n{name:"Dave", age: 35, place:3}\n];\n\nIf sorting by place, this function should print out:\n\n[\n{name:"Alan", age: 25, place: 1},\n{name:"Rick", age: 30, place: 2},\n{name:"Dave", age: 35, place:3},\n{name:"Joe", age: 40, place: 4}\n];',
    answers:[
      {text:"There are two input variables: array and property name. You can do do a bubble sort on the property name. \n\n", value:defaultValue},
      {text:"Here is the algorithm\n\ninput: array, property\n\nfunction:\n   for i=1:length of the array\n      if array[i-1]>array[i] swap these two\n   end\nend", value:defaultValue},
      {text:"var arrayOfPeople = [\n{name:\"Rick\", age: 30, place: 2},\n{name:\"Alan\", age: 25, place: 1},\n{name:\"Joe\", age: 40, place: 4},\n{name:\"Dave\", age: 35, place:3}\n];\n\n\nfunction bubbleSort(a, par)\n{\n    var swapped;\n    do {\n        swapped = false;\n        for (var i=0; i < a.length-1; i++) {\n            if (a[i][par] > a[i+1][par]) {\n                var temp = a[i];\n                a[i] = a[i+1];\n                a[i+1] = temp;\n                swapped = true;\n            }\n        }\n    } while (swapped);\n}\n\n\nbubbleSort(arrayOfPeople, 'place');\n\nfor (i = 0; i < arrayOfPeople.length; i++) {\n   console.log(arrayOfPeople[i]);\n }",value:defaultValue}
    ]
      },{
    id: '6',
    name: 'Task 6 (a)',
    content: '',
    description: 'Rewrite the following code snippet using the jQuery library\n\n<script>\nfunction change(){\n    \n   var myNewTitle = document.getElementById("myTextField").value;\n   if( myNewTitle.length==0 ){\n       console.log("Write Some real Text please.");\n       return;\n   }\n   \n   var title = document.getElementById("title");\n   title.innerHTML = myNewTitle;\n    \n}\n</script>\n\n\n<h1 id="title">Javascript example no.2</h1>\n<input type="text" id="myTextField"/>\n<input type="submit" id="byBtn" value="Change" onclick="change()"/>\n\n',
    answers:[
      {text:"First of all, this code is creating a text input area and a button. Instead of using .getElementById method, you can use '#<id>' to select the element.",value:defaultValue},
      {text:"To select title, you use: $('#title')\n\nTo select the first input, you use: $('#myTextField')\n\n2nd input, you use: $('#byBtn')\n\nTo change value, you use: .val(' ')\n\n", value:defaultValue},
      {text:"<script>\n$('document').ready(function(){\n  \n$('#byBtn').click(function(){\nvar text = $('#myTextField').val();\n  if(text.length==0)\n      console.log('Write Some real Text please.');\nelse{\n$('#title').text(text);\n   }\n    \n});\n</script>\n\n\n<h1 id=\"title\">Javascript example no.2</h1>\n<input type=\"text\" id=\"myTextField\"/>\n<input type=\"submit\" id=\"byBtn\" value=\"Change\" onclick=\"change()\"/>\n\n",value:defaultValue},
    ]
      },{
    id: '7',
    name: 'Task 7 (a)',
    content: '',
    description: 'Giving the following JSON structure. Write a function to reformat the structure so that each element in this new JSON has the pattern of {"firstName": "Akira", "lastName":"Laine", "number":"0543236543"}.\n\nvar contacts = {\n    "firstName": ["Akira", "Harry","Sherlock","Kristian"],\n    "lastName": ["Laine","Potter", "Holmes","Vos"],\n    "number": ["0543236543","0994372684","0487345643","0123321122"]\n    };\n\n',
    answers:[
      {text:"You need to make sure that you match the right element from each property. To do that you can track the index.",value:defaultValue},
      {text:"Since you know the format and the key, you can use:\n\nfor(key in obj)\n   temp[key] = obj[key][i];\n   push temp to final array\n   i++\nend",value:defaultValue},
      {text:"var array = [];\nvar obj = {};\nvar i = 0;\nfor (key in object){\n   obj['firstName'] = object['firstName'][i];\n   obj['lastName'] = object['lastName'][i];\n   obj['number'] = object['number'][i];\n   array.push(obj)\n   i++;\n}\n",value:defaultValue}
    ]
      }
];

part3_questions = [{
  id: '1',
  name: 'Task 1 (b)',
  content: "var input = 'I have $300 in my left pocket and $200 in my right pocket.';\n\nfunction replaceDollarSign(string){\n\tconsole.log(\"you can use console.\");\n\treturn \"hello world\";\n}\n\nreplaceDollarSign(input);",
  testCase: [{code: "replaceDollarSign(input)", answer:'I have 300 dollars in my left pocket and 200 dollars in my right pocket.', output:"", match:false},{code:'replaceDollarSign("$421")', answer:"421 dollars", output:"", match:false}],
  description: "You are given a variable that contains a text. \n\nvar task1 = 'I have $300 in my left pocket and $200 in my right pocket.'\n\nWrite a function to replace dollar sign '$' in front of the numbers with the word 'dollars' after them. (e.g. $300 -> 300 dollars) Your answer should like this 'I have 300 dollars in my left pocket and 200 dollars in my right pocket.'",
  basic: 'You can convert the string down to an array and manipulate the array.',
  psedocode:"You can use .split(' '), then find the array element that starts with '$' using charAt('$') and remove the dollar sign, then splice the word 'dollar' in after that element using .splice(index,0,'dollars'). Finally join the array back to string with .join(' ') and console log it out.",
  correct: "var input = \'I have $300 in my left pocket and $200 in my right pocket.\';\r\n\r\nfunction replaceDollarSign(input){\r\n\tvar ans = input.split(\' \');\r\n    for(var i = 0; i < ans.length; i++){\r\n       if(ans[i].charAt(0)==\'$\'){\r\n           ans[i] = ans[i].substring(1,ans[i].length)\r\n           ans.splice(i+1,0,\'dollars\')\r\n       }\r\n    }\r\n    return ans.join(\" \");\r\n}\r\n\r\nreplaceDollarSign(input);\r\n\r\n"
}, {
  id: '2',
  name: 'Task 2 (b)',
  content: "var a = [];\nfor( var j = 0; j < 5; j++ )\n{\n   setTimeout ( function () {\n       a.push(j)\n       console.log(a);\n   }, j);\n}",
  description: "The following code is supposed to print out [0,1,2,3,4]. Please rewrite it so that the code prints out the desired value. Please do not remove setTimeout function.\n\n",
  testCase: [{code: "NEED TO CHANGE THE TASK", answer:'I have 300 dollars in my left pocket and 200 dollars in my right pocket.', output:"", match:true},{code:'replaceDollarSign("$421")', answer:"421 dollars", output:"", match:true}],
  basic: 'It will output 5,5,5,5,5. Because settimeout is asynchronous function and for loop is synchronous method.',
  psedocode: 'The erroneous output is returned because j is incremented after each timeout is created. Then when the callback function is called, it looks for j’s value which is always 5. The solution to this is to add some arguments that would store the current value of j. (using closure)',
  correct: 'var a = [];\n\nfor( var j = 0; j < 5; j++ )\n{\n   (function (j)  {\n      setTimeout(function () {\n          a.push(j)\n          console.log(a);\n       }, j);\n   }) (j);\n}\n\n'
},{
  id: '3',
  name: 'Task 3 (b)',
  content: "function test(num){\r\n    \r\n    var a = [],\r\n    funcs = [];\r\n    for (var i = 0; i < num; i++) {          \/\/ let\'s create 3 functions\r\n    funcs[i] = function() {            \/\/ and store them in funcs\r\n        a.push(i); \/\/ each should log its value.\r\n    };\r\n    }\r\n    for (var j = 0; j < num; j++) {\r\n        funcs[j]();                        \/\/ and now let\'s run each one to see\r\n    }\r\n    \r\n    return a;\r\n}",
  description: "The desired return value of test(3) is [0,1,2]. Please correct this code to achieve the correct output.",
  testCase: [{code: "test(3)", answer:[0,1,2], output:"", match:false}, {code: "test(5)", answer:[0,1,2,3,4], output:"", match:false}],
  basic: 'Well, the problem is that the variable i, within each of your anonymous functions, is bound to the same variable outside of the function.',
  psedocode: 'What you want to do is bind the variable within each function to a separate (using .bind(), unchanging value outside of the function.',
  correct:'function test(num){\r\n    var a = [],\r\n    funcs = [];\r\n\r\n    function log(x) {\r\n        a.push(x);\r\n    }\r\n    \r\n    for (var i = 0; i < num; i++) {\r\n        funcs[i] = log.bind(this, i);\r\n    }\r\n    \r\n    for (var j = 0; j < num; j++) {\r\n        funcs[j]();\r\n    }\r\n    return a;\r\n}\r\n\r\n'
},{
  id: '4',
  name: 'Task 4 (b)',
  content: "function datenow(time){\n\tvar today;\n\t//your code goes here\n\tconsole.log(today)  //should be a string\n}\n\n",
  description: "Write Javascript code to display the current date in this format: Tuesday, June 21, 2016.",
  testCase: [{code: "NEED TO CHANGE THE TASK", answer:[0,1,2], output:"", match:true}, {code: "datenow()", answer:[0,1,2,3,4], output:"", match:true}],
  basic: 'You need to defind array to store the names of 7 days in a week, and 12 months in a year. Then you need to find out which day, month, and year it is. ',
  psedocode: 'You can use .getDay(), getMonth(), and getYear() to find out each value. But for year, you have to convert it to 4 digits using (year < 1000) ? year + 1900 : year;\n\nTHe final answer is a string and you need to combine these 3 values split by comma. ',
  correct: 'var now = new Date();\n\nvar days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");\n\nvar months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");\n\nvar date = ((now.getDate()<10) ? "0" : "")+ now.getDate();\n\nfunction fourdigits(number)        {\n        return (number < 1000) ? number + 1900 : number;\n                                                                }\ntoday =  days[now.getDay()] + ", " +\n         months[now.getMonth()] + " " +\n         date + ", " +\n         (fourdigits(now.getYear())) ;\n\nconsole.log(today)'
},{
  id: '5',
  name: 'Task 5 (b)',
  content: 'var arr1 = [\r\n    [1, \"Cathy\"],\r\n    [2, \"Pat\"],\r\n    [3, \"David\"],\r\n    [4, \"Walt\"],\r\n    [5, \"George\"],\r\n];\r\n    \r\nvar arr2 = [\r\n    [1, \"Jason\"],\r\n    [3, \"Bob\"],\r\n    [10, \"Drew\"],\r\n    [9, \"Katie\"],\r\n    [0, \"April\"],\r\n];\r\n    \r\nfunction sortArray(arr){\r\n    \/\/ your code goes here \r\n    return arr;\r\n}\r\n',
  description: 'Given a 2D array, please sort them by the 2nd element (i.e. names) and then 1st element (i.e. numbers). \n\n\nFor example, if the input array is [[1,"c"],[3,"b"],[2,"a"]], arraySort() should return [[2,"a"],[3,"b"],[1,"c"]]',
  testCase: [{code: "sortArray(arr1)", answer:[[1,"Cathy"],[3,"David"],[5,"George"],[2,"Pat"],[4,"Walt"]], output:"", match:false}, {code: "sortArray(arr2)", answer:[[0,"April"],[3,"Bob"],[10,"Drew"],[1,"Jason"],[9,"Katie"]], output:"", match:false}],
  basic: 'You can use .sort function do define two return cases, 1st being the 1st element in the subarray, 2nd being the 2nd element in the subarray.',
  psedocode: 'The algorithm is like this:\n\nif(a1 == b1)\n   return a0<b0? -1: a0>b0? 1:0;\nend\n\nreturn a1-b1;',
  correct: 'var arr1 = [\r\n    [1, \"Cathy\"],\r\n    [2, \"Pat\"],\r\n    [3, \"David\"],\r\n    [4, \"Walt\"],\r\n    [5, \"George\"],\r\n];\r\n    \r\nvar arr2 = [\r\n    [1, \"Jason\"],\r\n    [3, \"Bob\"],\r\n    [10, \"Drew\"],\r\n    [9, \"Katie\"],\r\n    [0, \"April\"],\r\n];\r\n\r\nfunction sortArray(arr){\r\n    arr.sort(function(a, b)\r\n    {\r\n        var x = a[1].toLowerCase(),\r\n            y = b[1].toLowerCase();\r\n        if(x === y)\r\n        {\r\n           return a[0] - b[0];\r\n        }\r\n        \r\n         return x < y ? -1 : x > y ? 1 : 0;\r\n        \r\n    });\r\n    return arr;\r\n}\r\n'
},{
  id: '6',
  name: 'Task 6 (b)',
  content: "var obj = {\r\n    \"current_job_title\": [{\"engineer\": \"front-end\"}, {\"staff\": \"hr\"}, {\"ceo\": \"personal-startup\"}],\r\n    \"previous_company\": { \"time\": 1996, \"company_name\":  \"Facebook\" },\r\n    \"name\" : \"sam\",\r\n    \"title\": \"student\"\r\n};\r\n\r\nfunction array_object (obj){\r\n\r\n    var size = 0;\r\n    return size;\r\n}\r\n",
  description: "Given an object, please write a function to count the number of all object property in it.",
  testCase: [{code: "array_object({1:'hello'})", answer:1, output:null, match:false}, {code: "array_object(obj)", answer:9, output:null, match:false}],
  basic: 'You need to be careful here because you have a mixed of array and object. You should detect array and object.',
  psedocode: 'Define a function to check if the current array element is an object or array (Array.isArray(array_name). Then if it is an object, loop through all properties and do this process again till there is no more sub entre. You can use recursive to check all the subentres.',
  correct: 'var obj = {\r\n    \"current_job_title\": [{\"engineer\": \"front-end\"}, {\"staff\": \"hr\"}, {\"ceo\": \"personal-startup\"}],\r\n    \"previous_company\": { \"time\": 1996, \"company_name\":  \"Facebook\" },\r\n    \"name\" : \"sam\",\r\n    \"title\": \"student\"\r\n};\r\n\r\nfunction array_object (obj){\r\n\r\n    var size = 0, key;\r\n    \r\n    for (key in obj) {\r\n        if (obj.hasOwnProperty(key)){\r\n            if (!Array.isArray(obj)){\r\n                size++;\r\n            }\r\n            if(typeof(obj[key])==\"object\"){\r\n                size+=array_object(obj[key]);\r\n            }\r\n        } \r\n    }\r\n    \r\n    return size;\r\n}\r\n'
},{
  id: '7',
  name: 'Task 7 (b)',
  content: 'var contacts = [\n    {\n        "firstName": "Akira",\n        "lastName": "Laine",\n        "number": "0543236543",\n    },\n    {\n        "firstName": "Harry",\n        "lastName": "Potter",\n        "number": "0994372684",\n    },\n    {\n        "firstName": "Sherlock",\n        "lastName": "Holmes",\n        "number": "0487345643",\n    },\n    {\n        "firstName": "Kristian",\n        "lastName": "Vos",\n        "number": "03134234213",\n    }\n];\n\nfunction lookUpNumberByLastName(lastName){\n  // Only change code below this line\n  for (var i = 0; i < contacts.length; i++) {\n    if (contacts[i].lastName === lastName){\n        return contacts[i].number;\n     }\n  }\n}\n\n',
  description: "The following code allows you to search the phone number for a given last name in the database. Change the code so that it will look up a phone number by any property (not just last name) that is passed and refactor the example. Please check Akira Laine's number as the final test case. ",
  testCase: [{code: 'lookUpNumberByProperty("Laine", "lastName")', answer:'0543236543', output:null, match:false},
  {code: 'lookUpNumberByProperty("Kristian", "firstName")', answer:'03134234213', output:null, match:false}],
  basic: 'Square bracket notation in JavaScript will let you use random string to access property of an json object. Return an array whenever you find the matching element. \n',
  psedocode: 'You can create a function with 2 inputs. Then loop through the array and check if the property is there and if the value of the property equals to the input value. If it is, push it to the array.',
  correct: 'var contacts = [\n    {\n        "firstName": "Akira",\n        "lastName": "Laine",\n        "number": "0543236543",\n    },\n    {\n        "firstName": "Harry",\n        "lastName": "Potter",\n        "number": "0994372684",\n    },\n    {\n        "firstName": "Sherlock",\n        "lastName": "Holmes",\n        "number": "0487345643",\n    },\n    {\n        "firstName": "Kristian",\n        "lastName": "Vos",\n        "number": "03134234213",\n    }\n];\n\nfunction lookUpNumberByProperty(value, prop){\n  // Only change code below this line\n  var arr = [];\n  for (var i = 0; i < contacts.length; i++) {\n    if (contacts[i].hasOwnProperty(prop) && contacts[i][prop] === value) {\n       return contacts[i].number\n    }\n  }\n}\n\n'
}

];

cutOffTime =  600; // in seconds - 5 means 5 seconds this is used to enable Give up button
//cutOffTime =  60 * 5; // in seconds - this is used to enable Give up button
DEFAULT_DELAY = 5;    // in seconds
displayProgress = false; // false if progress bar has no text.
