import * as Mongoose from "mongoose"

let config = require('../config.json');

    Mongoose.connect(config.db.mongodb.url, {
        "useNewUrlParser": true,
        "poolSize": 10,
        "autoReconnect": true
    }).then(() => {
        console.log('Database connection successful');
    }).catch(err => {
        console.error('Database connection error')
    });

