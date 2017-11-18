"use strict";
var app = angular.module('SMProject', ['ngRoute']);

app.controller('Calculator', ['$scope', function ($scope) {
    $scope.selectAll = false;
    // The known parameters
    $scope.parameters = {arrivalRate: 1.0};
    // The imposed restrictions to comply with
    $scope.restrictions = {maxUsage: 0.95, maxQueueLength: 5, maxQueueTime: 5.0};
    // servers list a.k.a shops in the shopping mall
    $scope.servers = [{name: "", proportion: 1, serviceRate: 1.0, probability: 0.1}];
    $scope.result = 0.0;
    $scope.queue = new MMc(30, 12, 5);

    $scope.solve = function () {
        $scope.result = $scope.queue.simulate($scope.restrictions);
    };

    // $scope.$watch('parameters', function () {
    //     if ($scope.parameters.arrivalTime !== 0.0) {
    //         $scope.parameters.arrivalRate = 60.0 / $scope.parameters.arrivalTime;
    //     }
    // }, true);

    $scope.stores = [
        {
            'name': 'Jhon Doe',
            'prob_arrival': 0.5,
            'service_time': 2
        }
    ];

    $scope.addNew = function (store) {
        $scope.stores.push({
            'name': "",
            'prob_arrival': "",
            'service_time': ""
        })
    };

    $scope.remove = function () {
        var newDataList = [];
        $scope.selectAll = false;
        angular.forEach($scope.stores, function (store) {
            if (!store.selected) {
                newDataList.push(store);
            }
        });
        $scope.stores = newDataList;
    };

    $scope.checkAll = function () {
        angular.forEach($scope.stores, function (store) {
            store.selected = $scope.selectAll;
        });
    };
}]);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/Calculator.html',
            controller: 'Calculator'
        })

        .otherwise({redirectTo: '/'});

    //html5mode causes several issues when the front end is embedded with the web service.
    $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
}]);