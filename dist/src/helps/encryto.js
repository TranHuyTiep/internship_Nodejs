"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 26 07 2018
 * Time: 4:05 PM
 */
const crypto = require("crypto");
class CryptoHelper {
    createPassword(password) {
        let sha256 = crypto.createHash('sha256').update(password);
        let hashPassword = sha256.digest('hex');
        return hashPassword;
    }
    ;
    validatePassword(password, hashPassword) {
        let result = false;
        if (this.createPassword(password) == hashPassword) {
            result = true;
        }
        ;
        return result;
    }
    ;
}
const cryptoHelper = new CryptoHelper();
exports.cryptoHelper = cryptoHelper;
//# sourceMappingURL=encryto.js.map