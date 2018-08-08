/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 1:57 AM
 */

import * as Passport from 'passport'
import {Strategy} from 'passport-local'
import {Request, Response, Router} from 'express'
import {userModel} from '../models/login'
import {verifyModel} from '../models/verify'
import {cryptoHelper} from '../helps/encryto'
import {sendMail} from '../helps/sendMail'
import * as Hepler from '../helps/help'
import * as crypto from 'crypto'


class passport {
    public passport : Passport.PassportStatic;
    constructor(){
        this.passport = Passport;
        this.init();

    };

    private init(){
        this.passport.serializeUser((userId: any, done: any) => {
            done(undefined, userId);
        });

        this.passport.deserializeUser(function(userId: any, done: any) {
            let conditionGetUser = `login_id = '${userId}'`;

            userModel.getUser(conditionGetUser)
                .then(function (user) {
                    done(undefined, user[0]);
                })
                .catch(function (err) {
                    done(err);
                });
        });

       this.passport.use('signUp', new Strategy({
               usernameField: 'email',
               passwordField: 'newPassword',
               passReqToCallback: true
           },
           async function(req: Request, email: string , password: string, done) {
                let data = req.body;
                let date = new Date();
                let conditionGetUser = `email = '${email}'`;
                let user = await userModel.getUser(conditionGetUser);
                if(user.length == 0 ){
                    let hashPassword = cryptoHelper.createPassword(password);
                    let userInsert = {
                        email: email,
                        password: hashPassword,
                        username: data.username,
                        active: false,
                        role_id: 2,
                        createAt: date,
                        createBy: email,
                    };
                    let loginId = ((await userModel.insertUser(userInsert)).insertId);
                    let salt = crypto.randomBytes(32).toString();
                    let active = cryptoHelper.createPassword(hashPassword+salt);
                    let verifyInsert = {
                        login_id: loginId,
                        verify_code: active,
                        createAt: date
                    };

                    verifyModel.insertData(verifyInsert)
                        .then(function (result) {
                            let text = `Vui lòng click vào link sau để xác nhận tài khoản! \n
                                        Url: ${Hepler.getFullUrl(req, `user/verify/${active}`)}`;
                            let subjext = `Email xác nhận tài khoản`;
                            sendMail(email, text, subjext, function () {});
                            return done(null, loginId);
                        })
                        .catch(function (reject) {
                            return done(true);
                        })
                }else {
                    return done(true);
                };
           })
       );

       this.passport.use('signIn', new Strategy({
               usernameField: 'email',
               passwordField: 'password',
               passReqToCallback: true
           },
           function(req: Request, username, password, done) {

           })
       );
    };
};

const auth = new passport();
export {auth}