/* global angular */
angular.module('app', [])
    .controller('testCtrl', function($scope, $http) {
        $scope.jobs = [];
        
        $http.get('/api/jobs').then(function(response) {
            console.log(response);
            $scope.jobs = response.data;
        });
    });