angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('displayPage', {
    url: '/result',
    templateUrl: 'templates/displayPage.html',
    controller: 'displayPageCtrl'
  })

  .state('report', {
    url: '/report',
    templateUrl: 'templates/report.html',
    controller: 'reportCtrl'
  })

  .state('servicelist', {
    url: '/servicelist',
    templateUrl: 'templates/servicelist.html',
    controller: 'servicelistCtrl'
  })

  .state('list', {
	  url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'listCtrl'
  })

$urlRouterProvider.otherwise('/home')


});

