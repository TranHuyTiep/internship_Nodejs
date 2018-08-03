/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 01 08 2018
 * Time: 1:27 PM
 */
import {Request, Response, NextFunction} from "express";

class User {
    public loadUserSignIn(req: Request, res: Response, next:NextFunction){
        res.render('slide/user/user_login',{user: req.user});
    };

    public loadUserResetPassword(req: Request, res: Response){
        res.render('slide/user/user_reset_password',{user: req.user});
    };

    public loadUserActivePage(req: Request, res: Response){
        res.render('slide/user/user_active',{user: req.user});
    };

    public loadUserProfilePage(req: Request, res: Response){
        res.render('slide/user/profile_user',{user: req.user});
    };
};

const user = new User();
export {user}
