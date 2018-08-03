/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 1:57 AM
 */

import * as Passport from 'passport'
import {Strategy} from 'passport-local'
import {Strategy as FaceStrategy} from 'passport-facebook'
import {Request, Response, Router} from 'express'
import {userModel} from '../models/login'
import {verifyModel} from '../models/verify'
import {cryptoHelper} from '../helps/encryto'
import {sendMail} from '../helps/sendMail'
import * as Hepler from '../helps/help'
import * as crypto from 'crypto'
import {userInterface} from '../repository/interface'


class passport {
    public passport : Passport.PassportStatic;
    constructor(){
        this.passport = Passport;
        this.init();
    };

    private init(){
        this.passport.serializeUser((userId: any, done: any) => {
            let conditionGetUser = `login_id = '${userId}'`;
            userModel.getUser(conditionGetUser)
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

        this.passport.use('signIn', new Strategy({
               usernameField: 'email',
               passwordField: 'password',
               passReqToCallback: true
           },
           async function(req: Request, email, password, done) {
               let conditionGetUser: string = `email = '${email}'`;
               let user: Array<userInterface> = await userModel.getUser(conditionGetUser);
               if(user.length > 0 && user[0].active == true && cryptoHelper.validatePassword(password, user[0].password) ){
                   return done(null, user[0].login_id);
               }else {
                   return done(true);
               };
           })
        );

        this.passport.use('signInFaceBook', new FaceStrategy({
                clientID: '521310484981055',
                clientSecret: '57ec8b3c1bd1378522f5eba1d4f493dc',
                callbackURL: "http://localhost:3000/user/sign-in/facebook",
                passReqToCallback: true
            },
            async function(req: Request, accessToken: string, refreshToken: string, profile: any, done: any) {
                try {
                    let conditionGetUser: string = `oauth_id = '${profile.id}'`;
                    let user: Array<userInterface> = await userModel.getUser(conditionGetUser);
                    
                    if(user.length > 0 ){
                        done(null, user[0].login_id);
                    }else {
                        let userInsert: Partial<userInterface> = {
                            username: profile.displayName,
                            active: true,
                            oauth_id: profile.id,
                            role_id: 2,
                            createBy: profile.id,
                        };
                        let loginId = ((await userModel.insertUser(userInsert)).insertId);
                        return done(null, loginId);
                    };
                }catch (e) {
                    console.error(e)
                    return done(true);
                }
            })
        );
    };
};

const Authen = new passport();
export {Authen}