(function () {
  angular
    .module("loc8rApp")
    .directive("navigation", navigation);
    //navigation directive, injects template wherever you say <navigation></navigation>
  function navigation () {
    return {
      restrict: "EA",
      templateUrl: "/common/directives/navigation.template.html",
      //converts the scope element (vm) of navigationCtrl to navvm
      controllerAs: "navigationCtrl as navvm"
    };
  }
})();
