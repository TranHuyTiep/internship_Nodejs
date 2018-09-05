import { QueryMysql } from "./models";
import { inforUserInterface } from "../repository/interface";
export declare class InforUserModel extends QueryMysql {
    constructor(table: string);
    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    getInforUser(condition?: string): Promise<Array<inforUserInterface>>;
    /**
     * them user
     * @param {Array<object> | Object} data
     * @returns {Promise<any>}
     */
    insertInforUser(data: Array<object> | object): Promise<any>;
}
export { inforUserModel };
