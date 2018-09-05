/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 9:03 AM
 */
import { QueryMongoodb } from "./models";
import * as Mongoose from "mongoose";
export declare class ProductModel extends QueryMongoodb {
    constructor(schema: Mongoose.Model<Mongoose.Document>);
}
export { productModel };
