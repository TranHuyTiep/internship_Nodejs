"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
let config = require('../../../config.json');
class connectMysql {
    constructor() {
        this.pool = mysql.createPool(config.db.mysql);
    }
    ;
    /**
     * get connection
     * @returns {Promise<object>}
     */
    getConnect() {
        const promise = new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
        return promise;
    }
    ;
    /**
     * query sql
     * @param {string} sql
     * @param data
     * @returns {Promise<object>}
     */
    query(sql, data) {
        const promise = new Promise(((resolve, reject) => {
            this.getConnect()
                .then(function (connection) {
                connection.query(sql, data, function (error, results) {
                    if (error) {
                        connection.destroy();
                        reject(error);
                    }
                    ;
                    resolve(results);
                    connection.destroy();
                });
            })
                .catch(function (error) {
                reject(error);
            });
        }));
        return promise;
    }
    ;
}
exports.connectMysql = connectMysql;
;
//# sourceMappingURL=dbConnect.js.map