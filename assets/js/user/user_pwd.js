$(function (){
    //定义密码验证规则
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd:function (value){
            if($('[name=oldPwd]').val() === value) return '新旧密码不能一致'
        },
        rePwd:function (value) {
            if($('[name=newPwd]').val() !== value) return '两次密码不一致'
        }
    })

    //发送请求重置密码
    $('.layui-form').on('submit',function (e){
        e.preventDefault()
        // const password = $(this).serialize()
        // let arr = password.split('&')
        // let index = arr.findIndex(item=>item.includes('rePwd'))
        // arr.splice(index,1)
        // const a = arr.join('&')
        // console.log(a);
        const data = form.val('formpwd')
        delete data.rePwd
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:data,
            success:function (res){
                const {status,msg} = res;
                if(status !== 0) return layer.msg(msg);
                layer.msg('更新密码成功')
                //把jq对象转换成原生DOM对象，调用reset重置表单的方法
                $('.layui-form')[0].reset()
            }
        })
    })
})