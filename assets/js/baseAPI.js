$.ajaxPrefilter(function (option){
    option.url = 'http://127.0.0.1:80' + option.url
})