(function () {
  angular.module("loc8rApp", ["ngRoute", "ngSanitize", "ui.bootstrap"]); //dependency injection of ng-route

  function config($routeProvider, $locationProvider) {  //create config to be added to angular module loc8rapp
    $routeProvider
      .when("/", {
        templateUrl: "home/home.view.html", //template url is what goes in ng-view when you load up the initial page for angular app
        controller: "homeCtrl",
        controllerAs: "vm"
      })
      .when("/about", {
        templateUrl: "/about/about.view.html",
        controller: "aboutCtrl",
        controllerAs: "vm"
      })
      .when("/location/:locationid", {
        templateUrl: "/locationDetail/locationDetail.view.html",
        controller: "locationDetailCtrl",
        controllerAs: "vm"
      })
      .when("/register", {
        templateUrl: "/auth/register/register.view.html",
        controller: "registerCtrl",
        controllerAs: "vm"
      })
      .when("/login", {
        templateUrl: "/auth/login/login.view.html",
        controller: "loginCtrl",
        controllerAs: "vm"
      })
      .otherwise({redirectTo: "/"});

      $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
      });
  }

  angular
    .module("loc8rApp")
    .config(["$routeProvider", "$locationProvider",  config]);
})();
