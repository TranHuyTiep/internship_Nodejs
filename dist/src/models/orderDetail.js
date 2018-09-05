"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
class OrderDetailModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
}
exports.OrderDetailModel = OrderDetailModel;
;
let orderDetailModel = new OrderDetailModel('tbl_order_detail');
exports.orderDetailModel = orderDetailModel;
//# sourceMappingURL=orderDetail.js.map