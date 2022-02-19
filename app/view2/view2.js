'use strict';

angular.module('myApp.view2', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl',
            activetab: 'view2'
        });
    }]).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
}).controller('View2Ctrl', function ($scope, fileListService) {
    $scope.fileList = fileListService.getFileList();
});