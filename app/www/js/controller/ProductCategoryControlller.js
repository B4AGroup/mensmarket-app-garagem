/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem')
    .controller('ProductCategoryController', function ($scope, $rootScope, $state, $ionicModal, $ionicLoading, $timeout, SolrService, ProductService, ClientService) {
        var savedProduct = ProductService.getSavedProduct();

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.loadingCategories = true;
        });

        if (null == savedProduct) {
            $state.go('home');
            return;
        }

        $timeout(function () {
            SolrService.getCategories().then(function (categories) {
                $scope.loadingCategories = false;
                $scope.categories = categories;
            });
        }, 100);

        $ionicModal.fromTemplateUrl('templates/subcategory-modal.html', {
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