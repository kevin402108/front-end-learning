/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = 'Kevin042108'

function getUserInfo(){
    axios({
        url:'http://hmajax.itheima.net/api/settings',
        params:{
            creator
        }
    }).then(result=>{
        // console.log(result)
        const userInfo = result.data.data
        const keys = Object.keys(userInfo)
        keys.forEach(key =>{
            if (key === 'avatar'){
                document.querySelector('.avatar-box .prew').src = userInfo[key]
            } else if (key === 'gender'){
                const genderList = document.querySelectorAll('.user-form .form-item .gender')
                const gender = userInfo[key]
                genderList[gender].checked =true
            } else {
                document.querySelector(`.user-form .form-item .${key}`).value = userInfo[key]
            }
        })
    }).catch(error=>{
        console.log(error.response.data.message)
    })
}

getUserInfo()

document.querySelector('.avatar-box .upload').addEventListener('change',evt=>{
    const img = evt.target.files[0]
    const fd = new FormData()
    fd.append('img',img)
    fd.append('creator',creator)
    axios({
        url:'http://hmajax.itheima.net/api/avatar',
        method:'PUT',
        data:fd
    }).then(result=>{
        // console.log(result)
        const imgUrl = result.data.data.avatar
        document.querySelector('.avatar-box .prew').src = imgUrl
    }).catch(error=>{
        console.log(error.response.data.message)
    })
})

document.querySelector('.submit').addEventListener('click',()=>{
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm,{hash:true,empty:true})
    userObj.creator = creator
    userObj.gender = +userObj.gender
    axios({
        url:'http://hmajax.itheima.net/api/settings',
        method:'PUT',
        data:userObj
    }).then(result=>{
        // console.log(result.data.message)
        //创建toast提示框对象，并显示（该提示框会自动消失，可用data-bs-delay自定义属性设置延迟消失的时间）
        const toastDOM = document.querySelector('.my-toast')
        const myToast = new bootstrap.Toast(toastDOM)
        myToast.show()
    }).catch(error=>{
        console.log(error.response.data.message)
    })
})