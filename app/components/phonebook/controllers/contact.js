angular.module('contactControllers', ['phonebookServices', 'phonebookModels'])
// Contact Details View Controller
    .controller('detailsCtrl',
    function detailsCtrl($scope, $routeParams, PhonebookService) {
        var contact = PhonebookService.get($routeParams.id);
        if (contact) {
            $scope.contact = contact;
        }
        else {
            alert('Error retrieving data, please contact support.');
        }
    })

// Create Contact View Controller
    .controller('createCtrl',
    function createCtrl($scope, $location, PhonebookService, ContactModel) {
        $scope.contact = new ContactModel();
        $scope.add = function () {
            PhonebookService.add($scope.contact);
            $location.url('/');
        };
    })

// Edit Contact View Controller
    .controller('updateCtrl',
    function EditCtrl($scope, $routeParams, $location, PhonebookService) {
        $scope.contact = PhonebookService.get($routeParams.id);
        $scope.update = function () {
            PhonebookService.update($routeParams.id, $scope.contact);
            $location.url('/');
        };
    })

// Delete Contact View Controller
    .controller('deleteCtrl',
    function deleteCtrl($scope, $routeParams, $location, PhonebookService) {
        $scope.contact = PhonebookService.get($routeParams.id);
        $scope.delete = function () {
            PhonebookService.remove($routeParams.id);
            $location.url('/');
        };
        $scope.back = function () {
            $location.url('/');
        };
    });