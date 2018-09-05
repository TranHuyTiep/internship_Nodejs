import * as mysql from "mysql";
export declare class connectMysql {
    pool: mysql.Pool;
    constructor();
    /**
     * get connection
     * @returns {Promise<object>}
     */
    getConnect(): Promise<any>;
    /**
     * query sql
     * @param {string} sql
     * @param data
     * @returns {Promise<object>}
     */
    query(sql: string, data?: object | Array<object>): Promise<any>;
}
