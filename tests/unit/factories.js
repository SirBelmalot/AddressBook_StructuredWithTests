describe("Phone book app service test", function () {
    var contacts = {};
    var mockLocalStorage = function () {
        return {
            get: function (key) {
                var res = contacts[key];
                if (typeof res === 'undefined') return null;
                return res;
            },
            set: function (key, value) {
                contacts[key] = value;
            }
        };
    };

    beforeEach(function () {
        module('phonebookServices');
        module(function ($provide) {
            $provide.factory('localStorageService', mockLocalStorage);
        });
    });

    var testTerry = {
        "Firstname": "Terry",
        "Surname": "Test",
        "Email": "terrytest@gmail.com",
        "Address1": "1 A Street",
        "Address2": "Manilva",
        "City": "Malaga",
        "ZipCode": "29692",
        "Country": "Spain",
        "Phone": {
            "Prefix": "0034",
            "PhoneNumber": "674446756",
            "PhoneType": "Mobile"
        }
    };
    var testJerry = {
        "Firstname": "Jerry",
        "Surname": "Json",
        "Email": "jerryjson@gmail.com",
        "Address1": "11 B Street",
        "Address2": "",
        "City": "Malaga",
        "ZipCode": "29692",
        "Country": "Spain",
        "Phone": {
            "Prefix": "0034",
            "PhoneNumber": "66767676",
            "PhoneType": "Mobile"
        }
    };
    var updatedJerry = {
        "Firstname": "Jerry",
        "Surname": "Test",
        "Email": "jerryjson@gmail.com",
        "Address1": "11 B Street",
        "Address2": "Marbella",
        "City": "Malaga",
        "ZipCode": "29692",
        "Country": "Spain",
        "Phone": {
            "Prefix": "0034",
            "PhoneNumber": "66767676",
            "PhoneType": "Mobile"
        }
    };

    it('empty at beginning and return null', function () {
        inject(function (PhonebookService) {
            expect(typeof(contacts.AddressBook)).toEqual('undefined');
            expect(PhonebookService.get()).toEqual(null);
        });
    });

    it('can set items', function () {
        inject(function (PhonebookService) {
            PhonebookService.set([testTerry]);
            expect(contacts.AddressBook.length).toEqual(1);
            expect(contacts.AddressBook[0]).toEqual(testTerry);
        });
    });

    it('can add item', function () {
        inject(function (PhonebookService) {
            PhonebookService.add(testJerry);
            expect(contacts.AddressBook.length).toEqual(2);
            expect(contacts.AddressBook[1]).toEqual(testJerry);
        });
    });

    it('can edit item', function () {
        inject(function (PhonebookService) {
            PhonebookService.update('1', updatedJerry);
            expect(contacts.AddressBook.length).toEqual(2);
            expect(contacts.AddressBook[1]).toEqual(updatedJerry);
        });
    });

    it('can remove item', function () {
        inject(function (PhonebookService) {
            PhonebookService.remove('0');
            expect(contacts.AddressBook.length).toEqual(1);
            expect(contacts.AddressBook[0]).toEqual(updatedJerry);
        });
    });
});


