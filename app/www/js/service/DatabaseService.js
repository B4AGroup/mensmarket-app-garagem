/**
 * Created by lmiranda on 3/2/16.
 */
function DatabaseService() {
    this.db = this.createConnection();

    this.db.transaction(function (tx) {
        //tx.executeSql('DROP TABLE IF EXISTS CLIENT');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENT (' +
            'id INTEGER NOT NULL PRIMARY KEY, ' +
            'name TEXT, ' +
            'image TEXT, ' +
            'logged INTEGER)', [], function () {
        });
    });
}

DatabaseService.prototype.createConnection = function () {
    return window.openDatabase("mensmarket.garagem", "1.0", "Men's Market Garagem Database", 200000);
};

DatabaseService.prototype.signinClient = function (client, onSuccess) {
    this.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM CLIENT WHERE id = ?', [
            client.id_alias
        ], function (tx, result) {
            if (result.rows.length > 0) {
                tx.executeSql('UPDATE CLIENT SET logged = 1 WHERE id = ?', [
                    client.id_alias
                ], function () {
                    onSuccess();
                });
            } else {
                tx.executeSql('INSERT INTO CLIENT(id, name, image, logged) VALUES(?, ?, ?, ?)', [
                    client.id_alias, client.nome, client.src_70, 1
                ], function (tx) {
                    onSuccess();
                });
            }
        });
    });
};

DatabaseService.prototype.getLoggedClient = function (onSuccess) {
    this.db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM CLIENT WHERE logged = 1', [], function (tx, result) {
            if (result.rows.length > 0) {
                onSuccess(result.rows[0]);
            } else {
                onSuccess(false);
            }
        });
    });
};

angular.module('garagem').factory('DatabaseService', function () {
    return new DatabaseService();
});