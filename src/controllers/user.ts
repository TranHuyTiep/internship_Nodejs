/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 01 08 2018
 * Time: 1:27 PM
 */
import {Request, Response, NextFunction} from "express";
import {cryptoHelper} from '../helps/encryto'
import {inforUserModel} from '../models/inforUser';
import {userModel} from '../models/login';
import {orderModel} from '../models/order'
import {orderDetailModel} from '../models/orderDetail'
import {statusOrderModel} from '../models/statusOrder'
import {inforUserInterface, userInterface} from '../repository/interface';

class User {
    public loadUserSignIn(req: Request, res: Response, next:NextFunction){
        res.render('slide/user/login',{user: req.user});
    };

    public loadUserResetPassword(req: Request, res: Response){
        res.render('slide/user/reset_password',{user: req.user});
    };

    public loadCreatePassword(req: Request, res: Response){
        res.render('slide/user/new_password',{user: req.user});
    };

    public loadUserActivePage(req: Request, res: Response){
        res.render('slide/user/active',{user: req.user});
    };

    public loadUserProfilePage(req: Request, res: Response){
        res.render('slide/user/profile',{user: req.user});
    };

    public async updateProfileUser(req: Request, res: Response, next: NextFunction){
        try {
            let conditionUpdate: string = `login_id = '${req.user.login_id}'`;
            let dataUpdateInfor: inforUserInterface = req.body;
            let dataUpdateInforLogin: Partial<userInterface> = {
                username: req.body.username,
                email: req.body.email,
            };

            await userModel.updateData(dataUpdateInforLogin, conditionUpdate);
            delete dataUpdateInfor.username;
            delete dataUpdateInfor.email;
            await inforUserModel.updateData(dataUpdateInfor, conditionUpdate);

            res.redirect(req.originalUrl);
        }catch (e) {
          console.error(e);
        };
    };

    public loadEditPasswordPage(req: Request, res: Response){
        res.render('slide/user/edit_pass',{user: req.user});
    };

    public async editPasswordUser(req: Request, res: Response, next: NextFunction){
        try {
            let conditionUpdate: string = `login_id = '${req.user.login_id}'`;
            let user: Array<userInterface> = await userModel.getUser(conditionUpdate);

            if(cryptoHelper.validatePassword(req.body.password, user[0].password)){
                let newPassword: string = cryptoHelper.createPassword(req.body.newPassword);
                await userModel.updateData({password: newPassword}, conditionUpdate);

                res.redirect('/user/sign-out');
            };

        }catch (e){

        };
    };

    public loadAddPasswordPage(req: Request, res: Response){
        res.render('slide/user/add_pass',{user: req.user});
    };

    public async addPasswordUser(req: Request, res: Response, next: NextFunction){
        try {
            let conditionUpdate: string = `login_id = '${req.user.login_id}'`;
            let user = await userModel.getUser(conditionUpdate);
            if(user[0].password == ''){
                let newPassword = cryptoHelper.createPassword(req.body.newPassword);
                await userModel.updateData({password: newPassword}, conditionUpdate);
                res.redirect('/user/sign-out')
            }
        }catch (e){

        };
    };

    public async loadOrderProfilePage(req: Request, res: Response){
        try{
            let conditionQery: string = `login_id = '${req.user.login_id}'`;
            let order = await orderModel.getData(conditionQery);
            res.render('slide/user/order',{user: req.user, order: order});
        }catch (e){

        }

    };

    public async loadOrderDetailProfilePage(req: Request, res: Response){
        try{
            let conditionOrder: string = `id = '${req.params.orderId}'`;
            let conditionOrderDetail: string = `order_id = '${req.params.orderId}'`;
            let orderDetail = await orderDetailModel.getData(conditionOrderDetail);
            let order = await orderModel.getData(conditionOrder);
            let statusOrder = await statusOrderModel.getData(conditionOrderDetail);

            res.render('slide/user/order_detail',{user: req.user, order: order, orderDetail: orderDetail, statusOrder: statusOrder});
        }catch (e){
            console.log(e)
        }
    };
};

const user = new User();
export {user}
