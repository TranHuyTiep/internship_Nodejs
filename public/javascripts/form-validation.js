
$.validator.addMethod("checkStrongPass",
    function(value, element) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
    });

$(function() {
    $("#form-dang-ky").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            username:{
                required: true,
                maxlength: 30,
            },
            password: {
                required: true,
                minlength: 8,
                equalTo: "#new-pasword-dky"
            },
            newPassword: {
                required: true,
                checkStrongPass:true,
                minlength: 8
            }
        },
        messages: {
            password: {
                required: "Nhập password",
                minlength: "Chiều dài tối thiểu 8 ký tự",
                equalTo : "Password không khớp"
            },
            newPassword: {
                required: "Nhập password",
                checkStrongPass: 'Password phải tối thiểu 8 kí tự gồm ít nhất một ký tự số, một ký tự hoa và một ký tự thường!',
                minlength: "Chiều dài tối thiểu 8 ký tự"
            },
            email: "Nhập email",
            username: "Username là bắt buộc và ít hơn 50 ký tự"
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $('#form-dang-nhap').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Nhập email",
                email: "Kiểm tra lại email"
            },
            password: {
                required: "Nhập password",
            },
        }
    })
});