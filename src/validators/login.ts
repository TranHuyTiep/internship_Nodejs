const { checkSchema  } = require('express-validator/check');

class Validator {
    public validateLogin () {
        var schema =  checkSchema({
            email: {
                isEmail:{
                    options: true,
                    errorMessage: 'Email không hợp lệ',
                },
            },
            password: {
                isLength: {
                    errorMessage: 'Password phải có độ dài lớn hon 8 ký tự',
                    options: { min: 8 }
                },
                matches:{
                    options:' /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/',
                    errorMessage:`Password phải có đô dài từ 6-12 ký tự, ít nhất 1 ký tự thường hoặc 1 ký tự hoa,
                                ký tự số`
                },
            },
        });
        return schema;
    }
}

const validator = new Validator();
export {Validator} ;

