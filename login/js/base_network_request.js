/**
 * Created by liao on 2017/4/10.
 */
//ajax请求
var  ajaxRequest =  function () {};

ajaxRequest.prototype = {
    //初始化设置
    url : '',
    dataType : 'json',
    data:'',

    //初始化ajax参数
    setUp : function(){
        $.ajaxSetup({
            url : this.url,
            data : this.data,
            dataType : this.dataType,
            type : 'post',
            contentType : 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    },

    //执行请求
    requst: function () {
        var req = $.ajax({

        });

        return req ;
    }

};