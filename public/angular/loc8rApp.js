var loc8rData = function ($http){
  var locationByCoords = function (lat, lng) {
    return $http.get("/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistabce=20");
  };
  return {
    locationByCoords : locationByCoords
  };
};

//geolocation service, if the geolocation is supported, call the geolocation function with given callbacks
//if not supported, do given callback function
var geolocation = function () {
  var getPosition = function (cbSuccess, cbError, cbNoGeo) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    }
    else {
      cbNoGeo();
    }
  };
  return {
    getPosition: getPosition
  };
};

var locationListCtrl = function ($scope, loc8rData, geolocation) {
  $scope.message = "Searching for nearby places";
  $scope.getData = function (position) {
    var lat = position.coords.latitude, lng = position.coords.longitude;
    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No locations found";
        //dont need apply here because angular automatically apply()s after a promise is returned
        $scope.data = {locations: data};
      })
      .error(function (e) {
        $scope.message = "Sorry, something's gone wrong ";
        console.log(e);
      });
  };
  $scope.showError = function (error) {
    //must use apply to tell angular that you changed a scope item.
    $scope.$apply(function () {
      $scope.message = error.message;
    });
  };
  $scope.noGeo = function () {
    //must use apply to tell angular that you changed a scope item
    //if you don't, angular wont know
    $scope.$apply(function () {
      $scope.message = "Geolocation not supported by this browser";
    });
  };
  //will call scope.getData if use accepts location access and browser supports it
  geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
  // $scope.data = {
  //   locations: loc8rData
  // };
};

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function () {
  return function (distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = "km";
      }
      else {
        numDistance = parseInt(distance * 100, 10);
        unit = "m";
      }
      return numDistance + unit;
    }
    else {
      return "?";
    }
  };
};

var ratingStars = function () {
  return {
    scope: {
      thisRating: "=rating"
    },
    templateUrl: "/angular/rating-stars.html"
  };
};

angular.module("loc8rApp", [])
  .controller("locationListCtrl", locationListCtrl)
  .filter("formatDistance", formatDistance)
  .directive("ratingStars", ratingStars)
  .service("loc8rData", loc8rData)
  .service("geolocation", geolocation);
