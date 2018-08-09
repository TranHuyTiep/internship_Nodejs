/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 01 08 2018
 * Time: 2:35 PM
 */
import {Router} from "express";
import {user} from "../controllers/user";

class RouterUser {
    public router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    private init(){
        this.router.route(['/infor',''])
            .get(user.loadUserProfilePage)
            .post(user.updateProfileUser);
        this.router.route('/edit-password')
            .get(user.loadEditPasswordPage)
            .post(user.editPasswordUser);
        this.router.route('/add-password')
            .get(user.loadAddPasswordPage)
            .post(user.addPasswordUser);
        this.router.route('/order')
            .get(user.loadOrderProfilePage);
        this.router.route('/order/:orderId')
            .get(user.loadOrderDetailProfilePage)
    }
}

const routerUser= new RouterUser().router;
export {routerUser}