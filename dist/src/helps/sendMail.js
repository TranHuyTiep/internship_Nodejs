"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 30 07 2018
 * Time: 8:38 AM
 */
const nodemailer = require("nodemailer");
let config = require('../../../config.json');
function sendMail(email, text, subject) {
    var transporter = nodemailer.createTransport(config.email);
    var mail = {
        from: config.email.auth.user,
        to: email,
        subject: subject,
        text: text
    };
    return sendMailCustom(transporter, mail);
}
exports.sendMail = sendMail;
;
function sendFile(mailOption) {
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
exports.sendFile = sendFile;
function sendMailCustom(transporter, mail) {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mail, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
                resolve(response);
            }
            transporter.close();
        });
    });
}
;
//# sourceMappingURL=sendMail.js.map