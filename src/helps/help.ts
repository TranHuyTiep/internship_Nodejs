/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:54 PM
 */
import {Request, Response, NextFunction} from 'express'
import * as passport from 'passport'

/**
 * lay url
 * @param {e.Request} req
 * @param {string} url
 * @returns {string}
 */
function getFullUrl(req: Request, url: string) {
    if(!url){
        return ('')
    }else {
        return (req.protocol+'://'+req.get('host')+url)
    }
};

/**
 * check Admin da login chua
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
function checkAdminLognIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated() && req.user.role_id == 1)
        return next();

    res.redirect('/admin/login');
};

/**
 * check user login chua
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
function checkUserLogin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/user/sign-in');
};

function isUserLogin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()){
        res.redirect('/user/profile');
    }else {
        return next();
    }
};


export {getFullUrl, checkAdminLognIn, isUserLogin, checkUserLogin}
