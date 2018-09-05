"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 4:23 PM
 */
const models_1 = require("./models");
const schemal_1 = require("../repository/rate/schemal");
class Rate extends models_1.QueryMongoodb {
    constructor(schema) {
        super(schema);
    }
}
exports.Rate = Rate;
;
let rateModel = new Rate(schemal_1.rate);
exports.rateModel = rateModel;
//# sourceMappingURL=rate.js.map