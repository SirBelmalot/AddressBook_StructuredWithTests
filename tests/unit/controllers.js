describe("Phone book app controllers test", function () {
    var $rootScope, $controller, scope, routeParams, phoneBook, contactModel, location;
    var nill = function () {
    };
    var contacts = {};
    var mockPhonebook = function () {
        return {
            add: function (item) {
                contacts.add = JSON.stringify(item);
            },
            get: function (id) {
                contacts.get = id;
                return id;
            },
            set: nill,
            remove: function (id) {
                contacts.remove = id;
            },
            update: function (id, value) {
                var res = {};
                res[id] = value;
                contacts.update = JSON.stringify(res);
            }
        };
    };
    var mockContactModel = function () {
        return function () {
            return {
                name: 'abc'
            }
        }
    };
    beforeEach(function () {
        module('contactControllers');
        module(function ($provide) {
            $provide.factory('Phonebook', mockPhonebook);
        });
        module(function ($provide) {
            $provide.factory('ContactModel', mockContactModel);
        });
    });
    beforeEach(inject(function (_$rootScope_, _$controller_, Phonebook, ContactModel) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        scope = $rootScope.$new();
        routeParams = {};
        phoneBook = Phonebook;
        contactModel = ContactModel;
        location = {
            url: nill
        };
    }));

    describe("details Controller", function () {

        beforeEach(function () {
            routeParams.id = '1';
            $controller("detailsCtrl", {
                $scope: scope,
                $routeParams: routeParams,
                Phonebook: phoneBook
            });
        });

        it("should call Phonebook get with id", function () {
            expect(scope.contact).toBe('1');
            expect(contacts.get).toBe('1');
        });
    });

    describe("create Controller", function () {

        beforeEach(function () {
            $controller("createCtrl", {
                $scope: scope,
                $location: location,
                Phonebook: phoneBook,
                ContactModel: contactModel
            });
        });

        it("should call Phonebook add with name", function () {
            expect(scope.contact.name).toBe('abc');
            scope.add();
            expect(contacts.add).toBe(JSON.stringify({name: 'abc'}));
        });
    });

    describe("update Controller", function () {

        beforeEach(function () {
            routeParams.id = '1';
            $controller("updateCtrl", {
                $scope: scope,
                $routeParams: routeParams,
                $location: location,
                Phonebook: phoneBook
            });
        });

        it("should call Phonebook get with id", function () {
            expect(scope.contact).toBe('1');
            scope.contact = 'def';
            scope.update();
            expect(contacts.update).toBe(JSON.stringify({'1': 'def'}));
        });
    });

    describe("delete Controller", function () {

        beforeEach(function () {
            routeParams.id = '1';
            $controller("deleteCtrl", {
                $scope: scope,
                $routeParams: routeParams,
                $location: location,
                Phonebook: phoneBook
            });
        });

        it("should call Phonebook get with id", function () {
            expect(scope.contact).toBe('1');
            scope.delete();
            expect(contacts.remove).toBe('1');
        });
    });
});


