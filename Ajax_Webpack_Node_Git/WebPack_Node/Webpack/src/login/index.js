import {checkPhoneNum,checkCode} from '@/utils/check.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './index.less'
import imgObj from './assets/logo.png'
import {myAlert} from '../utils/alert.js'
import axios from '../utils/request.js'

if(process.env.NODE_ENV === 'production'){
    console.log = ()=>{}
}

console.log(checkPhoneNum('189048841022'));
console.log(checkPhoneNum('18904884102'));
console.log(checkCode('189472'));
console.log(checkPhoneNum('18713'));

document.querySelector('.btn').addEventListener('click',async ()=>{
    const phoneNum = document.querySelector('.login-form [name = mobile]').value
    const code = document.querySelector('.login-form [name = code').value
    if(!checkPhoneNum(phoneNum)){
        console.log('手机号长度应为11位')
        myAlert(false,'手机号长度应为11位')
        return
    }

    if(!checkCode(code)){
        console.log('验证码长度应为6位')
        myAlert(false,'验证码长度应为6位')
        return
    }

    try {
        const result =await axios({
            url:'/v1_0/authorizations',
            method:'POST',
            data:{
                mobile:phoneNum,
                code:code
            }
        })
        console.log(result);
        myAlert(true,'登录成功！')
        localStorage.setItem('token',result.data.token)
        setInterval(()=>{
            location.href = '../content/index.html'
        },2000)
    } catch (err) {
        myAlert(false,err.reponse.data.message)
    }
})

const image = document.createElement('img')
image.src = imgObj
document.querySelector('.login-wrap').appendChild(image)
// console.log('观察是否有热重载');




