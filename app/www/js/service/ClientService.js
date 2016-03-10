/**
 * Created by lmiranda on 3/2/16.
 */
angular.module('garagem').factory('ClientService', function ($q) {

    function _setClient(clientObj) {
        var defer = $q.defer();

        var client = {
            id: clientObj.id,
            idAlias: clientObj.id_alias,
            name: clientObj.nome1,
            surname: clientObj.nome2,
            image: clientObj.src_160
        };

        if (typeof clientObj.src_160 == 'string') {
            var clientImage = new Image();

            clientImage.onerror = function () {
                client.image = '../img/no-avatar-70.png';

                localStorage.setItem('client', JSON.stringify(client));

                defer.resolve(client);
            };

            clientImage.onload = function () {
                client.image = this.src;

                localStorage.setItem('client', JSON.stringify(client));

                defer.resolve(client);
            };

            clientImage.src = 'http://' + clientObj.src_160;
        }

        return defer.promise;
    }

    function _getClient() {
        var client = localStorage.getItem('client');
        if (client) {
            return JSON.parse(client);
        }

        return null;
    }

    function _removeClient() {
        localStorage.removeItem('client');
    }

    return {
        logout: function () {
            return _removeClient();
        },

        signin: function (email, password) {
            var defer = $q.defer();

            window.plugins.CordovaHttpPlugin.acceptAllCerts(true);
            window.plugins.CordovaHttpPlugin.postJson('https://api.mensmarket.com.br/ws/v1/client/login/', {
                email: email,
                senha: password
            }, {
                'Content-Type': 'application/json'
            }, function (response) {
                try {
                    var data = JSON.parse(response.data);

                    if (data.status == 1) {
                        var clientObj = data.content;

                        _setClient(clientObj).then(function (client) {
                            defer.resolve(client);
                        });

                    } else {
                        defer.reject(0);
                    }
                } catch (e) {
                    defer.reject(1);
                }
            }, function (response) {
                defer.reject(2);
            });

            return defer.promise;
        },

        signup: function (clientObj) {
            var defer = $q.defer();

            if (typeof clientObj.birth == 'object') {
                var day = ('00' + clientObj.birth.getDate()).substr(-2);
                var month = ('00' + (clientObj.birth.getMonth() + 1)).substr(-2);
                var year = clientObj.birth.getFullYear();

                clientObj.birth = day + '/' + month + '/' + year.toString();
            }

            var client = {
                'nome1': clientObj.name,
                'nome2': clientObj.surname,
                'email': clientObj.email,
                'senha': clientObj.password,
                'documento1': clientObj.cpf,
                'data_nascimento': clientObj.birth
            };

            window.plugins.CordovaHttpPlugin.acceptAllCerts(true);
            window.plugins.CordovaHttpPlugin.postJson('https://api.mensmarket.com.br/ws/v1/client/signup', client, {
                'Content-Type': 'application/json'
            }, function (response) {
                var data = JSON.parse(response.data);
                if (data.status === 0) {
                    if (data.message) {
                        defer.reject(data.message);
                    }
                } else if (data.status === 1) {
                    var clientObj = data.content.dados;
                    clientObj.src_160 = 'none';

                    _setClient(clientObj).then(function (client) {
                        defer.resolve(client);
                    });
                }
            }, function (response) {


                if (response.message) {
                    defer.reject(response.message);
                }
            });

            return defer.promise;
        },

        getClient: _getClient,

        isLoggedIn: function () {
            return null != this.getClient();
        }
    }
});