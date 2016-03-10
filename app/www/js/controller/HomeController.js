/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('HomeController', function ($scope, $rootScope, $state, ClientService) {
    $scope.loggedIn = true;

    if (!ClientService.isLoggedIn()) {
        $scope.loggedIn = false;
        return;
    }

    $state.go('logged-home');
});