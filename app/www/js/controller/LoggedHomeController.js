/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('LoggedHomeController', function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, $ionicHistory, ClientService, SolrService) {
    $ionicPlatform.registerBackButtonAction(function () {
        if ($ionicHistory.currentStateName() == 'logged-home') {
            navigator.app.exitApp();
        } else {
            $ionicHistory.goBack(-1);
        }
    }, 100);

    if (!ClientService.isLoggedIn()) {
        $state.go('home');
        return;
    }



    var client = ClientService.getClient();
    $scope.client = client;
    $scope.loadingProductsCount = true;

    SolrService.getForSaleProducts(client.idAlias).then(function(result) {
        $scope.loadingProductsCount = false;
        $scope.forSaleProductsCount = result.length;
    });
});