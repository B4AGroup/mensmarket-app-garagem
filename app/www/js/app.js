// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
document.addEventListener("deviceready", function () {

    // cordova-HTTP code goes here
}, false);

angular.module('garagem', ['ionic', 'ui.utils.masks', 'ngAnimate', 'ngPassword']).run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'HomeController'
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'signin.html',
            controller: 'SigninController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller: 'SignupController'
        })

        .state('logged-home', {
            url: '/logged-home',
            templateUrl: 'logged-home.html',
            controller: 'LoggedHomeController'
        })

        .state('my-garage', {
            url: '/my-garage',
            templateUrl: 'my-garage.html',
            controller: 'MyGarageController'
        })

        .state('product-photo', {
            url: '/product-photo',
            templateUrl: 'product-photo.html',
            controller: 'PhotoController'
        })

        .state('product-category', {
            url: '/product-category',
            templateUrl: 'product-category.html',
            controller: 'ProductCategoryController'
        })

        .state('product-info', {
            url: '/product-info',
            templateUrl: 'product-info.html',
            controller: 'ProductInfoController'
        });

    $urlRouterProvider.otherwise("/home");
});