/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('LoggedHomeController', function ($scope, $rootScope, $state, $ionicPlatform, $ionicPopover, $ionicHistory, ClientService, SolrService) {
    var client = ClientService.getClient();

    $scope.client = client;
    $scope.loadingProductsCount = true;

    if (client && client.idAlias) {
        SolrService.getForSaleProducts(client.idAlias).then(function (result) {
            $scope.loadingProductsCount = false;
            $scope.forSaleProductsCount = result.length;
        });
    }
});