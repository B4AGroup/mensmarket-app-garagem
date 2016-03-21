/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('SigninController', function ($scope, $state, $ionicHistory, $timeout, ClientService) {
    function onSigninSuccess(client) {
        $ionicHistory.nextViewOptions({
            historyRoot: true
        });

        $state.go('logged-home');
    }

    function onSigninError(errorCode) {
        $scope.loading = false;

        if (errorCode === 0) {
            navigator.notification.alert('Usuário ou senha estão incorretos', null, 'Ops! :(');
        } else {
            navigator.notification.alert('Ocorreu um erro ao tentar efetuar o login. Por favor, tente novamente', null, 'Ops! :(');
        }
    }

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.loading = false;
    });

    $scope.signin = function (client) {
        $scope.loading = true;

        document.body.blur();

        ClientService.signin(client.email, client.password).then(onSigninSuccess, onSigninError);
    };
});