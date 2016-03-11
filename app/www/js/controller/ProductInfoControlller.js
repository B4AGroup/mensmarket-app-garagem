/**
 * Created by lmiranda on 3/1/16.
 */
angular.module('garagem')
    .controller('ProductInfoController', function ($scope, $rootScope, $state, $q, $ionicLoading, $ionicPopup, ProductService, ClientService) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if (!ClientService.isLoggedIn()) {
                $state.go('home');
                return;
            }
        });

        var savedProduct = ProductService.getSavedProduct();

        if (null == savedProduct) {
            $state.go('logged-home');
            return;
        }

        $scope.client = ClientService.getClient();
        $scope.product = angular.copy(savedProduct);

        $scope.$watch('product', function (newProduct) {
            var _savedProduct = angular.extend(angular.copy(savedProduct), angular.copy(newProduct));

            _savedProduct.price = parseFloat(_savedProduct.price.replace(/[^0-9,]+/g, '').replace(',', '.'));
            _savedProduct.grossWeight = parseFloat(_savedProduct.grossWeight.replace(/[^0-9,]+/g, '').replace(',', '.'));

            ProductService.updateSavedProduct(_savedProduct);
        }, true);

        $scope.submit = function (product) {
            var newProduct = angular.copy(product);

            $ionicLoading.show({
                template: 'Enviando...'
            });

            newProduct.category = {
                id: savedProduct.category.id,
                name: savedProduct.category.name
            };

            newProduct.client = {
                id: $scope.client.id
            };

            newProduct.stockAmount = 1;

            var photos = [];
            var promises = [];

            for (var key in savedProduct.photos) {
                var data = savedProduct.photos[key];

                var promise = ProductService.addPhoto(data).then(function (response) {
                    var data = response.data;
                    photos.push({
                        photo: {
                            id: data.id,
                            url: data.url
                        }
                    })
                });

                newProduct.garagePhotos = photos;

                promises.push(promise);
            }

            $q.all(promises).then(function () {
                ProductService.upsert(newProduct).then(function () {
                    $ionicLoading.hide();

                    navigator.notification.alert('Seu produto foi enviado com sucesso.', function() {
                        $state.go('logged-home');
                    }, 'Sucesso!');
                }, function (err) {
                    $ionicLoading.hide();

                    navigator.notification.alert('Ocorreu um erro ao tentar enviar seu produto. Por favor, tente novamente.', null, 'Ops! :(');
                });
            }, function (err) {
                console.error(err);
            });
        };
    });