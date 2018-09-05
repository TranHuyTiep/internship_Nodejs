/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 9:03 AM
 */
import {QueryMongoodb} from "./models"
import {Product} from "../repository/product/schemal"
import * as Mongoose from "mongoose";

export class ProductModel extends QueryMongoodb{
    constructor(schema: Mongoose.Model<Mongoose.Document>){
        super(schema)
    }
};

let productModel = new ProductModel(Product);

export {productModel}