angular.module('app')
  .controller('mainController', mainController);

mainController.$inject = ['$scope'];

function mainController($scope) {

  // create a message to display in our view
  $scope.message = 'N/A';
  var id = Math.random().toString(36).substring(7);


  $scope.participant_data = {
      _id:  id,
      quiz: {
        quiz_answer: []
      },
      subjectiveTask: {},
      objectiveTask: {
        "1":{},
        "2":{},
        "3":{},
        "4":{},
        "5":{},
        "6":{},
        "7":{}
      }
    };

  };
