import {Router} from "express";
import {productController} from "../controllers/productController";

class SearchServices {
    public router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    private init(){

        this.router.route('/product')
            .get(productController.getProductByKeyword);
    }
}

const searchServices = new SearchServices().router;
export {searchServices}