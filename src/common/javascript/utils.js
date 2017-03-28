/**
 * Created by jimmy on 2017/3/24.
 */

/**
 * 工具类
 */

export const getUrlParamsByName = (name) => {
    const urlParams = window.location.href.split("?");
    let paramsMap = {};
    if(urlParams.length > 1){
        const urlQueries = urlParams[1].split("&");
        urlQueries.map(item => {
            let _item = item.split("=");
            paramsMap[_item[0]] = _item[1];
        });
        if(paramsMap && paramsMap[name]) return paramsMap[name];
        return null;
    }
    return null;
}

export const cookies = (opt) => {
    if(!opt) return;

    let name, value;
    if(typeof opt == 'string'){
        name = opt;
    }else{
        name = opt.name;
        value = opt.value;
    }

    if(name && !value){
        //获取cookie
        let cookieRes = {};
        let cookieStr = document.cookie;
        let cookieArr = cookieStr.split(";");
        for(let i=0, len=cookieArr.length; i<len; i++){
            let item = cookieArr[i];
            let _item = item.split("=");
            cookieRes[$.trim(_item[0])] = _item[1];
        }
        return cookieRes[name] || "";
    }else if(name && value){
        //设置cookie
        let expiredays = opt.expiredays || 10;
        let exdate=new Date();
        exdate.setDate(exdate.getDate()+ expiredays);
        document.cookie = name+ "=" +escape(value)+ ";expires="+exdate.toGMTString();
    }
}

//手机号码验证
export const mobileTest = (mobile) => {
    return /^1[3,4,5,7,8]\d{9}$/i.test(mobile);
}

//字符串转数组
export const strToArr = (str, space = ' ')=>{
    return str && str.split(space) || [];
}

//数组初始化
export const arrayInit = (length, value=undefined) => {
    let arr = [];
    for(let i = 0; i < length; i++){
        arr[i] = value;
    }
    return arr;
}

//判断是否登录
export const isLogin = ()=>{
    return !!cookies('token');
}

//toast
export const toast = (opt)=>{
    let _text = typeof opt == 'string' ? opt : opt.text;
    let _delay = opt.delay || 2000;
    let $toastWrap = $('<div>');
    $('body').append($toastWrap);

    let $mask = $('<div>');
    $mask.css({
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.25)',
        zIndex:99999
    });
    $toastWrap.append($mask);

    let $toast = $('<div>');
    $toast.css({
        position: 'fixed',
        left: '50%',
        top: '50%',
        maxWidth: '75%',
        overflow: 'hidden',
        height: '24px',
        lineHeight: '24px',
        zIndex: 100000,
        borderRadius: '2px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: '#fff',
        textAlign: 'center',
        padding: '0 8px',
        transform: 'translate3d(-50%, -50%, 0)',
        webkitTransform: 'translate3d(-50%, -50%, 0)'
    });
    $toast.html(_text || '');
    $toastWrap.append($toast);

    setTimeout(function () {
        $toastWrap.remove();
    }, _delay);
}

//获取时间
export const formatTime = (timeStr, format='YY-MM-DD hh:mm:ss') => {
    let _time = new Date();
    if(timeStr){
        _time = new Date(timeStr.replace(/-/g, '/'));
    }
    let year = _time.getFullYear(),
        month = _time.getMonth() + 1,
        date = _time.getDate(),
        hour = _time.getHours(),
        min = _time.getMinutes(),
        sec = _time.getSeconds();
    return format
        .replace('YY', year)
        .replace('MM', month)
        .replace('DD', date)
        .replace('hh', hour)
        .replace('mm', min)
        .replace('ss', sec);
}

//loading
export const reqLoading = (status) => {
    if(status == 'show'){
        let $loading = $('<div>');
        $loading.addClass('loading');
        $loading.attr('id', 'loading');
        $('body').append($loading);
    }
    if(status == 'hide'){
        $('body').find('#loading').remove();
    }
}

//业务相关的工具类