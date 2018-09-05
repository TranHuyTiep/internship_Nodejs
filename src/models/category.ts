/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 4:12 PM
 */
import {QueryMongoodb} from "./models"
import {category} from "../repository/category/schemal"
import * as Mongoose from "mongoose"

export class CategoryModel extends QueryMongoodb{
    constructor(schema: Mongoose.Model<Mongoose.Document>){
        super(schema)
    }
};

let categoryModel = new CategoryModel(category);

export {categoryModel}