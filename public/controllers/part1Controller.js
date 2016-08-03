angular.module('app')
  .controller('part1Controller', part1Controller);

part1Controller.$inject = ['$timeout', '$scope', '$http', '$location'];

function part1Controller($scope,  $http, $timeout, $location){
    $scope.quiz = part1_quiz;
    window.scrollTo(0,0);
};
