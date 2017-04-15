/**
 * Created by liao on 2017/4/15.
 */
var Common = {};
Common.domain = 'http://papi.dibugroup.net';

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


//TODO:忘记密码模块

/**
 * 判断button键是否可以点击
 */
function checkOnclick() {
    if($('#phone_number').val().length == 11 && $('#sms_code').val().length == 6 && $('#id_card_num').val().length > 14 && $('#new_password').val().length > 5){
        $('#sure_bt').css('color','#ffffff').css('background', '#ff6636');
    }else{
        $('#sure_bt').css('color','#ffffff').css('background', '#bfbfbf');
    }
}




//TODO:通用的验证手机号码

/**
 * 这个方法对应的所以获取验证码的button，type == 1,代表的是注册  2 代表的是忘记密码
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
            }else{
                checkOnclick();
            }
        }else {
            alert("请输入正确电话号码");
            $('#' + v.id).attr('disabled', true);
        }
    }
}

//TODO:通用获取短信验证

/**
 * 通用获取验证码
 * @param url
 * @param params
 */
function getSmsCode(url , params, v) {
    console.log("-----" + v.id);
    $.ajax({
        url : Common.domain + "/" + url,
        type : "post",
        data : params,
        dataType : "json",
        // headers: {'DIBU_ACCESS_TOKEN': 'access_token', 'APP_VERSION': 1, 'CHANNEL': 'ANDROID', 'CLIENT_TYPE': 'driver'},
        success : function(data) {
            if(data != null){
                if(data.status_code == 1) {
                    settime(data.data.exprie, v);
                }else {
                    alert(data.message);
                }
            }else{
                alert("获取验证码失败")
            }
        },
        error : function(event, status, msg) {
        }
    });
}

//TODO:通用短信验证


/**
 * 倒计时方法
 *
 * @param countdown
 */
function settime(countdown, v) {
    var s = v;
    // $(this).attr('id', s.id);
    // var thisBt = document.getElementById(v);
    console.log("----"+ s.id , "-----" ,s)
    if (countdown == 0) {
        console.log("-----==0----" + countdown)
        // v.css('color','#ffffff').css('background', '#ff6636');
        $('#' + s.id).attr('disabled', false);
        $('#' + s.id).text("获取验证码");
        return;
    } else {
        console.log("-----==countdown----" + countdown)
        // v.css('color','#ffffff').css('background', '#ff6636');
        $('#' + s.id).attr('disabled', true);
        $("#" + s.id).text(countdown + "(s)");
        countdown--;
    }
    setTimeout(function() {
        settime(countdown, v)
    },1000)
}




