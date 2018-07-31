/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:45 AM
 */
import {Router} from "express";
import {home} from "../controllers/home";
import {authen} from '../controllers/authen';

class RouterSilde {
    public router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    private init(){
        this.router.route(['/home',''])
            .get(home.loadHomePage);

        this.router.route('/user/sign-up')
            .post(authen.signUp);

        this.router.route('/user/verify/:verifyCode')
            .get(authen.verify);

    }
}

const routerSilde = new RouterSilde().router;
export {routerSilde}