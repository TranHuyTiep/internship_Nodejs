import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as Mongoose from "mongoose"
import * as session from 'express-session'
import * as passport from 'passport'

let config = require('../config.json');

import {auth} from "./config/passport"
import {routerSilde} from "./routes/slide"
import {routerProduct} from "./routes/product";
import {searchServices} from "./routes/search";

class App{

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.config();
        this.router();
        auth;
    };

    private middleware(): void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.set("views", path.join(__dirname, "../views"));
        this.express.set("view engine", "ejs");
        this.express.use(express.static(path.join(__dirname, '../public')));
        this.express.use(session(config.sessionOption));

    };

    private config():void{
        this.express.use(passport.initialize());
        this.express.use(passport.session());

        Mongoose.connect(config.db.mongodb.url,config.db.mongodb.options);
        Mongoose.connection.once('open', () => {
            console.log('MongoDb connected');
         });
    }

    private router(): void{
        this.express.use('/shopOpen/v1/', routerSilde);
        this.express.use('/shopOpen/v1/products', routerProduct);
        this.express.use('/shopOpen/v1/search', searchServices);

    };
}

function normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) return val;
    else if (port > 0) return port;
    else return false;

}

const port = normalizePort(process.env.PORT || 3000);

const app = new App().express;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);


