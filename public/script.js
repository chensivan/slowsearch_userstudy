// script.js

// create the module and name it scotchApp
    // also include ngRoute for all our routing needs
var app = angular.module('app', ['rzModule', 'ui.ace','ui.bootstrap', 'ngRoute']);

// configure our routes
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  // route for the home page
  .when('/', {
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
  });
}]);


window.onbeforeunload = function(event) {
  event.returnValue = "Do you really want to leave?";
};
