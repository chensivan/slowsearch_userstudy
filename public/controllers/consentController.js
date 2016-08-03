
(function () {
    'use strict';
    angular.module('app')
      .controller('consentController', consentController);

    consentController.$inject = ['$timeout', '$scope', '$http', '$location'];

    function consentController($scope, $http, $timeout, $location){

      window.scrollTo(0,0);
      $scope.disableSubmit = true;

      $scope.isToggled = function() {
        debugger;
       return $scope.disableSubmit;
      };

      $scope.toggle = function() {
        $scope.disableSubmit = !$scope.disableSubmit;
      };

      $scope.submitConsent = function() {
        debugger;
        $location.path("part1");
      };
    };

})();
