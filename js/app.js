var ab = angular.module("ab", ["LocalStorageModule", "xeditable", "ngAnimate", "truncate", "ui.router"]);


ab.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "localStorageServiceProvider", function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('addressbook');
  $locationProvider.html5Mode(false)
  .hashPrefix('!');
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "views/home.html",
    controller: "ContactsCtrl"
  })
  .state("contact", {
    url: "/:id",
    templateUrl: "views/contact.html",
    controller: "ContactsCtrl"
  });
  
}]);

ab.run(function(editableOptions) {
  editableOptions.theme = 'default';
});

ab.controller("ContactsCtrl", ["$scope", "localStorageService", "$stateParams", function($scope, localStorageService, $stateParams){
  
  $scope.contacts = [];
  
  //Get the bookmarksData from Local Storage if there is some already in place
  $scope.getContacts = function(){
    if(localStorageService.get("contactData")){
      $scope.contacts = localStorageService.get("contactData");
    } else {
      $scope.contacts = [];
    }
  }
  
  $scope.addContact = function(){
    $scope.contacts.unshift({
      name: $scope.name,
      phone: $scope.phone,
      phoneTwo: $scope.phoneTwo,
      email: $scope.email,
      address: $scope.address,
      contactId: Date.now()
    });
    localStorageService.set("contactData", $scope.contacts);
    $scope.name = "",
    $scope.phone = "",
    $scope.phoneTwo = "",
    $scope.email = "",
    $scope.address = ""
  }
  
  $scope.updateContact = function(){
    localStorageService.set("contactData", $scope.contacts);
  }
  
  $scope.currentId = $stateParams.id;  
  
  $scope.deleteContact = function(start){
    var confirmDelete = confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      $scope.contacts.splice(start, 1);
      localStorageService.set("contactData", $scope.contacts);
    }
    localStorageService.set("contactData", $scope.contacts);
  }
  
}]);