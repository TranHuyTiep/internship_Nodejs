import mongoose = require("mongoose");

export interface userInterface extends mongoose.Document{
    username: string,
    password : string,
    email : string,
    salt : string,
    name : string,
    photo: string,
    title : string,
    updatedAt : string,
    createdAt : string,
}
