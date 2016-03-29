/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('LoadingController', function ($state, $rootScope, $ionicHistory, ClientService) {
    function ready() {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });

        $state.go(ClientService.isLoggedIn() ? 'logged-home' : 'home', null, {
            location: 'replace'
        });
    }

    $rootScope.$on('applicationReady', ready);

    if ($rootScope.applicationReady) {
        ready();
    }
});