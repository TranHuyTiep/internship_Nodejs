import {Router} from "express";
import {productController} from "../controllers/productController";

class RouterProduct {
    public router : Router;

    constructor(){
        this.router = Router();
        this.init();
    };

    private init(){

        this.router.route('/')
            .get(productController.getAllProduct);

        this.router.route('/:id')
            .get(productController.getDetail);

        this.router.route('/create')
            .post(productController.createProduct);

        this.router.route('/:id/update')
            .put(productController.updateProduct);

        this.router.route('/:id/remove')
            .delete(productController.removeProduct);

        this.router.route('/search')
            .get(productController.getProductByKeyword);
    }
}

const routerProduct = new RouterProduct().router;
export {routerProduct}