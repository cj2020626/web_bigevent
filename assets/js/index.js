$(function (){
    //调用获取用户信息
    initgetUserinfo();
    //点击退出
    const layer = layui.layer
    $('#logout').on('click',function (){
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html';
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})
//封装获取用户基本信息
function initgetUserinfo() {
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        //配置请求头
        //headers:{Authorization:localStorage.getItem('token')},
        success:function (res){
            const {status,msg} = res;
            if(status !== 0) return layui.layer.msg(msg)
            //渲染用户头像
            renderAvatar(res.data)
        }
    })

}

//封装渲染用户头像
function renderAvatar(user){
    // const {nickname = 'hgfhgf',user_pic} = user
    // $('#welcome').html(`欢迎你 ${nickname}`);
    // console.log(nickname);
    
    // //判断用户有没有头像
    // if(!user_pic){
    //     $('.layui-nav-img').hide()
    //     //获取用户名的第一个字母，改成大写
    //     const first = nickname[0].toUpperCase()
        
    //     $('.text-avatar').html(first).show();
        
    // }else {
    //     $('.layui-nav-img').attr('src',user_pic).show();
    //     $('.text-avatar').hide()
    // }
      const name = user.nickname || user.username
      $('#welcome').html(`欢迎 ${name}`)
     
      if (!user.user_pic) {
        $('.layui-nav-img').hide()
        //获取用户名的第一个字母，改成大写
        const first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
      } else {
      
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide()
      }

    
}