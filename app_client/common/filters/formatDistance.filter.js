(function () {
  angular
    .module("loc8rApp")
    .filter("formatDistance", formatDistance);

  var _isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  function formatDistance () {
    return function (distance) {
      var numDistance, unit;
      if (distance && _isNumeric(distance)) {
        if (distance > 1) {
          numDistance = parseFloat(distance).toFixed(1); //returns a string w/ this many decimal digits
          unit = "km";
        }
        else {
          numDistance = parseInt(distance * 100, 10);
        }
        return numDistance + unit;
      }
      else {
        return "?";
      }
    };
  }
})();
