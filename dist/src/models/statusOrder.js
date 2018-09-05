"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
class StatusOrderModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
}
exports.StatusOrderModel = StatusOrderModel;
;
let statusOrderModel = new StatusOrderModel('tbl_status_order');
exports.statusOrderModel = statusOrderModel;
//# sourceMappingURL=statusOrder.js.map