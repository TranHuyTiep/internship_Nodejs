import {QueryMysql} from "./models"

export class UserModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }

    /**
     * get data user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public getUser(condition ?: string) : Promise<any>{
       let users = super.getData(condition)

        return users;
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