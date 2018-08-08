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
        res.render('slide/home');
    }
}

const home = new Home();
export {home}
