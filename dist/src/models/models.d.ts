/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 2:58 PM
 */
import { connectMysql } from "../config/dbConnect";
import * as Mongoose from "mongoose";
/**
 * Mysql
 */
export declare class QueryMysql extends connectMysql {
    protected table: String;
    constructor(table: String);
    /**
     * lay thong tin cua mot bang
     * @param {String} condition
     * @returns {Promise<any>}
     */
    getData(condition?: string): Promise<any>;
    /**
     * them du lieu vao bang
     * @param {Object} data
     * @returns {Promise<any>}
     */
    insertData(data: Array<Object> | Object): Promise<any>;
    /**
     * update du lieu vao bang
     * @param {Object} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    updateData(data: object, condition: string): Promise<any>;
    /**
     * delete du lieu cua mot bang
     * @param {string} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    deleteData(condition: string): Promise<any>;
    /**
     * get time Databese
     * @returns {Promise<any>}
     */
    getTime(): Promise<Array<{
        time: Date;
    }>>;
}
/**
 * Mongoodb
 */
export declare class QueryMongoodb {
    protected model: Mongoose.Model<Mongoose.Document>;
    constructor(schema: Mongoose.Model<Mongoose.Document>);
    /**
     * get data-mysql
     * @param {object} condition
     * @param {object} getList
     * @returns {Promise<any>}
     */
    getData(condition: object, getList?: object): Promise<{}>;
    /**
     * insert data-mysql
     * @param {object} data
     * @returns {Promise<any>}
     */
    save(data: object): Promise<{}>;
    /**
     * update data-mysql by condition
     * @param {object} condition
     * @param {object} data
     * @returns {Promise<any>}
     */
    update(condition: object, data: object): Promise<{}>;
    /**
     * remove data-mysql by condition
     * @param {object} condition
     * @returns {Promise<any>}
     */
    remove(condition: object): Promise<{}>;
}
