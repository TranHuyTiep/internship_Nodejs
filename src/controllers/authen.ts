/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:23 AM
 */
import {Request, Response, NextFunction} from "express";

class authen {
    public login(req: Request, res: Response){
        res.render('authen/login');
    }
}

const Authen = new authen();
export {Authen}
