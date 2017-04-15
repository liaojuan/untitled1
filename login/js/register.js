/**
 * Created by liao on 2017/4/14.
 */
var params;
/**
 * 判断密码是否可见,默认不可见
 * @type {boolean}
 */
var isShow=true;
/**
 * 默认是接受法律条款
 * @type {boolean}
 */
var isAgreeLaw = true;

$(function () {

    //点击返回和返回前的图标
    $('#back_img_id').click(function () {
        window.close();
    });
    $('#back_txt_id').click(function () {
        window.close();
    });
    //点击获取验证码
    $('#sms_code_button').click(function () {
        var thisPhoneNum = $('#input_phone_num').val();
        setCode(thisPhoneNum, 'DRIVER_REGISTER');
        var v = document.getElementById("sms_code_button");
        getSmsCode('vcode', params, v)
        // getSmsCode('vcode', params, "'#sms_code_button'")
    });
    //密码可见不可见的
    $('#show_close_password').click(function () {
        var v = document.getElementById("input_password_num");
        var iv = document.getElementById("show_close_password");
        if (isShow) {
            v.type="text";
            iv.src = "../image/show_password.png";
            isShow=false;
        }else{
            v.type="password";
            isShow=true;
            iv.src = "../image/look.png";
        }
    });
    //查看推荐码
    $('#img_help').click(function () {
        console.log("---我点击了----img_help" )
        window.location.href = '../h5/explain/help.html';
    });
    //点击button
    $('#sure_register_button').click(function () {
        var username = $('#input_phone_num').val();
        var vcode =  $('#input_sms_code').val();
        var password =  $('#input_password_num').val();
        setRegister(username, password, vcode);
        register('register',params);
    });
    //点击确认是否勾选法律条款
    $('#check_box_argee').click(function () {
        var iv = document.getElementById("check_box_argee");
        if (isAgreeLaw) {
            iv.src = "../image/default_check_box.png";
            isAgreeLaw=false;
        }else{
            isAgreeLaw=true;
            iv.src = "../image/select_check_box.png";
        }
        checkOnclickButton();
    });
    //点击阅读法律条款
    $('#read_legal_provisions').click(function () {
        window.location.href = '../h5/explain/legal_provisions.html';
    });

    //电话号码输入框发生改变
    $("#input_phone_num").bind('input porpertychange',function(){
        //获取input的值
        var thisInput = $('#input_phone_num').val();
        if(thisInput.length < 11){
            $('#sms_code_button').css('color','#ffffff').css('background', '#bfbfbf'); //修改button的背景色和字体的颜色
            $('#sms_code_button').attr('disabled', true);
            checkOnclickButton();
        }else if(thisInput.length == 11){
            var v = document.getElementById("sms_code_button");
            checkMonile(thisInput, v, 1);
        }else if(thisInput.length > 11){
            alert("手机号码不能超过11位！");
            checkOnclickButton();
            return;
        }
    });
    $("#input_sms_code").bind('input porpertychange',function(){
        checkOnclickButton();
    });
    $("#input_password_num").bind('input porpertychange',function(){
        checkOnclickButton();
    });


});


/**
 * 创建发送验证码参数
 * @param numPhone
 * @param types
 */
function setCode(numPhone, types) {
    params = {
        phone:numPhone,
        type:types
    };//创建json格式参数
}


function setRegister(username, password, vcode) {
    params = {
        username:username,
        password:password,
        vcode:vcode
    };//创建json格式参数
}

/**
 * 注册
 * @param url
 * @param params
 */
function register(url , params) {
    $.ajax({
        url : Common.domain + "/" + url,
        type : "post",
        data : params,
        dataType : "json",
        // headers: {'DIBU_ACCESS_TOKEN': 'access_token', 'APP_VERSION': 1, 'CHANNEL': 'ANDROID', 'CLIENT_TYPE': 'driver'},
        success : function(data) {
            if(data != null){
                if(data.status_code == 1) {
                    alert("注册成功")
                }else {
                    alert(data.message);
                }
            }else{
                alert("注册失败")
            }
        },
        error : function(event, status, msg) {
        }
    });
}