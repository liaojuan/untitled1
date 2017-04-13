/**
 * Created by liao on 2017/4/13.
 */
//ajax 获取或者提交数据

var Common = {};

Common.apiAjaxPost = function (url, datas, type, header) {
    $.ajax({
        url : url,
        type : type,
        data : datas,
        dataType : "json",
        headers: header,
        success : function(data) {
            console.log(data );
        },
        error : function(event, status, msg) {
        }
    });


}