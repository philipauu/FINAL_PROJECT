console.log('loaded frontend app');

var frontend_app = angular.module('parking_app', []);

frontend_app.controller('all_address_controller', do_all_addresses);

function do_all_addresses($scope, $http) {
    console.log('inside do_all_addresses');

    $scope.read = function () {
        console.log('reading all records');

        $http.get('/api/read')
            .then(function (results) {
                console.log('doing results');
                $scope.addresses = results.data;

                console.log($scope.addresses);
            });
    }

    $scope.read();

    $scope.create = function () {
        console.log('creating new addresses');

        var data = {
            name: $scope.input.name,
            building: $scope.input.buildingName,
            street: $scope.input.streetName,
            number: $scope.input.buildingNo,
            floor: $scope.input.floor,
            area: $scope.input.subDistrict,
            district: $scope.input.dcDistrict,
            region: $scope.input.region,
            contact: $scope.input.contactNo,
            website: $scope.input.website,
            hours: $scope.input.openingHours,
            facilities: $scope.input.facilities,
            payment: $scope.input.paymentMethods
        };

        $http.post('/api/create', data)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

    $scope.update = function (address) {
        console.log('updating address');
        console.log(address);

        $http.put('/api/update', address)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

    $scope.delete = function (address) {
        console.log('deleting address');
        console.log(address);
        $http.delete('/api/delete' + address._id)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

}