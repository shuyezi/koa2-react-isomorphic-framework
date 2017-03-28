/**
 * Created by jimmy on 2017/3/24.
 */

export const post = (options, callback)=>{
    const reqUrl = options.url;
    if(!reqUrl || reqUrl == '') throw new Error(`Please review your request url`);

    let showLoading = options.loading && options.loading == 1 ? false : true;

    let _settings = Object.assign({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        timeout: 3000,
        beforeSend: function () {
            if(!!showLoading) Utils.reqLoading('show');
        },
        success: function (res) {
            if(res.ok == 0){
                callback && callback(res.obj);
            }else{
                Utils.toast(res.msg);
                return;
            }
        },
        complete: function () {
            if(!!showLoading) Utils.reqLoading('hide');
        },
        error: function (res) {
            // console.log('res', res);
            let _res = JSON.parse(res.responseText);
            if(_res.ok == 4031){
                Utils.toast('登录过期，请重试');
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
                return;
            }
            Utils.toast('系统繁忙，请稍后重试！');
            return;
        }
    }, options, {
        data: JSON.stringify(options.data || {})
    });
    $.ajax(_settings);
}

export default post;