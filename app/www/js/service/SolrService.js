angular.module('garagem')

    .factory('SolrService', function ($q, $http) {

        function getCategoryTree(categories) {
            var tree = {}, i;

            for(i = 0; i < categories.length; i ++) {
                var current = categories[i];
                if (current.ascendantIds.length == 1) {
                    tree[current.id] = current;
                }
            }

            for(i = 0; i < categories.length; i ++) {
                var current = categories[i];
                if (current.ascendantIds.length > 1) {
                    if (typeof tree[current.parentId].children == 'undefined') {
                        tree[current.parentId].children = {};
                    }

                    tree[current.parentId].children[current.id] = current;
                }
            }

            return tree;
        }

        return {
            getCategories: function () {
                var q = $q.defer();

                $http.get('http://search.mensmkt.com/solr/categories/select?q=ascendantNamesSlug%3Agaragem-da-mens&wt=json&rows=10000&sort=nameSort+asc').then(function successCallback(response) {
                    if (response.data && response.data.response) {
                        var tree = getCategoryTree(response.data.response.docs);

                        q.resolve(tree);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });

                return q.promise;
            },

            getSoldProducts: function(client) {
                var q = $q.defer();

                //$http.get('http://search.mensmkt.com/solr/products/select?q=attr_value_garagem-id-do-usuario:22698&fq=stockAmount:0&wt=json').then(function successCallback(response) {
                $http.get('http://search.mensmkt.com/solr/products/select?q=attr_value_garagem-id-do-usuario:'+ client +'&fq=stockAmount:0&wt=json').then(function successCallback(response) {
                    if (response.data && response.data.response) {
                        q.resolve(response.data.response.docs);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });

                return q.promise;
            },

            getForSaleProducts: function(client) {
                var q = $q.defer();

                //$http.get('http://search.mensmkt.com/solr/products/select?q=attr_value_garagem-id-do-usuario:22698&fq=stockAmount:[1%20TO%20*]&wt=json').then(function successCallback(response) {
                $http.get('http://search.mensmkt.com/solr/products/select?q=attr_value_garagem-id-do-usuario:'+ client +'&fq=stockAmount:[1%20TO%20*]&wt=json').then(function successCallback(response) {
                    if (response.data && response.data.response) {
                        q.resolve(response.data.response.docs);
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });

                return q.promise;
            }
        }
    });