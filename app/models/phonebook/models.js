angular.module('phonebookModels', [])

    .factory('ContactModel',
    function ContactModel() {
        return function () {
            return {
                "Firstname": "",
                "Surname": "",
                "Email": "",
                "Address1": "",
                "Address2": "",
                "City": "",
                "ZipCode": "",
                "Country": "",
                "Phone": {
                    "Prefix": "",
                    "PhoneNumber": "",
                    "PhoneType": ""
                }
            };
        };
    });