/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('SignupController', function ($scope, $state, $ionicLoading, $ionicHistory, ClientService) {
    function onSignupSuccess(client) {
        $ionicLoading.hide();

        $ionicHistory.nextViewOptions({
            historyRoot: true
        });

        $state.go('logged-home');
    }

    function onSignupError(message) {
        $ionicLoading.hide();

        if (message) {
            navigator.notification.alert(message);
        }
    }

    $scope.submit = function (client) {
        $ionicLoading.show({
            template: 'Enviando...'
        });

        ClientService.signup(client).then(onSignupSuccess, onSignupError);
    };

});