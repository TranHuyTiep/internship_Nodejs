/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 02 08 2018
 * Time: 10:09 AM
 */
interface MailOpTion {
    email: string,
    subject: string,
    file: string,
    fileName: string,
    text: string
};

interface userInterface{
    login_id: number,
    password : string,
    email : string,
    username : string,
    role_id : number,
    active : boolean,
    oauth_id: string,
    accessToken: string,
    createAt : string,
    createBy: string
}

interface inforUserInterface{
    login_id: number,
    phone : string,
    name : string,
    address : string,
    sex : boolean,
    birthday: Date,
    email ?: string,
    username ?: string,
    password ?: string | boolean,
}

interface verify {
    login_id: number,
    verify_code: string,
    createAt: Date,
}


export {MailOpTion, inforUserInterface, userInterface, verify}