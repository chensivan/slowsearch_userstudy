

part1_quiz = [
  {
    "question": "What is the outcome of the following code?",
    "code": "<script type=\"text/javascript\">\n \tx=4+\"4\";\n\tdocument.write(x);\n</script>",
    "options": ["44",
                "8",
                "4",
                "Error output"]
  },
   {
     "question": "What is the outcome of the following code?",
    "code": "<script type=\"text/javascript\">\nvar s = \"9123456 or 80000?\";\nvar pattern = /\d{4}/;\nvar output = s.match(pattern);\ndocument.write(output);\n</script>",
    "options": ["9123",
                "91234",
                "80000",
                "None of the above"]
  },
   {
     "question": "What is the console output of the following code?",
    "code": "function printprops(o) \n{\n    for(var p in o)\n      console.log(p + \": \" + o[p] + \" \");\n}",
    "options": ["Prints the contents of each property of o",
                "Returns undefined",
                "Both a and b",
                "None of the mentioned"]
  },
   {
    "question": "Which of the following code does print \'Hello World\' in console with one second delay?",
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
                "None of the mentioned"]
  },
   {
    "question": "Which of the following functions does convert text in the javascript format to a javascript Object",
    "options": ["jQuery.each()",
                "jQuery.parseJSON()",
                "jQuery.noConflict()",
                "None of the mentioned"]
  },
   {
    "question": "In the following code, what are 'firstname' and 'surname'?",
    "code":"var book = {\"main title\": \"JavaScript\",\n\"sub-title\": \"The Definitive Guide\",\n\"for\": \"all audiences\",\n\"author\": { \n   firstname: \"David\", \n    surname: \"Flanagan\" \n}};\n",
    "options": ["properties",
                "property values",
                "property names",
                "objects"]
  },
   {
     "question": "What is the console output of the following code?",
     "code": "const pi=3.14;\nvar pi=4;\nconsole.log(pi);\n",
    "options": ["This will flash an error",
                "Prints 4",
                "Prints 3.14",
                "Ambiguity"]
  },
  {
    "question": "The following code returns",
    "code":"(function(){  \n  return typeof arguments; \n })();",
    "options": ["\"object\"",
                "\"array\"",
                "\"arguments\"",
                "\"undefined\""]
  }, {
    "question": "What is the console output of the following code?",
    "code":"var f = function g(){ return 23; };   \nconsole.log(typeof g());",
    "options": ["\"number\"",
                "\"undefined\"",
                "\"function\"",
                "Error"]
  }

];
var defaultValue = 5;

part2_questions = [
  {
    id: '1',
    name: 'Task 1 (a)',
    content: '',
    description: "You are given a variable that contains a text. \n\nvar task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n\nRemove all the digits, whitespace character and punctuations, and print the result in console.",
    answers:[
      {text:"You can go to this link to find what you need: \n\nhttp://www.w3schools.com/jsref/jsref_obj_regexp.asp", value:defaultValue},
      {text:"You could use .match(), .replace() function, /\s+/g expression, /[0-9]/g, and /[.?]/g expression", value:defaultValue},
      {text:"var task1 = 'I have 300 dollars in my pocket. Could you sell me that?';\n //the correct answer is 'IhavedollarsinmypocketCouldyousellmethat'\n   \nvar task1 = task1.replace(/\s+/g,'');\nvar task1 = task1.replace(/[0-9]/g,'');\nvar task1 = task1.replace(/[.?]/g,'');\n\nconsole.log(task1);", value:defaultValue}
    ]
      },{
    id: '2',
    name: 'Task 2 (a)',
    content: '',
    description: "Consider the following code snippet\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button')\n  btn.setAttribute('id',i);\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', function(){ \n      console.log(i); \n  });\n  document.body.appendChild(btn);\n}\n \nWe want the effect that when clicking any button, it prints the associated id. For example, if clicking button 4, it will console log 4. But it always prints out 5. Do you know why? Can you rewrite it so that it does what you think it should do?\n",
    answers:[
      {text:'This task is about asynchronous method in javascript. You need to understand that within the synchronous function, the asynchronous function. "No matter what button the user clicks the number 5 will always be logged to the console. This is because, at the point that the onclick method is invoked (for any of the buttons), the for loop has already completed and the variable i already has a value of 5.\n" ',value:defaultValue},
      {text:"The key to making this work is to capture the value of i at each pass through the for loop by passing it into a newly created function object.  You should consider to use closure function to scope the adding click even listener.",value:defaultValue},
      {text:"//Here is a way to accomplish this:\n\nfor (var i = 0; i < 5; i++) {\n  var btn = document.createElement('button');\n  btn.appendChild(document.createTextNode('Button ' + i));\n  btn.addEventListener('click', (function(i) {\n    return function() { console.log(i); };\n  })(i));\n  document.body.appendChild(btn);\n}\n\n//check case, the correct value is 4",value:defaultValue}
    ]
      },{
    id: '3',
    name: 'Task 3(a)',
    content: '',
    description: 'Given the following javascript code:\n\nfunction countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        setTimeout(function () {\n            alert(num - i);\n        }, i * 1000);\n    }\n}\n\ncountdown(5);\nThe desired result is a countdown from 5 to 0 using alert messages. Explain why the code only alerts -1, then fix the code so it works as expected.\n\n',
    answers:[
        {text:"Because of the scope of i when the anonymous function is called the loop is over and iis in it's final value(-1). ",value:defaultValue},
      {text:"To solve this you can isolate a local scope with another anonymous function where you can redefine private variable i like this:\n\ncountdown function:\n    for loop:\n        using a closure to close the setTimeout function\n            setTimeout\n       closing the closure function, and call the iteration\n    end\nend\n\ncountdown(5);",value:defaultValue},
      {text:"function countdown (num) {\n    for (var i = 0; i <= num; i += 1) {\n        (function(i) {\n            setTimeout(function () {\n                alert(num - i);\n            }, i * 1000);\n        })(i);\n    }\n}\n\ncountdown(5);\n\n",value:defaultValue}

    ]
      },{
    id: '4',
    name: 'Task 4 (a)',
    content: '',
    description: 'Write Javascript code that converts a date formatted as MM/DD/YYYY to a format as YYYYMMD string.\n\nFor example, it should convert user entered date "12/31/2014" to "20141231". \n\nfunction formatDate(userDate) {\n  // format from MM/DD/YYYY to YYYYMMDD\n}\n\nconsole.log(formatDate("12/31/2014"));',
    answers:[
      {text:"First, you need to split the string to an array. Then you can do regex manipulation on the array",value:defaultValue},
      {text:"You can do the following:\n\nfunction:\n   split the string using .split(/(\d{1,2})\/(\d{1,2})\/(\d{6})/);\nreturn the results",value:defaultValue},
      {text:"function formatDate(userDate) {\n // format from M/D/YYYY to YYYYMMDD\n var dateParts = userDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{6})/);\n return dateParts[3] + dateParts[1] + dateParts[2];\n}\n\nconsole.log(formatDate(\"12/31/2016\"));",value:defaultValue}
    ]
      },{
    id: '5',
    name: 'Task 5 (a)',
    content: '',
    description: 'Please write a function to sort an array of objects by one of their properties. Each object may have different property and the property could be string or number. \n\nFor example, given the following array, \n \nvar arrayOfPeople = [\n{name:"Rick", age: 30, place: 2},\n{name:"Alan", age: 25, place: 1},\n{name:"Joe", age: 40, place: 4},\n{name:"Dave", age: 35, place:3}\n];\n\nIf sorting by place, this function should print out:\n\n[\n{name:"Alan", age: 25, place: 1},\n{name:"Rick", age: 30, place: 2},\n{name:"Dave", age: 35, place:3},\n{name:"Joe", age: 40, place: 4}\n];',
    answers:[
      {text:"You can do bubble sorting by the property name. \n\n", value:defaultValue},
      {text:"Here is the algorithm\n\ninput: array, property\n\nfunction:\n   for i=1:length of the array\n      if array[i-1]>array[i] swap these two\n   end\nend", value:defaultValue},
      {text:"var arrayOfPeople = [\n{name:\"Rick\", age: 30, place: 2},\n{name:\"Alan\", age: 25, place: 1},\n{name:\"Joe\", age: 40, place: 4},\n{name:\"Dave\", age: 35, place:3}\n];\n\n\nfunction bubbleSort(a, par)\n{\n    var swapped;\n    do {\n        swapped = false;\n        for (var i=0; i < a.length-1; i++) {\n            if (a[i][par] > a[i+1][par]) {\n                var temp = a[i];\n                a[i] = a[i+1];\n                a[i+1] = temp;\n                swapped = true;\n            }\n        }\n    } while (swapped);\n}\n\n\nbubbleSort(arrayOfPeople, 'place');\n\nfor (i = 0; i < arrayOfPeople.length; i++) {\n   console.log(arrayOfPeople[i]); }",value:defaultValue}
    ]
      },{
    id: '6',
    name: 'Task 6 (a)',
    content: '',
    description: 'Rewrite the following code using jQuery library\n\n<script>\nfunction change(){\n    \n   var myNewTitle = document.getElementById("myTextField").value;\n   if( myNewTitle.length==0 ){\n       console.log("Write Some real Text please.");\n       return;\n   }\n   \n   var title = document.getElementById("title");\n   title.innerHTML = myNewTitle;\n    \n}\n</script>\n\n\n<h1 id="title">Javascript example no.2</h1>\n<input type="text" id="myTextField"/>\n<input type="submit" id="byBtn" value="Change" onclick="change()"/>\n\n',
    answers:[
      {text:"To select id, you use '#' sign to select the element.",value:defaultValue},
      {text:"To select title, you use: $('#title')\n\nTo select the first input, you use: $('#myTextField')\n\n2nd input, you use: $('#byBtn')\n\nTo change value, you use: .val(' ')\n\n", value:defaultValue},
      {text:"<script>\n$('document').ready(function(){\n  \n$('#byBtn').click(function(){\nvar text = $('#myTextField').val();\n  if(text.length==0)\n      console.log('Write Some real Text please.');\nelse{\n$('#title').text(text);\n   }\n    \n});\n</script>\n\n\n<h1 id=\"title\">Javascript example no.2</h1>\n<input type=\"text\" id=\"myTextField\"/>\n<input type=\"submit\" id=\"byBtn\" value=\"Change\" onclick=\"change()\"/>\n\n",value:defaultValue},
    ]
      },{
    id: '7',
    name: 'Task 7 (a)',
    content: '',
    description: 'Giving the following JSON, try to rewrite it to an array format with each element having the pattern of {"firstName": "Akira", "lastName":"Laine", "number":"0543236543"}.\n\nvar contacts = {\n    "firstName": ["Akira", "Harry","Sherlock","Kristian"],\n    "lastName": ["Laine","Potter", "Holmes","Vos"],\n    "number": ["0543236543","0994372684","0487345643","0123321122"]\n    };\n\n',
    answers:[
      {text:"You need to make sure that you match the right element from each property. To do that you can track the index.",value:defaultValue},
      {text:"Since you know the format and the key, you can use:\n\nfor(key in obj)\n   temp[key] = obj[key][i];\n   push temp to final array\n   i++\nend",value:defaultValue},
      {text:"var array = [];\nvar obj = {};\nvar i = 0;\nfor (key in object){\n   obj['firstName'] = object['firstName'][i];\n   obj['lastName'] = object['lastName'][i];\n   obj['number'] = object['number'][i];\n   array.push(obj)\n   i++;\n}\n",value:defaultValue}
    ]
      }
]
