$(function () {
    // 登录
    $('#reg').on('click', () => {
        $('.reg').show();
        $('.login').hide();
    })

    // 注册
    $('#login').on('click', () => {
        $('.reg').hide();
        $('.login').show()
    })

    //自定义注册验证规则
    const form = layui.form
    const layer = layui.layer
    form.verify({
        //密码验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //验证两次密码是否一致
        repwd: function (value) {
            const pwd = $('.reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    //发请求注册
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, (res) => {
            const { status, msg } = res;
            if (status !== 0) {
                return layer.msg(msg)
            }
            layer.msg('注册成功')
            //自动跳转到登录页面
            $('#login').click()
        })
    })
    //发送请求登录
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                const { status, msg, token } = res
                if (status !== 0) {
                    return layer.msg(msg)
                }
                layer.msg('登录成功')
                //在本地存储token
                localStorage.setItem('token', token)
                //跳转页面
                location.href = '/index.html'
            }
        })
    })
})