angular.module('contactServices', ['ngResource', 'phonebookServices'])
    .factory('ContactsDataService',
    function ($resource, $http) {

        var defaults = $http.defaults.headers;
        defaults.get = defaults.get || {};
        defaults.get['Content-Type'] = 'application/json';

        return {
            getJsonData: function(){
                return $resource('http://127.0.0.1\\:1337/data/contacts.json', '', {
                    query: {method: 'GET', headers: [
                        {'Content-Type': 'application/json'},
                        {'Accept': 'application/json'}
                    ], isArray: true}
                });
            }
        }

    })

    .factory('ContactsService',
    function ContactsService($q, ContactsDataService, PhonebookService) {
        return function () {
            var defer = $q.defer();
            // Set local storage from json file if it doesn't already exist
            if (PhonebookService.get() === null) {
                ContactsDataService.getJsonData().query({},
                    function (data) {
                        PhonebookService.set(data);
                        defer.resolve(data);
                    },
                    function (data) {
                        alert('Error occurred retrieving contacts, please contact administrator.');
                        defer.resolve([]);
                    });
            }
            else {
                defer.resolve(PhonebookService.get());
            }
            return defer.promise;
        }
    });