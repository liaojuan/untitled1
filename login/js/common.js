/**
 * Created by liao on 2017/4/13.
 */
//ajax 获取或者提交数据

var Common = {};

Common.apiAjax = function (options) {

    options.headers = {'DIBU_ACCESS_TOKEN': access_token, 'APP_VERSION': 1, 'CHANNEL': 'H5', 'CLIENT_TYPE': 'driver'};

}