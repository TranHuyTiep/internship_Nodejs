import * as Mongoose from "mongoose"

const ObjectId = Mongoose.Schema.Types.ObjectId;

class user {
    static get schema () {
        var schema = new Mongoose.Schema({
            userId:{
                type: ObjectId,
                unique: true,
            },
            email: {
                type: String,
                unique: true,
                required: [true, 'Email không được bỏ trống'],
            },
            active: {
                type: Boolean,
                default: false
            },
            password: {
                type: String,
            },
            veryfiCode:{
                type: String,
                default: ''
            },
            username: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            role:{
                type: String,
                required: true,
            },
            createAt: {
                type: Number,
                default: new Date().getTime()
            }
        });

        return schema;
    }

}

var schema = Mongoose.model("user", user.schema);
export = schema;
