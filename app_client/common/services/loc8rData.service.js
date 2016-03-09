(function() {
  angular
    .module("loc8rApp")
    .service("loc8rData", loc8rData);
  loc8rData.$inject = ["$http", "authentication"];
  function loc8rData($http, authentication) {
    var locationByCoords = function(lat, lng) {
      return $http.get("/api/locations?lng=" + lng + "&lat=" + lat + "&maxDistance=20");
    };
    var locationById = function(locationid) {
      return $http.get("/api/locations/" + locationid);
    };
    //in order to create a review, must be a user and logged in, send token as proof
    //the authorization is sent in the header of the packet, just add a new object into the post function with the header token inside of it as an object
    var addReviewById = function (locationid, data) {
      return $http.post("/api/locations/" + locationid + "/reviews", data, {
        headers: {
          Authorization: "Bearer " + authorization.getToken()
        }
      });
    };
    return {
      locationByCoords: locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }
})();
