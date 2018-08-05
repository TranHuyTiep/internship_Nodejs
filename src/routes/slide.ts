/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:45 AM
 */
import {Router} from "express";
import {home} from "../controllers/home";
import {authen} from '../controllers/authen';
import {user} from '../controllers/user';
import {isUserLogin} from "../helps/help"

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

        this.router.route('/user/sign-in')
            .get(isUserLogin, user.loadUserSignIn)
            .post(authen.signIn);

        this.router.route('/user/sign-in/facebook')
            .get(isUserLogin, authen.signInFaceBook());

        this.router.route('/user/sign-out')
            .get( authen.signOut);

        this.router.route('/user/reset-password')
            .get(isUserLogin, user.loadUserResetPassword);

        this.router.route('/user/create-password')
            .get(isUserLogin, user.loadCreatePassword);

        this.router.route('/user/verify/:verifyCode')
            .get(isUserLogin, authen.verify);

    }
}

const routerSilde = new RouterSilde().router;
export {routerSilde}