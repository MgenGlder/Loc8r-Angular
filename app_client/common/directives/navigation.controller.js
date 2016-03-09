(function () {
  angular
    .module("loc8rApp")
    .controller("navigationCtrl", navigationCtrl);
    //controller uses authentication thing to get tokens and check logins etc
  navigationCtrl.$inject = ["$location", "authentication"];
  function navigationCtrl($location, authentication) {
    var vm = this;
    //save current url path
    vm.currentPath = $location.path();
    //check logged in status and save it to the scope
    vm.isLoggedIn = authentication.isLoggedIn();
    //check currentUser and save it to the scope
    vm.currentUser = authentication.currentUser();
    //save logout function to the scope
    vm.logout = function () {
      authentication.logout();
      $location.path("/");
    };
  }
})();
