/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 5:06 PM
 */
import * as Mongoose from "mongoose"
const ObjectId = Mongoose.Schema.Types.ObjectId;

class product {
    static get schema () {
        var schema = new Mongoose.Schema({
            name: {
                type: String,
                unique: true,
                required: [true, 'Name Product không được bỏ trống'],
                maxlength: 100,
            },
            category_id: {
                type: ObjectId,
                required: [true, 'CategoryId không được bỏ trống'],
            },
            sub_category_id: {
                type: ObjectId,
                required: [true, 'SubCategoryId không được bỏ trống'],
            },
            unit: {
                type: String,
                required: [true, 'Đơn vị sản phẩm không được bỏ trống'],
            },
            saleOff: {
                type: Number,
                default: 0
            },
            price: {
                type: Number,
                required: [true, 'Giá sản phẩm không được bỏ trống'],
            },
            classify: {
                type: Array,
                default: []
            },
            images: {
                type: Array,
                required: [true, 'Name Product không được bỏ trống'],
            },
            description: {
                type: String,
                trim: true
            },
            total: {
                type: Number,
                default: 0
            },
            product_detail: {
                type: Map,
            },
            slide: {
              type: Boolean,
              default: false
            },
            createAt: {
                type: Number,
                default: new Date().getTime()
            }
        });

        return schema;
    }

}

var Product = Mongoose.model("product", product.schema);
export {Product};
