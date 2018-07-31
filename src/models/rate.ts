/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 31 07 2018
 * Time: 4:23 PM
 */
import {QueryMongoodb} from "./models"
import {rate} from "../repository/rate/schemal"
import * as Mongoose from "mongoose"

export class Rate extends QueryMongoodb{
    constructor(schema: Mongoose.Model<Mongoose.Document>){
        super(schema)
    }
};

let rateModel = new Rate(rate);

export {rateModel}