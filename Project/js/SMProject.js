"use strict";
var app = angular.module('SMProject', ['ngRoute']);

app.controller('Calculator', ['$scope', function ($scope) {

    function lotBuilding(id,target,text,color){

        //General Element
        var canvas = document.createElement('canvas');
        canvas.height = 300;
        canvas.width  = 200;
        canvas.id = "ParkingLot"+1;

        // Context
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgba(0,0,0,.2)";
        ctx.strokeStyle="black";
        ctx.fillRect(0,0,180,300);
        ctx.fillStyle = color;

        if(id == 0){
            ctx.fillRect(0,300*(1-target),180,300);
        }

        if(id == 1){
            ctx.fillRect(0,300*(1-(target/$scope.restrictions.maxQueueTime)),180,300);
        }

        if(id == 2){

            ctx.fillRect(0,300*(1-(target/$scope.restrictions.maxQueueLength)),180,300);

        }



        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";


        if(id == 0) {
            ctx.fillText((target * 100).toFixed(1) + "%", (canvas.width-10) / 2, canvas.height / 2);
        }

        if(id == 1){
            ctx.fillText(target.toFixed(1), (canvas.width -10)/ 2, canvas.height / 2);
        }

        if(id == 2){
            ctx.fillText(target.toFixed(1), (canvas.width -10)/ 2, canvas.height / 2);
        }
        ctx.font = "15px Comic Sans MS";
        ctx.fillText(text, (canvas.width-10)/2, canvas.height/2 + 50);
        var parkingLot = document.getElementById('parkingLot');
        parkingLot.appendChild(canvas);
        $scope.canvas.push(canvas);
    }

    $scope.canvas = []

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

        var parkingLot = document.getElementById('parkingLot');
        for(var i = 0; i < $scope.canvas.length;i++){
            parkingLot.removeChild($scope.canvas[i]);
        }
        $scope.canvas = [];

        var queue = new MMc($scope.parameters.arrivalRate, $scope.calcMu(), 1);
        $scope.result = queue.simulate($scope.restrictions);

        lotBuilding(0,queue.calc_usage(),"Parking Utilization","#99ffcc");
        lotBuilding(1,queue.calc_Wq(), "Time Spent on Queue", "#99ccff");
        lotBuilding(2,queue.calc_Lq(), "Queue Length", "#ff9999");
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