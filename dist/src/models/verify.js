"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 5:09 PM
 */
const models_1 = require("./models");
class VerifyModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
}
exports.VerifyModel = VerifyModel;
;
let verifyModel = new VerifyModel('tbl_verify');
exports.verifyModel = verifyModel;
//# sourceMappingURL=verify.js.map