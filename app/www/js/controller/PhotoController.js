angular.module('garagem').controller('PhotoController', function ($scope, $rootScope, $state, $ionicActionSheet, PhotoService, ClientService, ProductService) {
    $scope.$on('$ionicView.beforeEnter', function () {
        if (!ClientService.isLoggedIn()) {
            $state.go('home');
        }
    });

    var product = ProductService.getSavedProduct() || {};
    $scope.images = product.photos || {};

    $scope.allowNewPhotos = true;
    $scope.allowToContinue = false;

    function getPhotos() {
        var photos = {};

        for (var key in $scope.images) {
            if ($scope.images[key] != 'empty') {
                photos[key] = $scope.images[key];
            }
        }

        return photos;
    }

    function photosArraySize() {
        var size = 0;

        for (var key in $scope.images) {
            if ($scope.images.hasOwnProperty(key) && $scope.images[key] != 'empty') {
                size++;
            }
        }
        return size;
    }

    function updateImagesArr() {
        var $size = photosArraySize();
        var images = {};

        var counter = 0;
        for (var i = 0; i < 4; i++) {
            if (typeof $scope.images[i] == 'undefined') {
                continue;
            }

            images[counter++] = $scope.images[i];
        }

        for (i = $size; i < 4; i++) {
            images[i] = 'empty';
        }

        $scope.images = images;

        $size = photosArraySize();
        $scope.allowNewPhotos = $size < 4;
        $scope.allowToContinue = $size > 0;

        product.photos = getPhotos();
        ProductService.updateSavedProduct(product);
    }

    function addPhoto(dataUrl) {
        var size = photosArraySize();

        $scope.images[size] = dataUrl;

        updateImagesArr();
    }

    $scope.newPhoto = function ($event) {
        $ionicActionSheet.show({
            titleText: 'Opção de foto',
            buttons: [
                {text: '<i class="icon ion-camera dark"></i>Câmera'},
                {text: '<i class="icon ion-images dark"></i>Galeria'}
            ],
            cancelText: 'Cancelar',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                switch (index) {
                    case 0:
                        $scope.getFromCamera();
                        break;

                    case 1:
                        $scope.getFromLibrary();
                        break;
                }

                return true;
            }
        });
    };

    $scope.getFromLibrary = function () {
        PhotoService.getFromLibrary().then(function (result) {
            addPhoto(result.dataUrl);
        });
    };

    $scope.getFromCamera = function () {
        PhotoService.getFromCamera().then(function (result) {
            addPhoto(result.dataUrl);
        });
    };

    $scope.removePhoto = function (index) {
        delete $scope.images[index];
        updateImagesArr();
    };

    $scope.continue = function () {
        $state.go('product-category');
    };

    updateImagesArr();
});
