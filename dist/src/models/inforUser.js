"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
class InforUserModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    getInforUser(condition) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let Condition = condition || " 1";
            let sql = `
            SELECT tbl_user_informations.*, tbl_login.email, tbl_login.username, tbl_login.password  
            FROM tbl_login 
            LEFT JOIN tbl_user_informations
            ON tbl_user_informations.login_id = tbl_login.login_id
            WHERE tbl_login.${Condition}`;
            try {
                let infor = yield _super("query").call(this, sql);
                return infor;
            }
            catch (e) {
                throw (e);
            }
        });
    }
    ;
    /**
     * them user
     * @param {Array<object> | Object} data
     * @returns {Promise<any>}
     */
    insertInforUser(data) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return _super("insertData").call(this, data);
            }
            catch (e) {
                throw e;
            }
            ;
        });
    }
    ;
}
exports.InforUserModel = InforUserModel;
;
let inforUserModel = new InforUserModel('tbl_user_informations');
exports.inforUserModel = inforUserModel;
//# sourceMappingURL=inforUser.js.map