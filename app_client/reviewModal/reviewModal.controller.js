(function() {
  angular
    .module("loc8rApp")
    .controller("reviewModalCtrl", reviewModalCtrl);

  function reviewModalCtrl($uibModalInstance, locationData, loc8rData) {
    var vm = this;

    vm.modal = {
      cancel: function() {
        $uibModalInstance.dismiss("cancel");
      },
      close: function(result) {
        $uibModalInstance.close(result); //pass the data (the review you just created) from the response to the modal, which passes it to the controller
      }
    };
    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        console.log(vm.formData.name, vm.formData.rating, vm.formData.reviewText);
        return false;
      } else {
        vm.doAddReview(locationData.locationid, vm.formData);
      }
    };
    vm.doAddReview = function(locationid, formData) {
      console.log(loc8rData);
      loc8rData.addReviewById(locationid, {
          rating: formData.rating,
          reviewText: formData.reviewText
        })
        .success(function(data) {
          console.log("success!");
          vm.modal.close(data);
        })
        .error(function(data) {
          vm.formError = "Your review has not been saved, try again!";
        });
      return false;
    };
  }
  reviewModalCtrl.$inject = ["$uibModalInstance", "locationData", "loc8rData"];
})();
