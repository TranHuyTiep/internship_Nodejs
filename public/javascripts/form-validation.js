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
                minlength: "Chiều dài tối thiểu 8 ký tự"
            },
            email: "Nhập email",
            username: "Username là bắt buộc và ít hơn 50 ký tự"
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});