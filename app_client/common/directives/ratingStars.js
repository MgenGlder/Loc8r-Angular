(function () {
  angular
    .module("loc8rApp")
    .directive("ratingStars", ratingStars);

  function ratingStars () {
    return {
      restrict: "EA", //Element and attribute, only use directive in these places
      scope: {
        thisRating: "=rating"
      },
      templateUrl: "/common/directives/ratingStars.template.html"
    };
  }
})();
