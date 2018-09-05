"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 9:03 AM
 */
const models_1 = require("./models");
const schemal_1 = require("../repository/product/schemal");
class ProductModel extends models_1.QueryMongoodb {
    constructor(schema) {
        super(schema);
    }
}
exports.ProductModel = ProductModel;
;
let productModel = new ProductModel(schemal_1.Product);
exports.productModel = productModel;
//# sourceMappingURL=product.js.map