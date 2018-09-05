"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
class OrderModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
}
exports.OrderModel = OrderModel;
;
let orderModel = new OrderModel('tbl_order');
exports.orderModel = orderModel;
//# sourceMappingURL=order.js.map