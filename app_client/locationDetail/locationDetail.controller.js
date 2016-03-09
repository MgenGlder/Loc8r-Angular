(function() {
  angular
    .module("loc8rApp")
    .controller("locationDetailCtrl", locationDetail);

  locationDetail.$inject = ["$routeParams", "loc8rData", "$uibModal", "$location", "authentication"];
  function locationDetail($routeParams, loc8rData, $uibModal, $location, authentication) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    loc8rData.locationById(vm.locationid)
      .success(function(data) {
        vm.data = {
          location: data
        };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function(e) {
        console.log(e);
      });
    vm.popupReviewForm = function() {
      var modalInstance = $uibModal.open({
        templateUrl: "/reviewModal/reviewModal.view.html",
        controller: "reviewModalCtrl as vm",
        resolve: {
          locationData: function() {
            console.log(vm.locationid);
            return {
              locationid: vm.locationid,
              locationName: vm.data.location.name
            };
          }
        }
      });
      modalInstance.result.then(function(data) {
        vm.data.location.reviews.push(data);
      });
    };
  }


})();
