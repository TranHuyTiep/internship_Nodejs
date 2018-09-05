"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const encryto_1 = require("../helps/encryto");
const inforUser_1 = require("../models/inforUser");
const login_1 = require("../models/login");
const order_1 = require("../models/order");
const orderDetail_1 = require("../models/orderDetail");
const statusOrder_1 = require("../models/statusOrder");
class User {
    loadUserSignIn(req, res, next) {
        res.render('slide/user/login', { user: req.user });
    }
    ;
    loadUserResetPassword(req, res) {
        res.render('slide/user/reset_password', { user: req.user });
    }
    ;
    loadCreatePassword(req, res) {
        res.render('slide/user/new_password', { user: req.user });
    }
    ;
    loadUserActivePage(req, res) {
        res.render('slide/user/active', { user: req.user });
    }
    ;
    loadUserProfilePage(req, res) {
        res.render('slide/user/profile', { user: req.user });
    }
    ;
    updateProfileUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conditionUpdate = `login_id = '${req.user.login_id}'`;
                let dataUpdateInfor = req.body;
                let dataUpdateInforLogin = {
                    username: req.body.username,
                    email: req.body.email,
                };
                yield login_1.userModel.updateData(dataUpdateInforLogin, conditionUpdate);
                delete dataUpdateInfor.username;
                delete dataUpdateInfor.email;
                yield inforUser_1.inforUserModel.updateData(dataUpdateInfor, conditionUpdate);
                res.redirect(req.originalUrl);
            }
            catch (e) {
                console.error(e);
            }
            ;
        });
    }
    ;
    loadEditPasswordPage(req, res) {
        res.render('slide/user/edit_pass', { user: req.user });
    }
    ;
    editPasswordUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conditionUpdate = `login_id = '${req.user.login_id}'`;
                let user = yield login_1.userModel.getUser(conditionUpdate);
                if (encryto_1.cryptoHelper.validatePassword(req.body.password, user[0].password)) {
                    let newPassword = encryto_1.cryptoHelper.createPassword(req.body.newPassword);
                    yield login_1.userModel.updateData({ password: newPassword }, conditionUpdate);
                    res.redirect('/user/sign-out');
                }
                ;
            }
            catch (e) {
            }
            ;
        });
    }
    ;
    loadAddPasswordPage(req, res) {
        res.render('slide/user/add_pass', { user: req.user });
    }
    ;
    addPasswordUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conditionUpdate = `login_id = '${req.user.login_id}'`;
                let user = yield login_1.userModel.getUser(conditionUpdate);
                if (user[0].password == '') {
                    let newPassword = encryto_1.cryptoHelper.createPassword(req.body.newPassword);
                    yield login_1.userModel.updateData({ password: newPassword }, conditionUpdate);
                    res.redirect('/user/sign-out');
                }
            }
            catch (e) {
            }
            ;
        });
    }
    ;
    loadOrderProfilePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conditionQery = `login_id = '${req.user.login_id}'`;
                let order = yield order_1.orderModel.getData(conditionQery);
                res.render('slide/user/order', { user: req.user, order: order });
            }
            catch (e) {
            }
        });
    }
    ;
    loadOrderDetailProfilePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conditionOrder = `id = '${req.params.orderId}'`;
                let conditionOrderDetail = `order_id = '${req.params.orderId}'`;
                let orderDetail = yield orderDetail_1.orderDetailModel.getData(conditionOrderDetail);
                let order = yield order_1.orderModel.getData(conditionOrder);
                let statusOrder = yield statusOrder_1.statusOrderModel.getData(conditionOrderDetail);
                res.render('slide/user/order_detail', { user: req.user, order: order, orderDetail: orderDetail, statusOrder: statusOrder });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    ;
}
;
const user = new User();
exports.user = user;
//# sourceMappingURL=user.js.map