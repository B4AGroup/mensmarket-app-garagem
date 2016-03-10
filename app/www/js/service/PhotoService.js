angular.module('garagem')

    .factory('PhotoService', function ($q) {

        function getPicture(onSuccess, onFail, sourceType) {
            navigator.camera.getPicture(function (result) {
                onSuccess({
                    rawDataUrl: result,
                    dataUrl: "data:image/jpeg;base64," + result
                });
            }, function (err) {
                onFail(err);
            }, {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                encodingType: Camera.EncodingType.JPEG,
                sourceType: sourceType,
                allowEdit: true,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            });
        }

        return {
            getFromLibrary: function () {
                var q = $q.defer();

                getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, Camera.PictureSourceType.PHOTOLIBRARY);

                return q.promise;
            },

            getFromCamera: function () {
                var q = $q.defer();

                getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, Camera.PictureSourceType.CAMERA);

                return q.promise;
            }
        }
    });
