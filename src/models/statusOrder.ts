import {QueryMysql} from "./models"

export class StatusOrderModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }
};

let statusOrderModel = new StatusOrderModel('tbl_status_order');

export {statusOrderModel}