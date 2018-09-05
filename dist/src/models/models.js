"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 2:58 PM
 */
const dbConnect_1 = require("../config/dbConnect");
/**
 * Mysql
 */
class QueryMysql extends dbConnect_1.connectMysql {
    constructor(table) {
        super();
        this.table = table;
    }
    /**
     * lay thong tin cua mot bang
     * @param {String} condition
     * @returns {Promise<any>}
     */
    getData(condition) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let Condition = condition || " 1";
            let sql = `SELECT * FROM ${this.table} WHERE ${Condition}`;
            try {
                return yield _super("query").call(this, sql);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    ;
    /**
     * them du lieu vao bang
     * @param {Object} data
     * @returns {Promise<any>}
     */
    insertData(data) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let sqlResetIndex = `ALTER TABLE ${this.table} AUTO_INCREMENT = 1`;
            let sqlInsert = `INSERT INTO ${this.table} SET ? , createAt = now()`;
            try {
                yield _super("query").call(this, sqlResetIndex);
                return yield _super("query").call(this, sqlInsert, data);
            }
            catch (e) {
                throw (e);
            }
            ;
        });
    }
    ;
    /**
     * update du lieu vao bang
     * @param {Object} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    updateData(data, condition) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `UPDATE ${this.table} SET ?,createAt = now() WHERE ${condition}`;
            try {
                return _super("query").call(this, sql, data);
            }
            catch (error) {
                throw (error);
            }
        });
    }
    ;
    /**
     * delete du lieu cua mot bang
     * @param {string} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    deleteData(condition) {
        let sql = `DELETE FROM ${this.table} WHERE ${condition}`;
        try {
            return super.query(sql);
        }
        catch (error) {
            throw (error);
        }
    }
    ;
    /**
     * get time Databese
     * @returns {Promise<any>}
     */
    getTime() {
        let sql = `SELECT NOW() AS time`;
        try {
            return super.query(sql);
        }
        catch (error) {
            throw (error);
        }
    }
}
exports.QueryMysql = QueryMysql;
/**
 * Mongoodb
 */
class QueryMongoodb {
    constructor(schema) {
        this.model = schema;
    }
    /**
     * get data-mysql
     * @param {object} condition
     * @param {object} getList
     * @returns {Promise<any>}
     */
    getData(condition, getList) {
        const promise = new Promise((resolve, reject) => {
            this.model
                .find(condition)
                .select(getList)
                .exec(function (error, users) {
                if (error) {
                    resolve(error);
                }
                else {
                    reject(users);
                }
            });
        });
        return promise;
    }
    /**
     * insert data-mysql
     * @param {object} data
     * @returns {Promise<any>}
     */
    save(data) {
        const promise = new Promise((resolve, reject) => {
            let dataSave = new this.model(data);
            dataSave.save(function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
        return promise;
    }
    ;
    /**
     * update data-mysql by condition
     * @param {object} condition
     * @param {object} data
     * @returns {Promise<any>}
     */
    update(condition, data) {
        const promise = new Promise((resolve, reject) => {
            this.model.update(condition, data, function (err, result) {
                if (err) {
                    resolve(err);
                }
                else {
                    reject(result);
                }
            });
        });
        return promise;
    }
    ;
    /**
     * remove data-mysql by condition
     * @param {object} condition
     * @returns {Promise<any>}
     */
    remove(condition) {
        const promise = new Promise((resolve, reject) => {
            this.model.remove(condition, function (error) {
                if (error) {
                    resolve(error);
                }
                else {
                    reject(true);
                }
            });
        });
        return promise;
    }
    ;
}
exports.QueryMongoodb = QueryMongoodb;
//# sourceMappingURL=models.js.map