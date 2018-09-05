import {QueryMysql} from "./models"

export class OrderModel extends QueryMysql{
    constructor(table: string){
        super(table)
    }
};

let orderModel = new OrderModel('tbl_order');

export {orderModel}