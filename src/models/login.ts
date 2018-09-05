import {QueryMysql} from "./models"
import {userInterface} from "../repository/interface";

export class UserModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }

    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public async getUser(condition ?: string) : Promise<Array<userInterface>>{
        try {
            let users = await super.getData(condition)
            return users;
        }catch (e) {
            throw (e)
        }
    };

    /**
     * them user
     * @param {Array<object> | Object} data
     * @returns {Promise<any>}
     */
    public async insertUser(data: Array<object> | object): Promise<any>{
        try {
          return super.insertData(data)
        }catch (e) {
            throw e
        }
    }
};

let userModel = new UserModel('tbl_login');

export {userModel}