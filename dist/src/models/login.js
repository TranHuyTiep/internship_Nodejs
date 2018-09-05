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
class UserModel extends models_1.QueryMysql {
    constructor(table) {
        super(table);
    }
    /**
     * get data-mysql user
     * @param {string} condition
     * @returns {Promise<any>}
     */
    getUser(condition) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield _super("getData").call(this, condition);
                return users;
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
    insertUser(data) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return _super("insertData").call(this, data);
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.UserModel = UserModel;
;
let userModel = new UserModel('tbl_login');
exports.userModel = userModel;
//# sourceMappingURL=login.js.map