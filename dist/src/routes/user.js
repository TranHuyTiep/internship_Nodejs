"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 01 08 2018
 * Time: 2:35 PM
 */
const express_1 = require("express");
const user_1 = require("../controllers/user");
class RouterUser {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    ;
    init() {
        this.router.route(['/infor', ''])
            .get(user_1.user.loadUserProfilePage)
            .post(user_1.user.updateProfileUser);
        this.router.route('/edit-password')
            .get(user_1.user.loadEditPasswordPage)
            .post(user_1.user.editPasswordUser);
        this.router.route('/add-password')
            .get(user_1.user.loadAddPasswordPage)
            .post(user_1.user.addPasswordUser);
        this.router.route('/order')
            .get(user_1.user.loadOrderProfilePage);
        this.router.route('/order/:orderId')
            .get(user_1.user.loadOrderDetailProfilePage);
    }
}
const routerUser = new RouterUser().router;
exports.routerUser = routerUser;
//# sourceMappingURL=user.js.map