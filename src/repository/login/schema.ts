import * as Mongoose from "mongoose"
class user {
    static get schema () {
        var schema = new Mongoose.Schema({
            address: {
                type: String,
                default: '',
            },
            email: {
                type: String,
                unique: true,
                required: [true, 'Email không được bỏ trống'],
            },
            phone: {
                type: String,
                unique: true,
                required: [true, 'Dien thoai không được bỏ trống'],
            },
            enabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                default: '',
                trim: true
            },
            password: {
                type: String,
            },
            photo: {
                type: Array,
                default: [],
            },
            veryfiCode:{
                type: String,
                default: ''
            },
            sex:{
                type: Boolean
            },
            username: {
                type: String,
                validate: {
                    validator: function(v:string) {
                        return /[a-zA-Z0-9]+[a-zA-Z0-9_\.]/.test(v);
                    },
                    message: 'Username chỉ gồm chữ số, chữ cái, dấu gạch chân và dấu chấm !'
                },
                required: true,
                unique: true,
                trim: true
            },
            listFriend: {
                type: Array,
                default: []
            },
            createAt: {
                type: Number,
                default: new Date().getTime()
            }
        });

        return schema;
    }

}

var schema = Mongoose.model("users", user.schema);
export = schema;
