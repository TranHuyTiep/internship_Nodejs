"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * lay url
 * @param {e.Request} req
 * @param {string} url
 * @returns {string}
 */
function getFullUrl(req, url) {
    if (!url) {
        return ('');
    }
    else {
        return (req.protocol + '://' + req.get('host') + url);
    }
}
exports.getFullUrl = getFullUrl;
;
/**
 * check Admin da login chua
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
function checkAdminLognIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role_id == 1)
        return next();
    res.redirect('/admin/login');
}
exports.checkAdminLognIn = checkAdminLognIn;
;
/**
 * check user login chua
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
function checkUserLogin(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/user/sign-in');
}
exports.checkUserLogin = checkUserLogin;
;
function isUserLogin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/user/profile');
    }
    else {
        return next();
    }
}
exports.isUserLogin = isUserLogin;
;
//# sourceMappingURL=help.js.map