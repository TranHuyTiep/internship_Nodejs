"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 4:12 PM
 */
const models_1 = require("./models");
const schemal_1 = require("../repository/category/schemal");
class CategoryModel extends models_1.QueryMongoodb {
    constructor(schema) {
        super(schema);
    }
}
exports.CategoryModel = CategoryModel;
;
let categoryModel = new CategoryModel(schemal_1.category);
exports.categoryModel = categoryModel;
//# sourceMappingURL=category.js.map