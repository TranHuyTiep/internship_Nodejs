/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:38 AM
 */
import * as nodemailer from "nodemailer"
let config = require('../../config.json');

interface InterfaceMailOpTion {
    email: string,
    subject: string,
    file: string,
    fileName: string,
    text: string
}

function sendMail(email: string, text: string, subject: string, callback: any) {
    var transporter = nodemailer.createTransport(config.email);
    var mail = {
        from: config.email.auth.user,
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mail,function(error, response){
        if(error){
            callback(error);
        }else{
            callback(error, response);
        }
        transporter.close();
    });
};

function sendFile(mailOption: InterfaceMailOpTion, callback: any) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'huytiep1995@gmail.com',
            pass: 'huytiep2521995'
        }
    });

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
}


export {sendMail, sendFile}

