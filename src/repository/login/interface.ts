import mongoose = require("mongoose");

export interface userInterface extends mongoose.Document{
    userId: mongoose.Types.ObjectId,
    password : string,
    friendName: string,
    email : string,
    userName : string,
    active : string,
    verifyCode : string,
    role : string,
    createdAt : Date,
}
