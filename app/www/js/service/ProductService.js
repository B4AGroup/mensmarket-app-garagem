/**
 * Created by lmiranda on 3/2/16.
 */
angular.module('garagem').factory('ProductService', function ($q, $http) {
    var extraHeaders = {
        'Authorization': 'Basic YWRtaW46ZTg2Zjc4YThhM2NhZjBiNjBkOGU3NGU1OTQyYWE2ZDg2ZGMxNTBjZDNjMDMzMzhhZWYyNWI3ZDJkN2UzYWNjNw=='
    };

    function _getSavedProduct() {
        var newProduct = localStorage.getItem('savedProduct');
        if (newProduct) {
            return JSON.parse(newProduct);
        }

        return null;
    }

    function _updateSavedProduct(product) {
        localStorage.setItem('savedProduct', JSON.stringify(product));
    }

    function _deleteSavedProduct() {
        localStorage.removeItem('savedProduct');
    }

    return {
        getSavedProduct: _getSavedProduct,
        updateSavedProduct: _updateSavedProduct,

        upsert: function (obj) {
            return $http.post('http://ws.mensmkt.com/garage-products/upsert', obj, {
                headers: extraHeaders
            }).then(function () {
                _deleteSavedProduct();
            });
        },

        addPhoto: function (data) {
            return $http.post('http://ws.mensmkt.com/image/upload/garage-product', {
                content: data.split(',')[1]
            }, {
                headers: extraHeaders
            });
        }
    }
});