import mongoose = require("mongoose");

export interface userInterface extends mongoose.Document{
    userId: mongoose.Types.ObjectId,
    username: string,
    password : string,
    photo: Array<string>,
    email : string,
    role_id : Date,
}
