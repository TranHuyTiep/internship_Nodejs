/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 26 07 2018
 * Time: 4:05 PM
 */
import * as crypto from 'crypto'

class CryptoHelper {

    public createPassword(password: string): string{
        let sha256  = crypto.createHash('sha256').update(password);
        let hashPassword = sha256.digest('hex');

        return hashPassword
    };



    public validatePassword(password: string, hashPassword: string): boolean{
        let result = false;
        if(this.createPassword(password) == hashPassword){
            result = true;
        };

        return result;
    };
}

const cryptoHelper = new CryptoHelper();

export {cryptoHelper}