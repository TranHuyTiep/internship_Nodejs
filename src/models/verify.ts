/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 5:09 PM
 */
import {QueryMysql} from "./models"

export class VerifyModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }

};

let verifyModel = new VerifyModel('tbl_verify');

export {verifyModel}