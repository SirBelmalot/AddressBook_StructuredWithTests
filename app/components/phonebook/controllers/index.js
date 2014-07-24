angular.module('phonebookControllers', ['phonebookServices', 'contactControllers'])
// App Controller, set local storage if it doesn't exist and set to scope
    .controller('indexCtrl',
    function indexCtrl($scope, localStorageService, ContactsService) {
        // Check browser support for LocalStorageService
        if (localStorageService.isSupported) {
            ContactsService().then(function (contacts) {
                $scope.contacts = contacts;
            });
        }
        else {
            alert('You need to update to the latest browser to use this app.');
        }
    });