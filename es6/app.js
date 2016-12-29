/**
 * Created by texpe on 30/12/2016.
 */

let chat = angular.module('chat', ['ionic']);

chat.run(($ionicPlatform, $rootScope, $state, authService) => {
    $ionicPlatform.ready(() => {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if(window.StatusBar)
            StatusBar.styleDefault();
    });

    $rootScope.$on('$routeChangeStart', function (event) {
        if (!authService.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/home');
        }
    });
});

chat.config(($stateProvider, $urlRouterProvider) => {
    const states = {
        'app': {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        },
        'app.home': {
            url: '/home',
            views: {
                menuContent: {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        },
        'app.login': {
            url: '/login',
            views: {
                menuContent: {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                }
            }
        },
        'app.chat': {
            url: '/chat',
            views: {
                'menuContent': {
                    templateUrl: 'templates/chat.html',
                    controller: 'ChatListCtrl'
                }
            }
        }
    };

    for(let state in states) {
        if(!states.hasOwnProperty(state)) continue;
        $stateProvider.state(state, states[state]);
    }

    $urlRouterProvider.otherwise('/app/login');
});