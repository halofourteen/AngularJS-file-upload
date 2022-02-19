'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            activetab: 'view1'
        });
    }]).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
}).controller('View1Ctrl', function ($scope, fileListService) {
    $scope.fileData = {
        'fileContent': '',
        'fileSize': 0,
        'fileName': '',
        'uploadTime': ''
    }

    $scope.showFileContent = function () {
        const file = document.getElementById("fileInput").files[0];
        if (file && file.type === 'text/plain') {
            const fr = new FileReader();
            fr.readAsText(file, "UTF-8");
            fr.onload = function (evt) {
                document.getElementById("fileInput").innerHTML = evt.target.result;
                $scope.fileData.fileContent = fr.result;
                $scope.fileData.fileName = document.getElementById("fileInput").files[0].name;
                $scope.fileData.fileSize = document.getElementById("fileInput").files[0].size;
                $scope.fileData.uploadTime = new Date();
                $scope.$apply();
                fileListService.updateFileList($scope.fileData);
            }
            fr.onerror = function (evt) {
                document.getElementById("fileInput").innerHTML = "error";
                $scope.fileContent = "error";
            }
        } else {
            alert('Only plain text files are accepted');
        }
    }
}).directive('fileUpload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            let onChangeHandler = scope.$eval(attrs.fileUpload);
            element.bind('change', onChangeHandler);
        }
    };
});