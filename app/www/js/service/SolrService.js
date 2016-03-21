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

                window.plugins.CordovaHttpPlugin.acceptAllCerts(true);
                window.plugins.CordovaHttpPlugin.get('http://search.mensmkt.com/solr/categories/select', {
                    q: 'ascendantNamesSlug:garagem-da-mens',
                    wt: 'json',
                    rows: '10000',
                    sort: 'nameSort asc',
                    fq: 'showMenu:true'
                }, {}, function(response) {
                    if (response.data) {
                        var json = JSON.parse(response.data);
                        var tree = getCategoryTree(json.response.docs);

                        q.resolve(tree);
                    }
                }, function(err) {
                    q.reject(err);
                });

                return q.promise;
            },

            getSoldProducts: function(client) {
                var q = $q.defer();

                window.plugins.CordovaHttpPlugin.acceptAllCerts(true);
                window.plugins.CordovaHttpPlugin.get('http://search.mensmkt.com/solr/products/select', {
                    q: 'attr_value_garagem-id-do-usuario:'+ client,
                    wt: 'json',
                    fq: 'stockAmount:0',
                    sort: 'nameSort asc'
                }, {}, function(response) {
                    if (response.data) {
                        var json = JSON.parse(response.data);
                        q.resolve(json.response.docs);
                    }
                }, function(err) {
                    q.reject(err);
                });

                return q.promise;
            },

            getForSaleProducts: function(client) {
                var q = $q.defer();

                window.plugins.CordovaHttpPlugin.acceptAllCerts(true);
                window.plugins.CordovaHttpPlugin.get('http://search.mensmkt.com/solr/products/select', {
                    q: 'attr_value_garagem-id-do-usuario:'+ client,
                    wt: 'json',
                    fq: 'stockAmount:[1 TO *]',
                    sort: 'nameSort asc'
                }, {}, function(response) {
                    if (response.data) {
                        var json = JSON.parse(response.data);
                        q.resolve(json.response.docs);
                    }
                }, function(err) {
                    q.reject(err);
                });

                return q.promise;
            }
        }
    });