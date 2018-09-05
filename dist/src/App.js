"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const Mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
let config = require('../../config.json');
const help_1 = require("./helps/help");
const passport_1 = require("./config/passport");
const slide_1 = require("./routes/slide");
const user_1 = require("./routes/user");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.config();
        this.router();
        passport_1.Authen;
    }
    ;
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.set("views", path.join(__dirname, "../../views"));
        this.express.set("view engine", "ejs");
        this.express.use(express.static(path.join(__dirname, '../../public')));
        this.express.use(session(config.sessionOption));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
    }
    ;
    config() {
        Mongoose.connect(config.db.mongodb.url, config.db.mongodb.options);
        Mongoose.connection.once('open', () => {
            console.log('MongoDb connected');
        });
    }
    router() {
        this.express.use('', slide_1.routerSilde);
        this.express.use('/user/profile/', help_1.checkUserLogin, user_1.routerUser);
        this.express.use(function (req, res, next) {
            let error = new Error('Not Found');
            res.send(error.message);
        });
    }
    ;
}
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port > 0)
        return port;
    else
        return false;
}
const port = normalizePort(process.env.PORT || 3000);
const app = new App().express;
exports.app = app;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
//# sourceMappingURL=App.js.map