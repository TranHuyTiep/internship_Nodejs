import {Request, Response, NextFunction} from 'express';
import {productModel} from "../models/product";

class ProductController {

    public createProduct(req: Request, res: Response, next: NextFunction) {
        productModel.save(req.body).then(() => {
            res.status(201).send({message: "Created!"});
        }).catch(next)
    }

    public updateProduct(req: Request, res: Response, next: NextFunction) {
        productModel.update(req.params.id, req.body).then(() => {
            res.status(200).send({message: "Done!"});
        }).catch(next)
    }

    public removeProduct(req: Request, res: Response, next: NextFunction) {
        productModel.remove(req.params.id).then(() => {
            res.status(200).send({message: "Done!"});
        }).catch(next)
    }

    public getAllProduct(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.keyworld);
        productModel.getAllData().then(rawProducts => {
            res.status(200).send(rawProducts)
        }).catch(next)
            // res.status(200).render('slide/home', {product : products})
    }

    public getDetail(req: Request, res: Response, next: NextFunction) {
        productModel.findById(req.params.id).then(rawProduct => {
            res.status(200).send(rawProduct)
        }).catch(next)
    }

    public getProductByKeyword(req: Request, res: Response, next: NextFunction) {
        productModel.findByKeyWord(req.query.keyword).then(rawProduct => {
            res.status(200).send(rawProduct)
        })
    }
}

const productController = new ProductController();
export {productController};
