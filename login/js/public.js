/**
 * Created by liao on 2017/4/15.
 */

//TODO:注册模块


/**
 * 判断button键是否可以点击
 * 对应于注册页面
 */
function checkOnclickButton() {
    if($('#input_phone_num').val().length == 11 && $('#input_sms_code').val().length == 6 && $('#input_password_num').val().length > 5 && isAgreeLaw){
        $('#sure_register_button').css('color','#ffffff').css('background', '#ff6636');
        $('#sure_register_button').attr('disabled', false);
    }else{
        $('#sure_register_button').css('color','#ffffff').css('background', '#bfbfbf');
        $('#sure_register_button').attr('disabled', true);
    }
}




//TODO:通用的验证手机号码


/**
 * 这个方法对应的所以获取验证码的button，type == 1,代表的是注册
 *  判断电话号码是否正确
 * @param str
 */
function checkMonile(str, v, type) {
    var type = type;
    if(str == ""){
        alert("手机号码不能为空！")
    }else{
        var rePhoneNum = /^1[3|4|5|7|8]\d{9}$/
        if (rePhoneNum.test(str)){
            //电话号码争取
            $('#' + v.id).attr('disabled', false);
            $('#' + v.id).css('color','#ffffff').css('background', '#ff6636');
            if(type == 1){
                checkOnclickButton();
            }
        }else {
            alert("请输入正确电话号码");
            $('#' + v.id).attr('disabled', true);
        }
    }
}




