"use strict";
var app = angular.module('SMProject', ['ngRoute']);

app.controller('Calculator', ['$scope', function ($scope) {
    $scope.selectAll = false;
    // The known parameters
    $scope.parameters = {arrivalRate: 1.0, visitedStores: 5.0};
    // The imposed restrictions to comply with
    $scope.restrictions = {maxUsage: 0.95, maxQueueLength: 5, maxQueueTime: 5.0};
    // servers list a.k.a shops in the shopping mall
    $scope.servers = [{name: "Store 1", proportion: 1.0, serviceRate: 10.0, selected: false, probability: 0.1}];
    $scope.result = 0.0;

    // $scope.$watch('parameters', function () {
    //     if ($scope.parameters.arrivalTime !== 0.0) {
    //         $scope.parameters.arrivalRate = 60.0 / $scope.parameters.arrivalTime;
    //     }
    // }, true);

    $scope.calcProbability = function () {
        var total = $scope.servers.reduce(function (total, currentValue) {
            return total + currentValue.proportion;
        }, 0.0);
        $scope.servers.forEach(function (currentValue, index, arr) {
            arr[index].probability = currentValue.proportion / total;
        });
    };

    $scope.calcMu = function () {
        $scope.calcProbability();
        var mu = $scope.servers.reduce(function (total, currentValue) {
            return total + currentValue.probability * currentValue.serviceRate;
        }, 0.0);
        mu /= $scope.servers.length;
        mu /= $scope.parameters.visitedStores; // Visit multiple stores reduces the overall service rate
        return mu;
    };

    $scope.solve = function () {
        var queue = new MMc($scope.parameters.arrivalRate, $scope.calcMu(), 1);
        $scope.result = queue.simulate($scope.restrictions);
    };

    $scope.addNew = function () {
        var name = "Store " + ($scope.servers.length + 1);
        $scope.servers.push({name: name, proportion: 1.0, serviceRate: 10.0, selected: false, probability: 0.1})
    };

    $scope.remove = function () {
        $scope.selectAll = false;
        $scope.servers = $scope.servers.filter(function (server) {
            return !server.selected;
        });
    };

    $scope.checkAll = function () {
        angular.forEach($scope.servers, function (server) {
            server.selected = $scope.selectAll;
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