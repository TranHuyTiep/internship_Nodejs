"use strict";
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 1:57 AM
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
const passport_local_1 = require("passport-local");
const passport_facebook_1 = require("passport-facebook");
const encryto_1 = require("../helps/encryto");
const verify_1 = require("../models/verify");
const crypto = require("crypto");
const login_1 = require("../models/login");
const inforUser_1 = require("../models/inforUser");
class passport {
    constructor() {
        this.passport = Passport;
        this.init();
    }
    ;
    init() {
        this.passport.serializeUser((userId, done) => {
            done(undefined, userId);
        });
        this.passport.deserializeUser(function (userId, done) {
            return __awaiter(this, void 0, void 0, function* () {
                let conditionGetUser = `login_id = '${userId}'`;
                try {
                    let inforUser = yield inforUser_1.inforUserModel.getInforUser(conditionGetUser);
                    if (inforUser[0].password != '') {
                        inforUser[0].password = true;
                    }
                    else {
                        inforUser[0].password = false;
                    }
                    done(undefined, inforUser[0]);
                }
                catch (e) {
                    done(undefined, null);
                    console.error(e);
                }
            });
        });
        this.passport.use('signIn', new passport_local_1.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, email, password, done) {
            return __awaiter(this, void 0, void 0, function* () {
                let conditionGetUser = `email = '${email}'`;
                try {
                    let user = yield login_1.userModel.getUser(conditionGetUser);
                    if (user.length > 0 && user[0].active == true && encryto_1.cryptoHelper.validatePassword(password, user[0].password)) {
                        return done(null, user[0].login_id);
                    }
                    else {
                        return done(true);
                    }
                    ;
                }
                catch (e) {
                    return done(true);
                }
            });
        }));
        this.passport.use('signInFaceBook', new passport_facebook_1.Strategy({
            clientID: '521310484981055',
            clientSecret: '57ec8b3c1bd1378522f5eba1d4f493dc',
            callbackURL: "http://localhost:3000/user/sign-in/facebook",
            passReqToCallback: true
        }, function (req, accessToken, refreshToken, profile, done) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let conditionGetUser = `oauth_id = '${profile.id}'`;
                    let user = yield login_1.userModel.getUser(conditionGetUser);
                    if (user.length > 0) {
                        done(null, user[0].login_id);
                    }
                    else {
                        let userInsert = {
                            username: profile.displayName,
                            active: true,
                            oauth_id: profile.id,
                            role_id: 2,
                            createBy: profile.id,
                        };
                        let loginId = ((yield login_1.userModel.insertUser(userInsert)).insertId);
                        let salt = crypto.randomBytes(32).toString();
                        let active = encryto_1.cryptoHelper.createPassword(salt);
                        let verifyInsert = {
                            login_id: loginId,
                            verify_code: active,
                        };
                        verify_1.verifyModel.insertData(verifyInsert);
                        inforUser_1.inforUserModel.insertInforUser({ login_id: loginId });
                        return done(null, loginId);
                    }
                    ;
                }
                catch (e) {
                    console.error(e);
                    return done(true);
                }
            });
        }));
    }
    ;
}
;
const Authen = new passport();
exports.Authen = Authen;
//# sourceMappingURL=passport.js.map