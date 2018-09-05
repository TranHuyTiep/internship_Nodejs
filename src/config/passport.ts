/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 1:57 AM
 */

import * as Passport from 'passport'
import {Strategy} from 'passport-local'
import {Strategy as FaceStrategy} from 'passport-facebook'
import {cryptoHelper} from '../helps/encryto'
import {Request, Response, Router} from 'express'
import {verifyModel} from '../models/verify'
import * as crypto from "crypto";
import {userModel} from '../models/login'
import {inforUserModel} from '../models/inforUser'

import {inforUserInterface, userInterface} from '../repository/interface'


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

        this.passport.deserializeUser(async function(userId: any, done: any) {
            let conditionGetUser: string = `login_id = '${userId}'`;

            try {
                let inforUser: Array<inforUserInterface> = await inforUserModel.getInforUser(conditionGetUser);
                if(inforUser[0].password != ''){
                    inforUser[0].password = true;
                }else {
                    inforUser[0].password = false;
                }
                done(undefined, inforUser[0]);
            }catch (e) {
                done(undefined, null);
                console.error(e);
            }
        });

        this.passport.use('signIn', new Strategy({
               usernameField: 'email',
               passwordField: 'password',
               passReqToCallback: true
           },
           async function(req: Request, email, password, done) {
               let conditionGetUser: string = `email = '${email}'`;
               try {
                   let user: Array<userInterface> = await userModel.getUser(conditionGetUser);
                   if(user.length > 0 && user[0].active == true && cryptoHelper.validatePassword(password, user[0].password) ){
                       return done(null, user[0].login_id);
                   }else {
                       return done(true);
                   };
               }catch (e) {
                   return done(true);
               }
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
                    } else {
                        let userInsert: Partial<userInterface> = {
                            username: profile.displayName,
                            active: true,
                            oauth_id: profile.id,
                            role_id: 2,
                            createBy: profile.id,
                        };
                        let loginId: number = ((await userModel.insertUser(userInsert)).insertId);
                        let salt: string = crypto.randomBytes(32).toString();
                        let active: string = cryptoHelper.createPassword(salt);
                        let verifyInsert = {
                            login_id: loginId,
                            verify_code: active,
                        };

                        verifyModel.insertData(verifyInsert);
                        inforUserModel.insertInforUser({login_id: loginId});
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