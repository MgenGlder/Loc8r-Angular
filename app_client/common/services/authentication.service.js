(function () {
  angular
    .module("loc8rApp")
    .service("authentication", authentication);
    //Authentication service
  authentication.$inject = ["$window"];
  function authentication ($window) {
    //will save user token into local storage of user browser
    var saveToken = function (token) {
      $window.localStorage["loc8r-token"] = token;
    };
    //returns the token in user local storage
    var getToken = function () {
      return $window.localStorage['loc8r-token'];
    };
    //gets the token from the server and saves it to local storage
    register = function (user) {
      return $http.post("/api/register", user).success(function(data) {
        saveToken(data.token);
      });
    };
    //given the user object with required params, will return token to be saved inside of browser local storage
    login = function (user) {
      return $http.post("/api/login", user).success(function(data) {
        saveToken(data.token);
      });
    };
    //deletes the token from the user local storage
    logout = function () {
      $window.localStorage.removeItem("loc8r-token");
    };
    //check get token to see if the user is already logged in, if they are logged in they will have a token saved in local storage
    var isLoggedIn = function () {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000;
      }
      else {
        return false;
      }
    };
    //will parse the JWT token to get the email and name of the user
    var currentUser = function () {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email: payload.email,
          name: payload.name
        };
      }
    };

    return {
      saveToken : saveToken,
      getToken : getToken
    };
  }
})();
