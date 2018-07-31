/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 5:13 PM
 */

import * as Passport from 'passport'
import {Request, Response, NextFunction} from 'express'
import {verifyModel} from '../models/verify'
import {userModel} from '../models/login'

class Authen {
    public signUp(req: Request, res: Response, next: NextFunction){
        Passport.authenticate('signUp', (err, user, info) => {
          if(err == null){
              res.json({err: false});
          }else {
              res.json({err: true});
          }
        })(req, res, next);
    }

    public verify(req: Request, res: Response){
        let verifyCode = req.params.verifyCode;
        let conditionGetData = `verify_code = '${verifyCode}'`;

        verifyModel.getData(conditionGetData)
           .then(function (result) {
               console.log(result)
               let timeCreate = new Date(result[0].createAt).getTime();
               let newTime = new Date().getTime();

               if(result[0].verify_code == verifyCode && (newTime - timeCreate) < 3600000){
                   let dataUserUpdate = {active : true};
                   let conditionUpdateUser = `login_id = ${result[0].login_id}`;
                   userModel.updateData(dataUserUpdate, conditionUpdateUser);

                   res.render('slide/user_active');
               }else {
                   res.json('flase');
               };
           })
           .catch(function (reject) {
               res.json('flase');
           });
    }
}

const authen = new Authen();
export {authen};