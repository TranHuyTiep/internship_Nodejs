"use strict";
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 5:13 PM
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Passport = require("passport");
const verify_1 = require("../models/verify");
const login_1 = require("../models/login");
const inforUser_1 = require("../models/inforUser");
const encryto_1 = require("../helps/encryto");
const crypto = require("crypto");
const Hepler = require("../helps/help");
const sendMail_1 = require("../helps/sendMail");
class Authen {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let conditionGetUser = `email = '${data.email}'`;
            try {
                let user = yield login_1.userModel.getUser(conditionGetUser);
                if (user.length == 0) {
                    let hashPassword = encryto_1.cryptoHelper.createPassword(data.password);
                    let userInsert = {
                        email: data.email,
                        password: hashPassword,
                        username: data.username,
                        active: false,
                        role_id: 2,
                        createBy: data.email,
                    };
                    let loginId = ((yield login_1.userModel.insertUser(userInsert)).insertId);
                    let salt = crypto.randomBytes(32).toString();
                    let active = encryto_1.cryptoHelper.createPassword(hashPassword + salt);
                    let verifyInsert = {
                        login_id: loginId,
                        verify_code: active,
                    };
                    let insertingVerify = verify_1.verifyModel.insertData(verifyInsert);
                    let insertingInfor = inforUser_1.inforUserModel.insertData({ login_id: loginId });
                    let text = `Vui lòng click vào link sau để xác nhận tài khoản! \n
                                        Url: ${Hepler.getFullUrl(req, `/user/verify/${active}`)}`;
                    let subjext = `Email xác nhận tài khoản`;
                    let sendingMail = sendMail_1.sendMail(data.email, text, subjext);
                    Promise.all([insertingInfor, insertingVerify, sendingMail]);
                    res.json({ err: false, user: { userId: loginId } });
                }
                else {
                    res.json({ err: true });
                }
                ;
            }
            catch (e) {
                res.json({ err: true });
            }
        });
    }
    ;
    signIn(req, res, next) {
        Passport.authenticate('signIn', (err, user, info) => {
            if (err && user == null) {
                res.json({ err: true });
            }
            else {
                req.logIn(user, function (err) {
                    if (err == null) {
                        res.json({ err: false, user: { userId: user } });
                    }
                    else {
                        res.json({ err: true });
                    }
                });
            }
            ;
        })(req, res, next);
    }
    ;
    signInFaceBook() {
        return Passport.authenticate('signInFaceBook', {
            successRedirect: 'back',
            failureRedirect: 'back',
            failureFlash: true
        });
    }
    ;
    signOut(req, res, next) {
        req.logOut();
        res.redirect('/');
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let conditionGetUser = `email = '${req.body.email}'`;
            try {
                let user = yield login_1.userModel.getUser(conditionGetUser);
                if (user.length > 0) {
                    let conditionGetVerifyCode = `login_id = '${user[0].login_id}'`;
                    let verifyCode = yield verify_1.verifyModel.getData(conditionGetVerifyCode);
                    let text = `Vui lòng click vào link sau để reset mật khẩu! \n
                                        Url: ${Hepler.getFullUrl(req, `/user/verify/${verifyCode[0].verify_code}`)}`;
                    let subjext = `Email reset tài khoản`;
                    let sendingMail = sendMail_1.sendMail(req.body.email, text, subjext);
                    res.json({ err: false });
                }
                else {
                    res.json({ err: true });
                }
                ;
            }
            catch (e) {
                console.error(e);
                res.json({ err: true });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let verifyCode = req.params.verifyCode;
            let conditionGetData = `verify_code = '${verifyCode}'`;
            try {
                let verifyQuery = yield verify_1.verifyModel.getData(conditionGetData);
                let timeCreate = new Date(verifyQuery[0].createAt).getTime();
                let timeDatabaseServer = yield verify_1.verifyModel.getTime();
                let newTime = new Date(timeDatabaseServer[0].time).getTime();
                if (verifyQuery[0].verify_code == verifyCode && (newTime - timeCreate) < 3600000) {
                    let dataUserUpdate = { active: true };
                    let conditionUpdateUser = `login_id = ${verifyQuery[0].login_id}`;
                    let salt = crypto.randomBytes(32).toString();
                    let verify_code = encryto_1.cryptoHelper.createPassword(salt);
                    let userUpdating = login_1.userModel.updateData(dataUserUpdate, conditionUpdateUser);
                    let verifyUpdating = verify_1.verifyModel.updateData({ verify_code: verify_code }, conditionUpdateUser);
                    Promise.all([userUpdating, verifyUpdating]);
                    res.render('slide/user/active', { active: true, user: req.user });
                }
                else {
                    let conditionUpdateUser = `login_id = ${verifyQuery[0].login_id}`;
                    let salt = crypto.randomBytes(32).toString();
                    let verify_code = encryto_1.cryptoHelper.createPassword(salt);
                    let verifyUpdating = verify_1.verifyModel.updateData({ verify_code: verify_code }, conditionUpdateUser);
                    res.render('slide/user/active', { active: false, user: req.user });
                }
                ;
            }
            catch (error) {
                res.render('slide/user/active', { active: false, user: req.user });
            }
            ;
        });
    }
    ;
}
const authen = new Authen();
exports.authen = authen;
//# sourceMappingURL=authen.js.map