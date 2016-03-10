/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem').controller('MyGarageController', function ($scope, $rootScope, $state, $q, ClientService, SolrService) {

    var client = $scope.client = ClientService.getClient();
    var loadProducts = function() {
        $scope.loading = true;

        var promises = [];

        promises.push(SolrService.getForSaleProducts(client.idAlias).then(function(forSaleProducts) {
            $scope.forSaleProducts = forSaleProducts;
        }));

        promises.push(SolrService.getSoldProducts(client.idAlias).then(function(soldProducts) {
            $scope.soldProducts = soldProducts;
        }));

        $q.all(promises).then(function() {
            $scope.loading = false;
        });
    };

    $scope.selectedTab = 'forSaleProducts';
    $scope.selectTab = function(tab) {
        $scope.selectedTab = tab;
    };

    loadProducts();
});