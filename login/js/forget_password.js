/**
 * Created by liao on 2017/4/15.
 */

/**
 *  处理密码是否可以显示
 **/
var isShow=true;

$(function(){
    $("#get_sms_code").click(function () {
        var thisPhoneNum = $('#phone_number').val();
        setCode(thisPhoneNum)
        submit(url, params);
    });
    $('#show_close_password').click(function () {
        var v=document.getElementById("new_password");
        var iv = document.getElementById("show_close_password");
        if (isShow) {
            v.type="text";
            iv.src = "../image/show_password.png";
//                    document.getElementById("show_close_password").src = "../image/look.png";
            isShow=false;
        }else{
            v.type="password";
            isShow=true;
            iv.src = "../image/look.png";
        }
    });
    $('#sure_bt').click(function () {
        sureJson($('#phone_number').val(), $('#sms_code').val(),  $('#id_card_num').val(),  $('#new_password').val());
        submitSureBt(sureUrl, sureParams);
    });

    $("#phone_number").bind('input porpertychange',function(){
        var thisInput = $('#phone_number').val();
        if(thisInput.length < 11){
            $('#get_sms_code').css('color','#ff6636').css('background', '#ffffff'); //修改button的背景色和字体的颜色
            $('#get_sms_code').attr('disabled', true);
            checkOnclick();
        }else if(thisInput.length == 11){
            var v = document.getElementById("get_sms_code");
            checkMonile(thisInput, v , 2);
        }else if(thisInput.length > 11){
            alert("手机号码不能超过11位！");
            checkOnclick();
            return;
        }
    });
    $('#sms_code').bind('input porpertychange',function(){
        checkOnclick();
    });
    $('#id_card_num').bind('input porpertychange',function(){
        checkOnclick();
    });
    $('#new_password').bind('input porpertychange',function(){
        checkOnclick();
    });
});

/**
 * 自定义参数类型，对应的是获取验证码
 **/
var params;
function setCode(numPhone) {
    params = {
        phone:numPhone,
        type:"DRIVER_FIND_PASSWD"
    };//创建json格式参数
}

//获取验证码的连接
var url = "http://papi.dibugroup.net/vcode";
/**
 * 获取验证码的请求 以及成功后的处理方式
 * @param url
 * @param params
 */
//表单提交
function submit(url,params){

    var ajaxReq = new ajaxRequest();
    ajaxReq.url = url;
    ajaxReq.dataType = "json";
    ajaxReq.data = params;
//            ajaxReq.setRequestHeader("CHANNEL", "ANDROID");
    ajaxReq.setUp();//初始化ajax

    var requst = ajaxReq.requst();

    requst.done(function(result) {//回调

//                console.log(typeof result);
//                console.log(result );

        if(result.status_code == 1){
            console.log(result.status_code +"---" +  result.data.exprie);
            settime(result.data.exprie);
        }else {
            alert(result.message)
        }
    });

    requst.error(function(data){
        alert("网络异常!");
    });

}

/**
 * 倒计时方法
 *
 * @param countdown
 */
function settime(countdown) {
    if (countdown == 0) {
        console.log("-----==0----" + countdown)
        $('#get_sms_code').css('color','#ffffff').css('background', '#ff6636');
        $('#get_sms_code').attr('disabled', false);
        $('#get_sms_code').text("获取验证码");
        return;
    } else {
        console.log("-----==countdown----" + countdown)
        $('#get_sms_code').css('color','#ffffff').css('background', '#ff6636');
        $('#get_sms_code').attr('disabled', true);
        $('#get_sms_code').text(countdown + "(s)");
        countdown--;
    }
    setTimeout(function() {
        settime(countdown)
    },1000)
}

var sureUrl = "http://papi.dibugroup.net/retrieve_password"

var sureParams;
function sureJson(numPhone, smsCode, idCard, newPassword) {
    sureParams = {
        phone:numPhone,
        vcode:smsCode,
        id_card:idCard,
        new_password:newPassword,
    };//创建json格式参数
}

//表单提交
function submitSureBt(sureUrl,sureParams){
    $.ajax({
        url : sureUrl,
        type : "post",
        data : sureParams,
        dataType : "json",
        headers: {'DIBU_ACCESS_TOKEN': 'access_token', 'APP_VERSION': 1, 'CHANNEL': 'ANDROID', 'CLIENT_TYPE': 'driver'},
        success : function(data) {
//                    console.log(data );
            if(data != null){
                if(data.status_code == 1) {
                    window.close();//修改成功，关闭当前窗口
                }else {
                    alert(data.message);
                }
            }else{
                alert("修改失败，请重新提交")
            }
        },
        error : function(event, status, msg) {
        }
    });
//            Common.apiAjaxPost(sureUrl, sureParams, "post", {'DIBU_ACCESS_TOKEN': 'access_token', 'APP_VERSION': 1, 'CHANNEL': 'ANDROID', 'CLIENT_TYPE': 'driver'});

}