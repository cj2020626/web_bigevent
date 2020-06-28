$.ajaxPrefilter(function (option){
    option.url = 'http://127.0.0.1:80' + option.url
    if(option.url.includes('/my/') ) {
        option.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }
    option.complete = function (res) {
        if(res.responseJSON.status === 1 && res.responseJSON.msg === '身份认证失败'){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})