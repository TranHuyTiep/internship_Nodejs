import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import * as Mongoose from "mongoose";
let config = require('../config.json');

class App{

    public express : express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.router();
        this.config();
    };

    private middleware(): void{
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.set("views", path.join(__dirname, "../views"));
        this.express.set("view engine", "ejs");
        this.express.use(express.static(path.join(__dirname, '../public')));
    };

    private config():void{
        Mongoose.connect(config.db.url,{useNewUrlParser: true});
        Mongoose.connection.once('open', () => {
            console.log('Db connect')
         })
    }

    private router(): void{

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


