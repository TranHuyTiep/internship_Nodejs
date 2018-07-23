/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 23 07 2018
 * Time: 1:57 AM
 */

import * as passport from 'passport'
import {Strategy} from 'passport-local';
import {Request, Response} from 'express'

class authen {
    public signup (){
        return passport.use('signup', new Strategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req: Request,username, password, done) {

            })
        );
    };

    public login (){
        return passport.use('login', new Strategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function(req: Request, username, password, done) {

            })
        );
    };

    public serializeUser(){
        return passport.serializeUser(function (user, done) {
            
        })
    }

    public deserializeUser(){
        passport.deserializeUser(function(id, done) {

        });
    }
}

const Authen = new authen();
export {Authen}