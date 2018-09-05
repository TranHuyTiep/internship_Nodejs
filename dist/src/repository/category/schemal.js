"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 8:50 AM
 */
const Mongoose = require("mongoose");
class Category {
    static get schema() {
        var schema = new Mongoose.Schema({
            name: {
                type: String,
                unique: true,
                required: [true, 'Category name không được bỏ trống'],
                maxlength: 100,
            },
            subCategory: {
                type: Array,
                default: []
            },
            createAt: {
                type: Number,
                default: new Date().getTime()
            }
        });
        return schema;
    }
}
;
var category = Mongoose.model("category", Category.schema);
exports.category = category;
//# sourceMappingURL=schemal.js.map