/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:38 AM
 */
import * as nodemailer from "nodemailer"
let config = require('../../../config.json');
import {MailOpTion} from '../repository/interface'


function sendMail(email: string, text: string, subject: string): Promise<void> {
    var transporter = nodemailer.createTransport(config.email);
    var mail = {
        from: config.email.auth.user,
        to: email,
        subject: subject,
        text: text
    };

    return sendMailCustom(transporter, mail);
};

function sendFile(mailOption: MailOpTion): Promise<void> {
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

    return sendMailCustom(transporter, mail);
}

function sendMailCustom(transporter: nodemailer.Transporter, mail: object): Promise<void> {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mail,function(error, response){
            if(error){
                reject(error);
            }else{
                resolve(response);
            }
            transporter.close();
        });
    })
};

export {sendMail, sendFile}

