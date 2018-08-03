/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:38 AM
 */
import * as nodemailer from "nodemailer"
let config = require('../../config.json');
import {MailOpTion} from '../repository/interface'


function sendMail(email: string, text: string, subject: string) {
    const promise = new Promise(function (resolve, reject) {
        var transporter = nodemailer.createTransport(config.email);
        var mail = {
            from: config.email.auth.user,
            to: email,
            subject: subject,
            text: text
        };

        transporter.sendMail(mail,function(error, response){
            if(error){
                reject(error);
            }else{
                resolve(response);
            }
            transporter.close();
        });
    })

    return promise;
};

function sendFile(mailOption: MailOpTion, callback: any) {
    const promise = new Promise(function (resolve, reject) {
        var transporter = nodemailer.createTransport(config.email);

        var mail = {
            from: config.email.auth.user,
            to: mailOption.email,
            subject: mailOption.subject,
            text: mailOption.text,
            attachments: [
                {
                    filename: mailOption.fileName,
                    path: mailOption.file
                }
            ]
        };

        transporter.sendMail(mail, function(error, response){
            if(error){
                callback(error);
            }else{
                callback(error,response);
            }
            transporter.close();
        });
    })
    return promise;

}

export {sendMail, sendFile}

