/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 5:06 PM
 */
import * as Mongoose from "mongoose"
const Mixed = Mongoose.Schema.Types.Mixed;
const ObjectId = Mongoose.Schema.Types.ObjectId;

class Rate {
    static get schema () {
        var schema = new Mongoose.Schema({
            product_id: {
                type: ObjectId,
                required: [true, 'Name Product không được bỏ trống'],
            },
            user: {
                type: Mixed,
                required: [true, 'User không được bỏ trống'],
            },
            rate_score: {
                type: Number,
                required: [true, 'Đánh giá không được bỏ trống'],
            },
            comment: {
                type: String,
            },
            createAt: {
                type: Number,
                default: new Date().getTime()
            }
        });

        return schema;
    }

}

var rate = Mongoose.model("product", Rate.schema);
export {rate};
