/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 9:45 AM
 */
import {Router} from "express";
import {Authen} from "../controllers/authen"

class routerAuthen {
    public router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    private init(){
        this.router.route('/authen/login')
            .get(Authen.login)

    }
}

const RouterAuthen = new routerAuthen().router;
export {RouterAuthen}