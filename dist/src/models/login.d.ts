import { QueryMysql } from "./models";
import { userInterface } from "../repository/interface";
export declare class UserModel extends QueryMysql {
    constructor(table: string);
    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    getUser(condition?: string): Promise<Array<userInterface>>;
    /**
     * them user
     * @param {Array<object> | Object} data
     * @returns {Promise<any>}
     */
    insertUser(data: Array<object> | object): Promise<any>;
}
export { userModel };
