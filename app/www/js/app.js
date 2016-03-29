// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('garagem', ['ionic', 'ui.utils.masks', 'ngAnimate', 'ngPassword']).run(function ($rootScope, $ionicPlatform, $ionicHistory, $state, $ionicViewSwitcher) {
    $rootScope.applicationReady = false;

    function registerBackButtonAction() {
        $ionicPlatform.registerBackButtonAction(function () {
            var currentStateName = $ionicHistory.currentStateName();

            switch (currentStateName) {
                case 'home':
                case 'logged-home':
                    navigator.app.exitApp();
                    break;

                case 'success':
                case 'product-photo':
                    $ionicViewSwitcher.nextDirection('back');
                    $state.go('logged-home');
                    break;

                default:
                    $ionicHistory.goBack(-1);
                    break;
            }
        }, 100);
    }

    $ionicPlatform.ready(function () {
        registerBackButtonAction();

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
            cordova.plugins.Keyboard.disableScroll(false);
        }

        if (window.StatusBar) {
            StatusBar.styleLightContent()
        }

        $ionicViewSwitcher.nextDirection('none');

        setTimeout(function () {
            $rootScope.applicationReady = true;
            $rootScope.$broadcast('applicationReady');
        }, 500);
    }).then(function () {
        navigator.splashscreen.hide();
    });

}).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('loading', {
            url: '/loading',
            templateUrl: 'templates/loading.html',
            controller: 'LoadingController'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            cache: false
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'SigninController',
            cache: false
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'SignupController',
            cache: false
        })

        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html',
            controller: 'SettingsController',
            data: {
                requiredClient: true
            }
        })

        .state('rules', {
            url: '/rules',
            templateUrl: 'templates/rules.html',
            data: {
                requiredClient: true
            }
        })

        .state('logged-home', {
            url: '/logged-home',
            templateUrl: 'templates/logged-home.html',
            controller: 'LoggedHomeController',
            cache: false,
            data: {
                requiredClient: true
            }
        })

        .state('my-garage', {
            url: '/my-garage',
            templateUrl: 'templates/my-garage.html',
            controller: 'MyGarageController',
            cache: false,
            data: {
                requiredClient: true
            }
        })

        .state('product-photo', {
            url: '/product-photo',
            templateUrl: 'templates/product-photo.html',
            controller: 'PhotoController',
            cache: false,
            data: {
                requiredClient: true
            }
        })

        .state('product-category', {
            url: '/product-category',
            templateUrl: 'templates/product-category.html',
            controller: 'ProductCategoryController',
            cache: false,
            data: {
                requiredClient: true
            }
        })

        .state('product-info', {
            url: '/product-info',
            templateUrl: 'templates/product-info.html',
            controller: 'ProductInfoController',
            cache: false,
            data: {
                requiredClient: true
            }
        })

        .state('success', {
            url: '/success',
            templateUrl: 'templates/success.html',
            data: {
                requiredClient: true
            }
        });

    $urlRouterProvider.otherwise("/loading");
});