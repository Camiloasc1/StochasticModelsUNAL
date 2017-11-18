"use strict";
var app = angular.module('SMProject', ['ngRoute']);

app.controller('Calculator', ['$scope', function ($scope) {
    $scope.selectAll = false;
    // The known parameters
    $scope.parameters = {arrivalRate: 1.0};
    // The imposed restrictions to comply with
    $scope.restrictions = {maxUsage: 0.95, maxQueueLength: 5, maxQueueTime: 5.0};
    // servers list a.k.a shops in the shopping mall
    $scope.servers = [{name: "", proportion: 1, serviceRate: 1.0, selected: false, probability: 0.1}];
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

    $scope.addNew = function () {
        $scope.servers.push({
            'name': "",
            'prob_arrival': "",
            'service_time': ""
        })
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