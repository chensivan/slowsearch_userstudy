
angular.module('app')
  .filter('minsToMinSeconds', minsToMinSeconds)

function minsToMinSeconds() {
    return function(value) {
      var str = Math.floor(value) + " min ";
      var sec = value - Math.floor(value);
      if( sec > 0){
        str += Math.floor(sec * 60.0) + "sec";
      }
      return str;
    };
  }
