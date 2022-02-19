'use strict';

angular.module('myApp.file-service', []).service('fileListService', function () {
    return {
        getFileList: getFileList,
        updateFileList: updateFileList
    };

    function getFileList() {
        let files = JSON.parse(localStorage.getItem("files") || '[]')
        return files;
    }

    function updateFileList(value) {
        let files = getFileList();
        files.push(value);
        localStorage.setItem("files", JSON.stringify(files));
        angular.forEach(
            angular.element(document.getElementById("fileInput")),
            function (inputElem) {
                angular.element(inputElem).val(null);
            });
    }
});