angular.module('phonebookServices', ['LocalStorageModule','contactServices'])

    .factory('PhonebookService',
    function PhonebookService(localStorageService) {
        return {
            add: function (newItem) {
                var item = (this.get() || []).concat(newItem);
                this.set(item);
            },
            get: function (id) {
                var ab = localStorageService.get('AddressBook');
                if (ab && id) {
                    return ab[id];
                }
                return ab;
            },
            set: function (item) {
                localStorageService.set('AddressBook', item);
            },
            remove: function (id) {
                var ab = this.get();
                ab.splice(id, 1);
                this.set(ab);
            },
            update: function (id, item) {
                var ab = this.get();
                ab.splice(id, 1, item);
                this.set(ab);
            }
        }
    });