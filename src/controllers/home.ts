/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:23 AM
 */
import {Request, Response} from "express";
// import {productModel} from "../models/product"
// import * as Mongoose from "mongoose"
// const ObjectId = Mongoose.Types.ObjectId;

class Home {
    public loadHomePage(req: Request, res: Response){
        // let data = {
        //     name: 'aáddasasdaasdad',
        //     category_id: new ObjectId("5b498b1f3721c809a4ee1d87"),
        //     sub_category_id:new ObjectId('5b498b1f3721c809a4ee1d87'),
        //     unit: 'asda',
        //     saleOff: 122,
        //     price: 2333,
        //     classify: [],
        //     images: []
        //
        // }
        // productModel.save(data).then(function (a) {
        //     console.log(a)
        // })
        res.render('slide/home');

    }
}

const home = new Home();
export {home}
