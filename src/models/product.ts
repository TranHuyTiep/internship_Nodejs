import {QueryMongoodb} from "./models"
import {Product} from "../repository/product/schemal"
import * as Mongoose from "mongoose";
const ObjectId = Mongoose.Types.ObjectId;

export class ProductModel extends QueryMongoodb{
    constructor(schema: Mongoose.Model<Mongoose.Document>){
        super(schema)
    }

    /**
     *
     * @param {string} id
     * @return {Promise<object[]>}
     */
    public findById(id : string) : Promise<object[]> {
        return new Promise<object[]>((resolve, reject) => {
            this._model.find({_id: ObjectId(id)}).exec((err, rawProducts) => {
                if (err) return reject(err);
                resolve(rawProducts)
            })
        })
    }

    /**
     *
     * @param {string} keyword
     * @return {Promise<object[]>}
     */
    public findByKeyWord(keyword : string) : Promise<object[]>{
        return new Promise<object[]>((resolve, reject) => {
            this._model.find({
                $or: [
                    { 'name'     : keyword }
                ]
            }).exec((err, rawProducts) => {
                if (err) return reject(new Error('Not found'));
                resolve(rawProducts)
            })
        })
    }

}

let productModel = new ProductModel(Product);

export {productModel}