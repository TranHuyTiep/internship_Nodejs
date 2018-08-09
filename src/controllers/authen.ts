/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 5:13 PM
 */

import * as Passport from 'passport'
import {Request, Response, NextFunction} from 'express'
import {verifyModel} from '../models/verify'
import {userModel} from '../models/login'
import {inforUserModel} from '../models/inforUser'
import {cryptoHelper} from "../helps/encryto";
import * as crypto from "crypto";
import * as Hepler from "../helps/help";
import {sendMail} from "../helps/sendMail";
import {userInterface, verify} from "../repository/interface";

class Authen {

    public async signUp(req: Request, res: Response, next: NextFunction){
        let data: userInterface = req.body;
        let conditionGetUser: string = `email = '${data.email}'`;

        try {
            let user: Array<userInterface> = await userModel.getUser(conditionGetUser);
            if(user.length == 0 ){
                let hashPassword = cryptoHelper.createPassword(data.password);
                let userInsert: Partial<userInterface> = {
                    email: data.email,
                    password: hashPassword,
                    username: data.username,
                    active: false,
                    role_id: 2,
                    createBy: data.email,
                };
                let loginId: number = ((await userModel.insertUser(userInsert)).insertId);
                let salt: string = crypto.randomBytes(32).toString();
                let active = cryptoHelper.createPassword(hashPassword+salt);
                let verifyInsert = {
                    login_id: loginId,
                    verify_code: active,
                };

                let insertingVerify: Promise<any> = verifyModel.insertData(verifyInsert);
                let insertingInfor: Promise<any> = inforUserModel.insertData({login_id: loginId});
                let text: string = `Vui lòng click vào link sau để xác nhận tài khoản! \n
                                        Url: ${Hepler.getFullUrl(req, `/user/verify/${active}`)}`;
                let subjext: string = `Email xác nhận tài khoản`;
                let sendingMail = sendMail(data.email, text, subjext);
                Promise.all([insertingInfor, insertingVerify, sendingMail]);

                res.json({err: false,user: {userId: loginId}});
            }else {
                res.json({err: true});
            };
        }catch (e) {
            res.json({err: true});
        }
    };

    public signIn(req: Request, res: Response, next: NextFunction){
        Passport.authenticate('signIn', (err, user, info) => {
            if (err) {
                res.json({err: true});
            }else {
                req.logIn(user, function(err) {
                    if(err == null){
                        res.json({err: false,user: {userId: user}});
                    }else {
                        res.json({err: true});
                    }
                });
            };
        })(req, res, next);
    };

    public signInFaceBook(){
       return Passport.authenticate('signInFaceBook', {
           successRedirect : 'back',
           failureRedirect : 'back',
           failureFlash : true
       })
    };

    public signOut(req: Request, res: Response, next: NextFunction){
        req.logOut();
        res.redirect('/');
    }

    public async resetPassword(req: Request, res: Response, next: NextFunction){
        let conditionGetUser: string = `email = '${req.body.email}'`;

        try {
            let user: Array<userInterface> = await userModel.getUser(conditionGetUser);

            if(user.length > 0){
                let conditionGetVerifyCode: string = `login_id = '${user[0].login_id}'`;
                let verifyCode: Array<verify> = await verifyModel.getData(conditionGetVerifyCode);
                let text: string = `Vui lòng click vào link sau để reset mật khẩu! \n
                                        Url: ${Hepler.getFullUrl(req, `/user/verify/${verifyCode[0].verify_code}`)}`;
                let subjext: string = `Email reset tài khoản`;

                let sendingMail:Promise<void> = sendMail(req.body.email, text, subjext);
                res.json({err: false});
            }else {
                res.json({err: true});
            };
        }catch (e) {
            console.error(e);
            res.json({err: true});
        }
    }

    public async verify(req: Request, res: Response){
        let verifyCode: string = req.params.verifyCode;
        let conditionGetData: string = `verify_code = '${verifyCode}'`;
        try {
            let verifyQuery: Array<verify> =  await verifyModel.getData(conditionGetData);
            let timeCreate: number = new Date(verifyQuery[0].createAt).getTime();
            let timeDatabaseServer = await verifyModel.getTime();
            let newTime = new Date(timeDatabaseServer[0].time).getTime();

           if(verifyQuery[0].verify_code == verifyCode && (newTime - timeCreate) < 3600000){
               let dataUserUpdate: object = {active : true};
               let conditionUpdateUser: string = `login_id = ${verifyQuery[0].login_id}`;
               let salt: string = crypto.randomBytes(32).toString();
               let verify_code: string = cryptoHelper.createPassword(salt);

               let userUpdating: Promise<any> = userModel.updateData(dataUserUpdate, conditionUpdateUser);
               let verifyUpdating:  Promise<any> = verifyModel.updateData({verify_code: verify_code}, conditionUpdateUser);
               Promise.all([userUpdating, verifyUpdating]);

               res.render('slide/user/active', {active: true, user: req.user});
           }else {
               let conditionUpdateUser: string = `login_id = ${verifyQuery[0].login_id}`;
               let salt: string = crypto.randomBytes(32).toString();
               let verify_code: string = cryptoHelper.createPassword(salt);

               let verifyUpdating:  Promise<any> = verifyModel.updateData({verify_code: verify_code}, conditionUpdateUser);
               res.render('slide/user/active',{active: false, user: req.user});
           };

        } catch (error) {
            res.render('slide/user/active', {active: false, user: req.user});
        };
    };
}

const authen = new Authen();
export {authen};