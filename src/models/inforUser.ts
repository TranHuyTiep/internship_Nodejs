import {QueryMysql} from "./models"
import {inforUserInterface} from "../repository/interface";

export class InforUserModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }

    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public async getInforUser(condition ?: string) : Promise<Array<inforUserInterface>>{
        let Condition = condition || " 1";
        let sql: string = `
            SELECT tbl_user_informations.*, tbl_login.email, tbl_login.username, tbl_login.password  
            FROM tbl_login 
            LEFT JOIN tbl_user_informations
            ON tbl_user_informations.login_id = tbl_login.login_id
            WHERE tbl_login.${Condition}`;

        try {
            let infor = await super.query(sql)
            return infor;
        }catch (e) {
            throw (e)
        }
    };

    /**
     * them user
     * @param {Array<object> | Object} data
     * @returns {Promise<any>}
     */
    public async insertInforUser(data: Array<object> | object): Promise<any>{
        try {
            return super.insertData(data)
        }catch (e) {
            throw e
        };
    };


};

let inforUserModel = new InforUserModel('tbl_user_informations');

export {inforUserModel}