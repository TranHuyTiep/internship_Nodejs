/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:23 AM
 */
import {Request, Response} from "express";

class Home {
    public loadHomePage(req: Request, res: Response){
        let user = req.user;
        res.render('slide/home',{user: user});
    };
};

const home = new Home();
export {home}
