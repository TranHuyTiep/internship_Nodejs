"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:45 AM
 */
const express_1 = require("express");
const home_1 = require("../controllers/home");
const authen_1 = require("../controllers/authen");
const user_1 = require("../controllers/user");
const help_1 = require("../helps/help");
class RouterSilde {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    ;
    init() {
        this.router.route(['/home', ''])
            .get(home_1.home.loadHomePage);
        this.router.route('/user/sign-up')
            .post(authen_1.authen.signUp);
        this.router.route('/user/sign-in')
            .get(help_1.isUserLogin, user_1.user.loadUserSignIn)
            .post(authen_1.authen.signIn);
        this.router.route('/user/sign-in/facebook')
            .get(help_1.isUserLogin, authen_1.authen.signInFaceBook());
        this.router.route('/user/sign-out')
            .get(authen_1.authen.signOut);
        this.router.route('/user/reset-password/')
            .get(help_1.isUserLogin, user_1.user.loadUserResetPassword)
            .post(help_1.isUserLogin, authen_1.authen.resetPassword);
        this.router.route('/user/create-password')
            .get(help_1.isUserLogin, user_1.user.loadCreatePassword);
        this.router.route('/user/verify/:verifyCode')
            .get(help_1.isUserLogin, authen_1.authen.verify);
    }
}
const routerSilde = new RouterSilde().router;
exports.routerSilde = routerSilde;
//# sourceMappingURL=slide.js.map