import mongoose = require("mongoose");

export interface userInterface extends mongoose.Document{
    userId: mongoose.Types.ObjectId,
    friendName: string,
    address : Array<string>,
    name : string,
    sex : string,
    photo: Array<string>,
    link : string,
    icon : Date,
    birthdays: string,
    createdAt : Date,
}
