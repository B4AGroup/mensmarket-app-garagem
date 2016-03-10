/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem')
    .controller('ProductCategoryController', function ($scope, $rootScope, $state, $ionicModal, $ionicLoading, SolrService, ProductService, ClientService) {
        $scope.$on('$ionicView.beforeEnter', function() {
            if (!ClientService.isLoggedIn()) {
                $state.go('home');
                return;
            }
        });

        var savedProduct = ProductService.getSavedProduct();

        if (null == savedProduct) {
            $state.go('home');
            return;
        }

        console.info(savedProduct);

        $ionicLoading.show({
            template: 'Carregando...'
        });

        SolrService.getCategories().then(function (categories) {
            $scope.categories = categories;
            $ionicLoading.hide();
        });

        $ionicModal.fromTemplateUrl('subcategory-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.subCategoryModal = modal;
        });

        $scope.showSubCategories = function (id) {
            $scope.modalTitle = $scope.categories[id].name;
            $scope.subCategories = $scope.categories[id].children;

            $scope.subCategoryModal.show();
        };

        $scope.selectCategory = function (id) {
            $scope.subCategoryModal.hide();

            savedProduct.category = $scope.subCategories[id];
            ProductService.updateSavedProduct(savedProduct);

            $state.go('product-info');
        };
    });