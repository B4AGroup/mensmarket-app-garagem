/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('SigninController', function ($scope, $state, $ionicHistory, ClientService) {
    function onSigninSuccess(client) {
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });

        $state.go('logged-home');
    }

    function onSigninError(errorCode) {
        $scope.loading = false;

        if (errorCode === 0) {
            navigator.notification.alert('Usuário ou senha estão incorretos');
        } else {
            navigator.notification.alert('Ocorreu um erro ao tentar efetuar o login. Por favor, tente novamente');
        }
    }

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.loading = false;
    });

    $scope.signin = function (client) {
        $scope.loading = true;

        ClientService.signin(client.email, client.password).then(onSigninSuccess, onSigninError);
    };
});