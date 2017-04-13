///<reference path ="../js/jquery-1.11.1.min.js">
// <execScript("../js/jquery-1.11.1.min.js")
// var script = document.createElement("script");
// script.type = "text/javascript";
// script.src = "../js/jquery-1.11.1.min.js"
// document.getElementsByTagName('head')[0].appendChild(script);

//ajax请求
/**
 * Created by liao on 2017/4/10.
 */
// importScripts("jquery-1.11.1.min.js")
// function includeScript(file) {
//     document.write('<script type="text/JavaScript" src="'+file+'"></script>');
// }
// includeScript("../js/jquery-1.11.1.min.js");
// ~(function($,undefined){
// //你的js
//
// }(jQuery,this))
// document.writeln('<meta name="renderer" content="webkit">');
// document.writeln('<link href="../js/jquery-1.11.1.min.js" type="text/JavaScript" rel="stylesheet">');

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
    // header : function () {
    //     CHANNEL : "ANDROID"
    // },

    // setHeader : function () {
        // CHANNEL : "ANDROID",
        //     CLIENT_TYPE : "driver",
    // },

    //执行请求
    requst: function () {
        var req = $.ajax({

        });

        return req ;
    }

};


ajaxReques.postJosn = {

}