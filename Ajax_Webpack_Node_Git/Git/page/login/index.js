/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */
document.querySelector('.btn').addEventListener('click',async ()=>{
    const loginForm = document.querySelector('.login-form')
    const data = serialize(loginForm,{hash:true,empty:true})
    if(!/^1(3[0-9]|4[0-14-9]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(data.mobile)){
        myAlert(false,'手机号长度必须为11位！')
        return
    } else if(!/^\d{6}$/.test(data.code)){
        myAlert(false,'验证码必须为6个数字')
        return
    }
    try {
        const result = await axios({
            url: '/v1_0/authorizations',
            method: 'POST',
            data
        })
        myAlert(true,'登录成功')
        localStorage.setItem('token',result.data.token)
        setTimeout(()=>location.href = '../content/index.html',2000)
    } catch (error) {
        console.log(error)
        myAlert(false,error.response.data.message)
    }
})