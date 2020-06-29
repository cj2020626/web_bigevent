$(function (){
    //nickname验证规则
    const form = layui.form;
    const layer = layui.layer
    form.verify({
        nickname:function (value){
            if(value.length >6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    //初始化用户信息
    getuserinfo()
    function getuserinfo() {
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                const {status,data,msg} = res;
                if(status !== 0) return layer.msg(msg);
                //调用form方法渲染
                form.val('formUserInfo',data)
            }
        })  
  }
    //重置数据
  $('#btnreset').on('click',function (e){
    e.preventDefault()
    getuserinfo()
  })

  //更新用户数据
  $('.layui-form').on('submit',function (e){
    e.preventDefault()
    //获取到数据，然后删掉用户名
    // const userinfo = form.val('formUserInfo')
    // delete userinfo.username
    $.ajax({
        type:'post',
        url:'/my/userinfo',
        //会自动过滤又disable的value值
        data:$(this).serialize(),
        success:function (res){
            const {status,msg} = res
            if(status !== 0) return layer.msg(msg)
            window.parent.initgetUserinfo()
        }
    })
  })
})
