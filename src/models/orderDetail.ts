import {QueryMysql} from "./models"

export class OrderDetailModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }
};

let orderDetailModel = new OrderDetailModel('tbl_order_detail');

export {orderDetailModel}