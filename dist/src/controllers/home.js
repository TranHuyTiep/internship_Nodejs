"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Home {
    loadHomePage(req, res) {
        let user = req.user;
        res.render('slide/home', { user: user });
    }
    ;
}
;
const home = new Home();
exports.home = home;
//# sourceMappingURL=home.js.map